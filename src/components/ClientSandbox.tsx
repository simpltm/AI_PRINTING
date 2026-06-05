import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import QRCode from 'react-qr-code';
import { Language, PrintFormat, PrintMaterial, UrgencyOption, SampleImage } from '../types';
import { TRANSLATIONS, FORMATS, MATERIALS, URGENCY_OPTIONS, SAMPLE_IMAGES } from '../data';
import { 
  Upload, 
  Trash2, 
  Sparkles, 
  Layers, 
  Coins, 
  Smartphone, 
  CheckCircle, 
  AlertCircle, 
  Printer, 
  QrCode, 
  ChevronRight, 
  Loader2,
  RefreshCw,
  Palette
} from 'lucide-react';

function MockQrCode({ value, lang }: { value: string; lang: Language }) {
  const qrUrl = window.location.origin + window.location.pathname + "?order=" + encodeURIComponent(value);
  return (
    <div className="flex flex-col items-center gap-1.5 p-1.5 bg-white border border-white/15 flex-shrink-0">
      <div className="bg-white p-0.5 w-[100px] h-[100px] flex items-center justify-center">
        <QRCode value={qrUrl} size={92} style={{ height: "auto", maxWidth: "100%", width: "100%" }} id="live-generated-qr" />
      </div>
      <span className="font-mono text-[8px] text-black tracking-widest font-black uppercase text-center leading-none">
        {value}
      </span>
    </div>
  );
}

interface ClientSandboxProps {
  lang: Language;
}

export default function ClientSandbox({ lang }: ClientSandboxProps) {
  const getTranslation = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  // Selected parameters state
  const [selectedFormat, setSelectedFormat] = useState<PrintFormat>(FORMATS[1]); // A4 default
  const [selectedMaterial, setSelectedMaterial] = useState<PrintMaterial>(MATERIALS[0]);
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyOption>(URGENCY_OPTIONS[0]);
  const [quantity, setQuantity] = useState<number>(10);
  
  // Custom file or sample image
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_IMAGES[0].url);
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(SAMPLE_IMAGES[0].id);

  // Simulation state machine
  // Idle -> Running (with steps) -> Complete
  const [simState, setSimState] = useState<'idle' | 'running' | 'complete'>('idle');
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [dpiChecked, setDpiChecked] = useState<number>(300);
  const [dominantColors, setDominantColors] = useState<string[]>(['#1e293b', '#00b0ff', '#ff6d00', '#10b981']);
  const [simulatedOrderId, setSimulatedOrderId] = useState<string>('');

  // Interactive hardware simulation state
  const [visualMode, setVisualMode] = useState<'proof' | 'printer'>('proof');
  const [printSubProgress, setPrintSubProgress] = useState<number>(0);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-switch format preset if user picks a sample image designed for that category
  const selectPreset = (img: SampleImage) => {
    setSelectedPresetId(img.id);
    setImageUrl(img.url);
    setIsCustomUpload(false);
    
    const matchedFormat = FORMATS.find(f => f.id === img.category);
    if (matchedFormat) {
      setSelectedFormat(matchedFormat);
    }
  };

  // Extract real dominant colors from loaded image
  useEffect(() => {
    if (!imageUrl) return;
    
    // Set a random simulated DPI based on either setting or custom upload
    const randomDPI = isCustomUpload ? Math.floor(Math.random() * 180) + 120 : 300;
    setDpiChecked(randomDPI);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
      try {
        const canvas = canvasRef.current || document.createElement('canvas');
        canvas.width = 10;
        canvas.height = 10;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 10, 10);
          const imgData = ctx.getImageData(0, 0, 10, 10).data;
          
          // Pull 4 sparse sample colors from image data
          const colors: string[] = [];
          const indices = [0, 48, 120, 240]; // different pixel zones
          indices.forEach(idx => {
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            // Format to hex
            if (r !== undefined) {
              const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
              colors.push(hex);
            }
          });
          
          if (colors.length === 4) {
            setDominantColors(colors);
          }
        }
      } catch (e) {
        // Fallback colors on cross-origin blocks
        setDominantColors(['#0f172a', '#3b82f6', '#f59e0b', '#10b981']);
      }
    };
  }, [imageUrl, isCustomUpload]);

  // Handle uploaded files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
          setIsCustomUpload(true);
          setSelectedPresetId('');
          setDpiChecked(Math.floor(Math.random() * 150) + 100); // simulated lower resolution
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUpload = () => {
    setImageUrl(SAMPLE_IMAGES[0].url);
    setIsCustomUpload(false);
    setSelectedPresetId(SAMPLE_IMAGES[0].id);
    setSelectedFormat(FORMATS[1]);
  };

  // Price calculations
  const calculateCosts = () => {
    const base = selectedFormat.basePrice * quantity;
    const materialMod = selectedMaterial.multiplier;
    const urgencyMod = selectedUrgency.multiplier;
    
    let total = base * materialMod * urgencyMod;
    
    // Quantity volume discounts
    let discount = 0;
    if (quantity >= 50 && quantity < 200) {
      discount = 0.10; // 10%
    } else if (quantity >= 200 && quantity < 1000) {
      discount = 0.25; // 25%
    } else if (quantity >= 1000) {
      discount = 0.40; // 40%
    }
    
    const finalAmount = total * (1 - discount);
    return {
      subtotal: Math.round(total),
      discount: Math.round(total * discount),
      final: Math.round(finalAmount)
    };
  };

  const costs = calculateCosts();

  // Dynamic formatting string
  const formatMoney = (amount: number) => {
    if (lang === 'uz') {
      return `${amount.toLocaleString()} so'm`;
    } else if (lang === 'ru') {
      return `${amount.toLocaleString()} руб`;
    } else {
      return `$ ${(amount / 12800).toFixed(2)}`;
    }
  };

  // Interactive Timeline Simulation Steps
  const simulationSteps = [
    {
      id: 'upload',
      title: { uz: 'Rasm tahlili', ru: 'Загрузка и Анализ DPI', en: 'Checking Dimensions & DPI' },
      log: {
        uz: `Fayl aniqlandi. Rasm o'lchami tahlil qilinmoqda. DPI: ${dpiChecked}...`,
        ru: `Инициализация файла. Анализ разрешения изображения. DPI: ${dpiChecked}...`,
        en: `File recognized. Analyzing pixel count. Resolution: ${dpiChecked} DPI...`
      }
    },
    {
      id: 'prepare',
      title: { uz: 'Avtomatik Maket Tayyorlash', ru: 'Вёрстка полей и Bleeds', en: 'Mapping Bleeds & Safety Borders' },
      log: {
        uz: `Bleed-kontroller faollashtirildi. Xavfsiz kesish joylari belgilandi. O'lcham: ${selectedFormat.dimensions}`,
        ru: `Вёрстка макета. Добавлены вылеты под обрез (блиды). Формат: ${selectedFormat.dimensions}`,
        en: `Padding canvas. Automatically added 2mm safety bleeds. Applied size: ${selectedFormat.dimensions}`
      }
    },
    {
      id: 'colors',
      title: { uz: 'Rang moslashtiruvi', ru: 'Оптимизация цвета CMYK', en: 'Calibrating CMYK Ink Profiles' },
      log: {
        uz: `RGB rang profili avtomatik ravishda sanoat CMYK rang profiliga o'tkazildi.`,
        ru: `Конвертация цветовой палитры в печатный режим CMYK. Экстракция доминантов.`,
        en: `Converting dynamic RGB values onto CMYK printer pigments. Tuning palette.`
      }
    },
    {
      id: 'payment',
      title: { uz: 'Onlayn To\'lov API', ru: 'Интеграция с платежным шлюзом', en: 'Processing Payments API Gate' },
      log: {
        uz: `To'lov tizimi so'rovi amalga oshirilmoqda... To'lov holati: Muvaffaqiyatli.`,
        ru: `Запрос во внешнюю платёжную API-систему... Статус транзакции: Оплачено.`,
        en: `Transmitting invoice parameters to payment gateway... Status: Authorized.`
      }
    },
    {
      id: 'queue',
      title: { uz: 'Smart Chop Navbati', ru: 'Отправка на Оборудование', en: 'Queueing to Direct Printing Hardware' },
      log: {
        uz: `Uskunaga avtomatik buyruq yuborildi. Navbat raqami: #${Math.floor(Math.random() * 8) + 1}`,
        ru: `Файл подготовлен и отправлен на плоттер/станок. Приоритет в очереди: Высокий.`,
        en: `Generating G-code file stream. Handed over directly to smart print queue.`
      }
    },
    {
      id: 'shipping',
      title: { uz: 'Tizimda QR kod yaratish', ru: 'Доставка и Генерация QR', en: 'QR-Code Dispatch Generation' },
      log: {
        uz: `Buyurtma topshirish QR kodi yaratildi. Kuryer jo'natish xizmatiga ulandi.`,
        ru: `Уникальный QR-код сгенерирован для логистического терминала доставки.`,
        en: `Automated logistics QR-code created containing GPS routing details.`
      }
    }
  ];

  const handleSimulateStart = () => {
    setSimState('running');
    setActiveStepIdx(0);
    const orderId = `AIP-${Math.floor(100000 + Math.random() * 900000)}`;
    setSimulatedOrderId(orderId);
    setSystemLogs([
      lang === 'uz' ? `Dastur ishga tushirildi. Buyurtma ID: ${orderId}` : lang === 'ru' ? `Система запущена. ID Заказа: ${orderId}` : `Intelligent pipeline activated. System Order: ${orderId}`
    ]);
  };

  // Handle step-by-step timeout iterations
  useEffect(() => {
    if (simState !== 'running') return;

    if (activeStepIdx < simulationSteps.length) {
      const timer = setTimeout(() => {
        const step = simulationSteps[activeStepIdx];
        setSystemLogs(prev => [...prev, `[${step.title[lang]}] ${step.log[lang]}`]);
        setActiveStepIdx(prev => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    } else {
      setSimState('complete');
      setSystemLogs(prev => [...prev, lang === 'uz' ? "🚀 Tizim barcha 6 bosqichni muvaffaqiyatli tugatdi!" : lang === 'ru' ? "🚀 Все 6 этапов автоматизации завершены успешно!" : "🚀 Success! All 6 integration stages concluded autonomously!"]);
    }
  }, [simState, activeStepIdx]);

  // Handle automatic tab toggling & progressive machine plotter updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (simState === 'running' && activeStepIdx === 4) {
      setVisualMode('printer');
      setPrintSubProgress(0);
      interval = setInterval(() => {
        setPrintSubProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5; // count up over 20 increments (~1.2 seconds)
        });
      }, 70);
    } else if (simState === 'complete') {
      setPrintSubProgress(100);
    } else if (simState === 'idle') {
      setPrintSubProgress(0);
      setVisualMode('proof');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simState, activeStepIdx]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-stretch" id="sandbox-component">
      {/* Offscreen hidden canvas for color extraction */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Left Column: Intake Controls & Live Preview Card */}
      <div className="lg:col-span-7 space-y-6 flex flex-col justify-between" id="sandbox-left">
        <div className="space-y-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-brand-cyan" />
              <span>{lang === 'uz' ? "Chop qilish loyihasi sozlari" : lang === 'ru' ? "Параметры печати" : "Intake Configurator"}</span>
            </h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
              {lang === 'uz' ? 'onlayn demo' : lang === 'ru' ? 'онлайн симулятор' : 'live demo'}
            </span>
          </div>

          {/* 1. Upload Section */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wide block">
              {getTranslation('customText')}
            </label>
            
            {/* Presets Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SAMPLE_IMAGES.map((img) => (
                <button
                  key={img.id}
                  id={`preset-img-${img.id}`}
                  onClick={() => selectPreset(img)}
                  className={`relative p-1 rounded-lg border overflow-hidden text-left transition-all ${
                    selectedPresetId === img.id
                      ? 'border-brand-cyan bg-brand-cyan/5 ring-1 ring-brand-cyan/20'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={img.url}
                    alt={img.name[lang]}
                    className="w-full h-12 object-cover rounded-md opacity-80"
                  />
                  <div className="p-1 mt-1 text-[10px] font-medium text-slate-300 line-clamp-1">
                    {img.name[lang]}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom file input */}
            <div className="flex items-center gap-3">
              <button
                id="upload-custom-file-btn"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-md border border-slate-700 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{lang === 'uz' ? 'O\'z rasmizni yuklang (PNG, JPG)' : lang === 'ru' ? 'Загрузить файл' : 'Upload custom design...'}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {isCustomUpload && (
                <button
                  id="clear-uploaded-image-btn"
                  onClick={clearUpload}
                  className="p-2 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded border border-rose-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Format Selector */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wide block">
              {getTranslation('formatText')}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  id={`format-btn-${f.id}`}
                  onClick={() => setSelectedFormat(f)}
                  className={`p-3 text-left rounded-lg text-xs border transition-all ${
                    selectedFormat.id === f.id
                      ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan font-medium'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-semibold">{f.name[lang]}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{f.dimensions}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Materials & Urgency side by side */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Materials selection */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wide block">
                {getTranslation('materialText')}
              </span>
              <select
                id="materials-selector-dropdown"
                value={selectedMaterial.id}
                onChange={(e) => {
                  const matched = MATERIALS.find(m => m.id === e.target.value);
                  if (matched) setSelectedMaterial(matched);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
              >
                {MATERIALS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name[lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Urgency Option */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wide block">
                {getTranslation('urgencyText')}
              </span>
              <select
                id="urgency-selector-dropdown"
                value={selectedUrgency.id}
                onChange={(e) => {
                  const matched = URGENCY_OPTIONS.find(u => u.id === e.target.value);
                  if (matched) setSelectedUrgency(matched);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan"
              >
                {URGENCY_OPTIONS.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name[lang]} ({u.timeframe[lang]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Quantity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold uppercase tracking-wide">{getTranslation('quantityText')}</span>
              <span className="text-brand-cyan font-bold">{quantity} {lang === 'uz' ? 'ta' : lang === 'ru' ? 'шт' : 'pcs'}</span>
            </div>
            <input
              id="quantity-picker-slider"
              type="range"
              min="1"
              max="1500"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            />
            {/* Discount info banner */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>{lang === 'uz' ? 'Ko\'proq hajmlar arzonroq' : lang === 'ru' ? 'Скидка на тиражи' : 'Bulk order discounts'}:</span>
              <span className={quantity >= 1000 ? 'text-brand-cyan' : quantity >= 200 ? 'text-emerald-400' : 'text-slate-400'}>
                {quantity >= 1000 ? (lang === 'uz' ? 'Sizda 40% chegirma!' : lang === 'ru' ? 'Суперскидка 40%!' : '40% discount applied!') 
                 : quantity >= 200 ? (lang === 'uz' ? '25% chegirma!' : lang === 'ru' ? 'Скидка 25%!' : '25% volume discount!')
                 : quantity >= 50 ? (lang === 'uz' ? '10% chegirma' : lang === 'ru' ? 'Скидка 10%' : '10% volume discount')
                 : (lang === 'uz' ? 'Chegirmalar 50 tadan boshlanadi' : lang === 'ru' ? 'Опт от 50 шт' : 'Wholesale begins at 50 pcs')}
              </span>
            </div>
          </div>

          {/* Delivery & Pickup Selector */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wide block">
              {lang === 'uz' ? 'YETKAZIB BERISH / OLISH USULI:' : lang === 'ru' ? 'СПОСОБ ПОЛУЧЕНИЯ:' : 'FULFILLMENT METHOD:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="method-pickup-btn"
                onClick={() => setDeliveryMethod('pickup')}
                className={`px-4 py-3 text-xs font-black uppercase tracking-wider transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 ${
                  deliveryMethod === 'pickup'
                    ? 'bg-[#FF3E00] text-white border-transparent'
                    : 'bg-[#111111] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{lang === 'uz' ? "O'zi Olib Ketish" : lang === 'ru' ? "Самовывоз" : "Self-Pickup"}</span>
              </button>
              <button
                type="button"
                id="method-delivery-btn"
                onClick={() => setDeliveryMethod('delivery')}
                className={`px-4 py-3 text-xs font-black uppercase tracking-wider transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 ${
                  deliveryMethod === 'delivery'
                    ? 'bg-[#FF3E00] text-white border-transparent'
                    : 'bg-[#111111] text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <span>🚚</span>
                <span>{lang === 'uz' ? "Kuryer" : lang === 'ru' ? "Доставка" : "Courier"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic calculation banner */}
        <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between" id="dynamic-pricing-card">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">{getTranslation('costText')}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-display font-bold text-brand-cyan tracking-tight">{formatMoney(costs.final)}</span>
              {costs.discount > 0 && (
                <span className="text-xs text-slate-500 line-through font-mono">{formatMoney(costs.subtotal)}</span>
              )}
            </div>
          </div>
          {simState === 'idle' ? (
            <button
              id="start-simulation-pipeline-btn"
              onClick={handleSimulateStart}
              className="px-5 py-3 bg-brand-cyan text-slate-950 text-xs font-bold rounded-lg shadow-lg hover:shadow-brand-cyan/20 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'uz' ? 'Ishga Tushirish' : lang === 'ru' ? 'Создать заказ' : 'Process Order'}</span>
            </button>
          ) : (
            <button
              id="reset-simulation-pipeline-btn"
              onClick={() => setSimState('idle')}
              className="px-5 py-3 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{lang === 'uz' ? 'Yangi Buyurtma' : lang === 'ru' ? 'В начало' : 'New Order'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Visual Simulated Output Container */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between" id="sandbox-right">
        {/* Visual Frame mock-up representing Bleed control and live crop */}
        <div className="p-6 bg-[#0D0D0D] rounded-none border border-white/10 flex flex-col justify-center items-center relative min-h-[300px] overflow-hidden" id="bleed-monitor">
          <div className="absolute top-4 left-4 text-[10px] text-slate-500 font-mono flex items-center gap-1.5 bg-[#050505] px-2 py-0.5 rounded border border-white/5">
            <Layers className="w-3 h-3 text-[#FF3E00]" />
            <span>{visualMode === 'proof' 
              ? (lang === 'uz' ? "Avtomatik maket monitori" : lang === 'ru' ? "Мониторинг безопасности макета" : "Pre-Print Canvas Proof")
              : (lang === 'uz' ? "CHOP ETISH USKUNASI" : lang === 'ru' ? "ОБОРУДОВАНИЕ ПЕЧАТИ" : "HARDWARE PLOTTER SIMULATOR")
            }</span>
          </div>

          {/* Sizable visual switcher buttons */}
          <div className="absolute top-4 right-4 flex bg-[#050505] border border-white/10 p-0.5 text-[9px] font-mono z-30 font-black">
            <button 
              onClick={() => setVisualMode('proof')}
              className={`px-3 py-1 uppercase tracking-wider cursor-pointer ${visualMode === 'proof' ? 'bg-[#FF3E00] text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {lang === 'uz' ? 'MAKET' : lang === 'ru' ? 'МАКЕТ' : 'PROOF'}
            </button>
            <button 
              onClick={() => setVisualMode('printer')}
              className={`px-3 py-1 uppercase tracking-wider cursor-pointer flex items-center gap-1 ${visualMode === 'printer' ? 'bg-[#FF3E00] text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <span>{lang === 'uz' ? 'USKUNA' : lang === 'ru' ? 'ПРИНТЕР' : 'PRINTER'}</span>
              {simState === 'running' && activeStepIdx === 4 && (
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              )}
            </button>
          </div>

          {visualMode === 'proof' && (
            <>
              {/* Sizing tags on border */}
              <div className="absolute top-1/2 left-3 text-[10px] font-mono text-slate-500 origin-center -rotate-90">
                {selectedFormat.dimensions.split('×')[1] || 'H'}
              </div>
              <div className="absolute bottom-3 left-1/2 text-[10px] font-mono text-slate-500 -translate-x-1/2">
                {selectedFormat.dimensions.split('×')[0] || 'W'}
              </div>
            </>
          )}

          {visualMode === 'proof' ? (
            /* Dynamic Crop Frame with Image with absolute high-contrast aesthetics */
            <div 
              className="relative border-2 border-dashed border-[#FF3E00]/40 bg-[#050505] rounded-none shadow-2xl overflow-hidden transition-all duration-300 max-h-[220px] max-w-[280px] w-full flex items-center justify-center p-0.5 mt-8 shadow-[#FF3E00]/5" 
              style={{ 
                aspectRatio: selectedFormat.ratio, 
              }}
            >
              {/* Live laser scan beam during analysis animation */}
              {simState === 'running' && activeStepIdx === 0 && (
                <div className="absolute left-0 right-0 h-1 bg-[#FF3E00] shadow-lg shadow-[#FF3E00]/50 animate-bounce z-20 top-0 bottom-0" />
              )}

              <img
                ref={imageRef}
                referrerPolicy="no-referrer"
                src={imageUrl}
                alt="Live print crop target"
                className={`w-full h-full object-cover transition-all duration-200 ${simState === 'running' && activeStepIdx <= 1 ? 'brightness-50' : ''}`}
              />

              {/* Orange dashed line representing safety zones (Bleeds / Блиды) */}
              <div className="absolute inset-2 border border-[#FF3E00] border-dotted flex flex-col justify-between pointer-events-none z-10 p-1">
                <span className="text-[8px] text-[#FF3E00] bg-[#050505]/95 px-1.5 py-0.5 border border-white/5 font-mono select-none uppercase tracking-wider scale-75 origin-top-left inline-block">
                  BLEED 2MM
                </span>
                <span className="text-[8px] text-[#FF3E00] bg-[#050505]/95 px-1.5 py-0.5 border border-white/5 font-mono select-none uppercase tracking-wider scale-75 origin-bottom-right inline-block self-end">
                  SAFE ZONE
                </span>
              </div>

              {/* DPI text watermark */}
              <div className="absolute bottom-2 left-2 bg-[#050505]/90 border border-white/10 px-2 py-0.5 rounded-none text-[9px] font-mono z-10 text-slate-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]" />
                <span>{dpiChecked} DPI</span>
              </div>
            </div>
          ) : (
            /* Futuristic Industrial CNC Mechanical Plotter Simulator */
            <div className="w-full max-w-[340px] bg-[#050505] p-4 border border-white/10 mt-8 flex flex-col gap-3 relative overflow-hidden">
              {/* Digital dashboard HUD header */}
              <div className="flex justify-between items-center text-[9px] font-mono border-b border-white/5 pb-2 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${simState === 'running' && activeStepIdx === 4 ? 'bg-amber-400 animate-pulse' : simState === 'complete' ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <span className="font-bold tracking-wider">{simState === 'running' && activeStepIdx === 4 ? 'PRINTING_STAGE' : simState === 'complete' ? 'COMPLETED' : 'OFFLINE_READY'}</span>
                </div>
                <span>QUALITY: 1440DPI</span>
              </div>

              {/* Mechanical roller body with guided steel rail */}
              <div className="bg-[#111111] border border-white/10 p-3 flex flex-col items-center justify-center relative min-h-[170px] overflow-hidden">
                {/* Laser guide rail */}
                <div className="absolute top-[22px] left-2 right-2 h-1 bg-[#1F1F1F] border-b border-white/5 z-10" />

                {/* Flying mechanical printhead nozzle box */}
                {(simState === 'running' && activeStepIdx === 4) ? (
                  <motion.div 
                    animate={{ x: ['-110px', '110px', '-110px'] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    className="absolute top-[14px] w-9 h-5 bg-[#FF3E00] border border-white/20 flex items-center justify-center z-30 shadow-md shadow-red-500/30"
                  >
                    <div className="flex gap-0.5 justify-center items-center">
                      <span className="w-1.5 h-2 bg-cyan-400 inline-block animate-pulse" />
                      <span className="w-1.5 h-2 bg-pink-500 inline-block" />
                      <span className="w-1.5 h-2 bg-yellow-400 inline-block animate-pulse" />
                      <span className="w-1.5 h-2 bg-white inline-block" />
                    </div>
                  </motion.div>
                ) : (
                  <div className="absolute top-[14px] left-4 w-9 h-5 bg-zinc-805 text-zinc-500 border border-white/5 z-30 flex items-center justify-center text-[7px] font-black">
                    REST
                  </div>
                )}

                {/* Feed slit roller shadow */}
                <div className="absolute top-[26px] left-3 right-3 h-2 bg-[#050505] border-t border-white/5 z-20 shadow-inner" />

                {/* Emerging printed sheet of paper */}
                <div 
                  className="w-[160px] bg-white text-black shadow-lg border border-slate-300 overflow-hidden relative transition-all duration-100 mt-4" 
                  style={{ 
                    // Let the paper emerge downward out of the roller
                    height: simState === 'idle' ? '0px' : `${printSubProgress * 1.1}px`, // Max 110px
                    minHeight: simState === 'idle' ? '0px' : '4px',
                    maxHeight: '110px'
                  }}
                >
                  <div className="w-full h-[110px] relative">
                    <img 
                      src={imageUrl} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      alt="Mechanical output sheet"
                    />
                    
                    {/* Unprinted white mask block simulating real ink laying directionally */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-white"
                      style={{ 
                        height: `${100 - printSubProgress}%` 
                      }}
                    />

                    {/* Highly glowing laser vapor line at the print threshold */}
                    {simState === 'running' && activeStepIdx === 4 && (
                      <div className="absolute bottom-[calc(100%-printSubProgress%)] left-0 right-0 h-1 bg-[#FF3E00] shadow-md shadow-red-500/80 animate-pulse z-20" />
                    )}
                  </div>
                </div>

                {/* Blank warning descriptor if idle */}
                {simState === 'idle' && (
                  <div className="text-[10px] font-mono text-zinc-600 uppercase text-center mt-4">
                    {lang === 'uz' ? 'USKUNA KUTILMOQDA' : lang === 'ru' ? 'ПРИНТЕР В ОЖИДАНИИ' : 'AWAITING COMMAND'}
                  </div>
                )}
              </div>

              {/* Live technical info bars with material specifications */}
              <div className="grid grid-cols-2 gap-2 text-[8px] font-mono mt-1 pt-1 opacity-85">
                <div className="bg-[#111111] p-1.5 border border-white/5">
                  <div className="text-slate-500 font-bold uppercase">{lang === 'uz' ? 'MATERIYAL' : lang === 'ru' ? 'МАТЕРИАЛ' : 'FEEDSTOCK'}</div>
                  <div className="text-white font-black uppercase mt-0.5 truncate">{selectedMaterial.name[lang].split(' ')[0]}</div>
                </div>
                <div className="bg-[#111111] p-1.5 border border-white/5">
                  <div className="text-slate-500 font-bold uppercase">{lang === 'uz' ? 'CHOP ETISH TEZLIGI' : lang === 'ru' ? 'СКОРОСТЬ' : 'VELOCITY'}</div>
                  <div className="text-white font-black mt-0.5">
                    {simState === 'running' && activeStepIdx === 4 ? '450 MM/S [ACT]' : '0 MM/S [STB]'}
                  </div>
                </div>
              </div>

              {/* Progress counter trackbar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[8px] font-mono text-slate-400">
                  <span>PRINT PROGRESS</span>
                  <span className="text-[#FF3E00] font-black">{Math.round(printSubProgress)}%</span>
                </div>
                <div className="w-full h-1 bg-[#111111] rounded-none overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-[#FF3E00] transition-all duration-100" 
                    style={{ width: `${printSubProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Color palette extraction overlay */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 w-full justify-between">
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <Palette className="w-3 h-3 text-slate-400" />
              <span>{getTranslation('aiColorsExtracted')}</span>
            </span>
            <div className="flex gap-1.5">
              {dominantColors.map((color, i) => (
                <div key={i} className="flex items-center gap-1 bg-[#111111] border border-white/10 p-1 rounded-none">
                  <div className="w-3.5 h-3.5 rounded-none" style={{ backgroundColor: color }} />
                  <span className="font-mono text-[9px] text-slate-400 select-all">{color}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal/Activity feed box */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 font-mono text-[11px] leading-relaxed relative flex-1 flex flex-col justify-between min-h-[220px]" id="logs-terminal">
          <div className="flex items-center justify-between border-b border-slate-950 pb-2 mb-3 text-xs text-slate-500 font-bold tracking-wider">
            <span>AI ENGINE ACTIVITY TIMELINE</span>
            {simState === 'running' && <Loader2 className="w-3 h-3 animate-spin text-brand-cyan" />}
          </div>

          {/* Log Lines */}
          <div className="space-y-2 overflow-y-auto max-h-[160px] text-slate-300 flex-1">
            {simState === 'idle' && (
              <div className="text-slate-500 italic p-2 text-center">
                {lang === 'uz' 
                  ? 'Kutish rejimi. Davom etish uchun "Ishga Tushirish" tugmasini bosing.' 
                  : lang === 'ru' 
                  ? 'Ожидание запуска. Нажмите "Создать заказ" слева для просмотра демо-шагов.' 
                  : 'Idle. Click "Process Order" on the left panel to trigger automated cloud actions.'}
              </div>
            )}
            {systemLogs.map((log, index) => (
              <div key={index} className="flex gap-2 items-start animate-fade-in">
                <span className="text-slate-600 font-bold select-none">{`>`}</span>
                <span>{log}</span>
              </div>
            ))}
          </div>

          {/* Success items block */}
          {simState === 'complete' && (
            <div className="mt-4 p-3 bg-brand-cyan/5 border border-brand-cyan/20 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-cyan">
                <CheckCircle className="w-4 h-4 text-brand-cyan" />
                <span>{getTranslation('mockPaid')} {simulatedOrderId}</span>
              </div>
              <p className="text-[10px] text-slate-400">
                {getTranslation('sendToQueue')}
              </p>
              
              {/* Dynamic QR block for pickup or courier delivery based on active selection */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#050505] p-4 border border-white/10">
                {deliveryMethod === 'pickup' ? (
                  <>
                    <MockQrCode value={simulatedOrderId} lang={lang} />
                    <div className="space-y-1.5 flex-1 text-left">
                      <span className="text-[10px] font-black uppercase text-[#FF3E00] tracking-widest block flex items-center gap-1.5 leading-none">
                        <QrCode className="w-3.5 h-3.5" />
                        {lang === 'uz' ? "BIOMЕTRIK KASSA / TERMINAL TICKET" : lang === 'ru' ? "ТЕРМИНАЛЬНЫЙ СУПЕРБИЛЕТ СКАНИРОВАНИЯ" : "TERMINAL SMART PICKUP PASS"}
                      </span>
                      <p className="text-[9px] text-slate-300 leading-relaxed font-sans font-medium">
                        {lang === 'uz' ? (
                          <>
                            Sizning aqlli buyurtmangiz tayyor! Terminalga kelganda ushbu <strong>dinamik QR-kodni</strong> skanerlang. CNC-plotter datchigi buyurtmani avtomatik ravishda bevosita sizga topshiradi.
                          </>
                        ) : lang === 'ru' ? (
                          <>
                            Ваш заказ успешно напечатан! Отсканируйте этот <strong>динамический QR-код</strong> у терминала самовывоза. Датчик плоттера мгновенно выдаст ваш заказ.
                          </>
                        ) : (
                          <>
                            Your print job is done! Scan this <strong>dynamic QR ticket</strong> at our self-pickup kiosk. The robotic plotter sensor will automatically dispense your physical package.
                          </>
                        )}
                      </p>
                      <div className="flex flex-wrap items-center gap-2.5 pt-1 font-mono text-[8.5px] uppercase font-bold text-slate-450 border-t border-white/5 mt-1">
                        <span className="text-[#FF3E00]">● {lang === 'uz' ? 'OLIB KETISH UCHUN TAYYOR' : lang === 'ru' ? 'ГОТОВ К ВЫДАЧЕ' : 'READY FOR PICKUP'}</span>
                        <span>|</span>
                        <span>{selectedFormat.dimensions} × {quantity} {lang === 'uz' ? 'ta' : lang === 'ru' ? 'шт' : 'pcs'}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <MockQrCode value={`COURIER-${simulatedOrderId}`} lang={lang} />
                    <div className="space-y-1.5 flex-1 text-left">
                      <span className="text-[10px] font-black uppercase text-[#FF3E00] tracking-widest block flex items-center gap-1.5 leading-none">
                        <span>🚚</span>
                        {getTranslation('deliveryStatus')}
                      </span>
                      <p className="text-[9px] text-slate-300 leading-relaxed font-sans font-medium">
                        {getTranslation('deliveryDesc')}
                      </p>
                      <div className="flex flex-wrap items-center gap-2.5 pt-1 font-mono text-[8.5px] uppercase font-bold text-slate-450 border-t border-white/5 mt-1">
                        <span className="text-emerald-400">● {lang === 'uz' ? 'YETKAZIB BERISHDA' : lang === 'ru' ? 'ОТПРАВЛЕНО КУРЬЕРОМ' : 'DISPATCHED COURIER'}</span>
                        <span>|</span>
                        <span>ROUTE CODE: {selectedUrgency.id.toUpperCase()}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
