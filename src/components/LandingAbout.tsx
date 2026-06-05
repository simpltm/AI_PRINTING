import { Language } from '../types';
import { TRANSLATIONS, ROADMAP_ITEMS } from '../data';
import { 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare, 
  Timer, 
  Sparkles, 
  TrendingDown, 
  TrendingUp, 
  Layers, 
  ArrowRight,
  Workflow,
  Coins,
  ShieldCheck,
  Zap,
  Truck
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingAboutProps {
  lang: Language;
  onStartDemo: () => void;
  onStartCalculator: () => void;
}

export default function LandingAbout({ lang, onStartDemo, onStartCalculator }: LandingAboutProps) {
  const getTranslation = (key: string) => {
    return TRANSLATIONS[key]?.[lang] || key;
  };

  const currentWorkflowSteps = [
    { num: 1, text: getTranslation('procStep1') },
    { num: 2, text: getTranslation('procStep2') },
    { num: 3, text: getTranslation('procStep3') },
    { num: 4, text: getTranslation('procStep4') },
    { num: 5, text: getTranslation('procStep5') },
    { num: 6, text: getTranslation('procStep6') },
    { num: 7, text: getTranslation('procStep7') },
    { num: 8, text: getTranslation('procStep8') }
  ];

  const paintPoints = [
    {
      title: getTranslation('wrong1Title'),
      desc: getTranslation('wrong1Desc'),
      icon: <MessageSquare className="w-6 h-6 text-orange-500" />
    },
    {
      title: getTranslation('wrong2Title'),
      desc: getTranslation('wrong2Desc'),
      icon: <Timer className="w-6 h-6 text-orange-500" />
    },
    {
      title: getTranslation('wrong3Title'),
      desc: getTranslation('wrong3Desc'),
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />
    },
    {
      title: getTranslation('wrong4Title'),
      desc: getTranslation('wrong4Desc'),
      icon: <Layers className="w-6 h-6 text-orange-500" />
    }
  ];

  const featuresList = [
    {
      title: lang === 'uz' ? 'Buyurtma qabul qilish' : lang === 'ru' ? 'Приём заказа' : 'Order Intake',
      desc: lang === 'uz' ? 'Sayt yoki chat-bot orqali oson kirish' : lang === 'ru' ? 'Через оригинальный сайт или мессенджер' : 'Via web app or messaging chatbot integration',
      icon: <Workflow className="w-5 h-5 text-brand-cyan" />
    },
    {
      title: lang === 'uz' ? 'Rasm tahlili' : lang === 'ru' ? 'Анализ изображения' : 'In-depth Image Analysis',
      desc: lang === 'uz' ? 'Avtomatik o\'lcham va DPI aniqlash' : lang === 'ru' ? 'Автоматическое распознавание DPI' : 'Real-time DPI and dimensional checks',
      icon: <Sparkles className="w-5 h-5 text-brand-cyan" />
    },
    {
      title: lang === 'uz' ? 'Tayyor maket tayyorlash' : lang === 'ru' ? 'Подготовка макета' : 'Auto Blueprint Assembly',
      desc: lang === 'uz' ? 'Dizaynning xavfsizlik chetlarini moslash' : lang === 'ru' ? 'Кроп, цветокоррекция, ресайз и поля' : 'Auto alignment, bleed zones and resizing',
      icon: <Layers className="w-5 h-5 text-brand-cyan" />
    },
    {
      title: lang === 'uz' ? 'Qiymatni real vaqtda hisoblash' : lang === 'ru' ? 'Расчёт стоимости' : 'Pricing Formula Matrix',
      desc: lang === 'uz' ? 'Material, o\'lcham va shoshilinchlik bo\'yicha' : lang === 'ru' ? 'По размеру, материалу, срочности формулой' : 'Instant dynamic pricing calculator API',
      icon: <Coins className="w-5 h-5 text-brand-cyan" />
    },
    {
      title: lang === 'uz' ? 'Onlayn To\'lovlar' : lang === 'ru' ? 'Онлайн-оплата' : 'Instant Online Payments',
      desc: lang === 'uz' ? 'Hamkor to\'lov xizmatlari APIsi' : lang === 'ru' ? 'Интеграция платежных API систем' : 'Connected checkout via standard local gateway',
      icon: <ShieldCheck className="w-5 h-5 text-brand-cyan" />
    },
    {
      title: lang === 'uz' ? 'To\'g\'ridan-to\'g\'ri chop qilish' : lang === 'ru' ? 'Запуск в печать' : 'Direct Print Dispatch',
      desc: lang === 'uz' ? 'Operatorlarsiz uskunaga yuborish' : lang === 'ru' ? 'Прямая отправка на станок без оператора' : 'Sending file straight to printing queue',
      icon: <Zap className="w-5 h-5 text-brand-cyan" />
    }
  ];

  const outcomesReductions = [
    { percent: "-60%", title: lang === 'uz' ? 'Qabul menejerlari soni' : lang === 'ru' ? 'Менеджеров на приёмке заказов' : 'Order Intake Staff Overhead', icon: <TrendingDown className="w-5 h-5 text-rose-500" /> },
    { percent: "-75%", title: lang === 'uz' ? 'Bitta buyurtma sarfi vaqti' : lang === 'ru' ? 'Времени на обработку одного заказа' : 'Processing Duration per order', icon: <TrendingDown className="w-5 h-5 text-rose-500" /> },
    { percent: "-85%", title: lang === 'uz' ? 'Maket tayyorlash xatoliklari' : lang === 'ru' ? 'Ошибок при подготовке макетов' : 'Manual File Preparation Errors', icon: <TrendingDown className="w-5 h-5 text-rose-500" /> }
  ];

  const outcomesGains = [
    { percent: "+3×", title: lang === 'uz' ? 'Mijozlarga xizmat ko\'rsatish tezligi' : lang === 'ru' ? 'Скорость обслуживания клиента' : 'End-to-End Service Speed', icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
    { percent: "+40%", title: lang === 'uz' ? 'Shaxs sonini oshirmasdan buyurtmalar hajmi' : lang === 'ru' ? 'Количество заказов без расширения штата' : 'Intake volume with existing staff', icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
    { percent: "+25%", title: lang === 'uz' ? 'Kichik buyurtmalar rentabelliligi' : lang === 'ru' ? 'Маржинальность за счёт типовых тиражей' : 'Standard print order profit margins', icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-16 py-4" 
      id="landing-container"
    >
      {/* 1. Hero Block */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative px-6 py-12 md:py-18 bg-[#0D0D0D] rounded-none border border-white/10 overflow-hidden" 
        id="hero-section"
      >
        {/* Decorative solid side accent lines */}
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#FF3E00]" />
        
        <div className="max-w-5xl pl-4 md:pl-8 space-y-8">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-block text-[11px] font-mono tracking-[0.25em] text-[#FF3E00] uppercase bg-[#050505] px-4 py-1.5 rounded-none border border-white/10 font-black"
          >
            {getTranslation('heroBadge')}
          </motion.span>

          <div className="relative">
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-[90px] leading-[0.9] sm:leading-[0.85] font-black tracking-tighter uppercase mb-6 italic block"
            >
              {lang === 'uz' ? (
                <>
                  CHOP ETISHNI<br />
                  <span className="text-[#FF3E00]">AVTOMATLASHTIRING.</span>
                </>
              ) : lang === 'ru' ? (
                <>
                  ПЕЧАТЬ НА<br />
                  <span className="text-[#FF3E00]">АВТОПИЛОТЕ.</span>
                </>
              ) : (
                <>
                  PRINT INTAKE<br />
                  <span className="text-[#FF3E00]">AUTO-INTEGRATED.</span>
                </>
              )}
            </motion.h1>

            <div className="flex items-start gap-6 mt-4 border-l-2 border-[#FF3E00] pl-6">
              <div className="max-w-2xl">
                <p className="text-lg md:text-xl text-[#F5F5F5] font-bold tracking-tight uppercase mb-2 opacity-95">
                  AI Print Automation Platform Version 1.0
                </p>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed opacity-80 mb-6">
                  {getTranslation('heroDesc')}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: '#FF571C' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStartDemo}
                    id="cta-demo-btn"
                    className="px-8 py-4 bg-[#FF3E00] text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 transition-all duration-200 cursor-pointer rounded-none border border-transparent"
                  >
                    <span>{lang === 'uz' ? "DEMONI ISHGA TUSHIRISH" : lang === 'ru' ? "ЗАПУСТИТЬ ДЕМО" : "LAUNCH LIVE DEMO"}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03, backgroundColor: '#1C1C1C' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStartCalculator}
                    id="cta-calc-btn"
                    className="px-8 py-4 bg-[#111111] text-white font-black text-xs uppercase tracking-[0.2em] border border-white/10 transition-all duration-200 flex items-center gap-2 cursor-pointer rounded-none"
                  >
                    <span>{lang === 'uz' ? "KALKULYATOR & ROI" : lang === 'ru' ? "КАЛЬКУЛЯТОР & ROI" : "CALCULATE ROI"}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Before vs After: Comparison (Slide 14 & Slide 2 Combined) */}
      <section className="space-y-8" id="comparison-section">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-brand-orange uppercase tracking-wider">{lang === 'uz' ? 'TAQQOSLASH' : lang === 'ru' ? 'ИТОГ' : 'THE SHIFT'}</span>
          <h2 className="text-2xl sm:text-3.5xl font-display font-semibold tracking-tight">
            {lang === 'uz' ? 'Yangi Avlod Bosmaxonasi' : lang === 'ru' ? 'Типография нового поколения' : 'Next-Generation Printing Workflow'}
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            {lang === 'uz' ? 'Bitta operator butun bir jamoa o\'rnini bosadi' : lang === 'ru' ? 'Один оператор обслуживает объём заказов, который раньше требовал целую команду.' : 'A single system operator scales up orders that previously gridlocked entire billing and design teams.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Ranshe (Before) */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-6 bg-[#0D0D0D] rounded-none border border-rose-500/10 relative space-y-6 flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 bg-rose-500/10 text-rose-400 text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-rose-500/20">
              {lang === 'uz' ? 'AVVAL' : lang === 'ru' ? 'РАНЬШЕ' : 'BEFORE MANUAL'}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-display font-medium text-lg text-rose-300">
                {lang === 'uz' ? 'Zerikarli uzoq muloqot zanjiri' : lang === 'ru' ? 'Цепочка ручных согласований' : 'Manual Bottleneck Cycle'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'uz' ? 'Yozishmalar → o\'lcham va DPI aniqlash muammolari → qo\'lda maket tayyorlash → tasdiqlash → to\'lov kutish.' : lang === 'ru' ? 'Переписка → согласование размеров → ручная доработка в фотошопе → отправка чеков → долгое ожидания оператора.' : 'Chatting back and forth → manual pixel/DPI checks → designer adjustments in Photoshop → waiting for manual bank transfers.'}
              </p>
              <div className="space-y-2 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>10–15 {lang === 'uz' ? 'daqiqa bitta buyurtmaga' : lang === 'ru' ? 'минут общения и правок' : 'minutes of messaging chatter'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>{lang === 'uz' ? 'Sifat tufayli ko\'p xatolar' : lang === 'ru' ? 'Регулярный человеческий фактор' : 'Human element & print resolution errors'}</span>
                </div>
              </div>
            </div>

            <div className="bg-rose-950/15 p-3 rounded-none border border-rose-900/30 font-mono text-[11px] text-rose-400 mt-4 text-center">
              {lang === 'uz' ? '8 ta qo\'lda bajariladigan bosqichlar' : lang === 'ru' ? '8 ручных шагов до производства' : '8 manual workflow friction points'}
            </div>
          </motion.div>

          {/* Teper (Now) */}
          <motion.div 
            whileHover={{ y: -3, borderColor: '#FF3E00' }}
            className="p-6 bg-[#0E0E0E] rounded-none border border-[#FF3E00]/20 relative space-y-6 flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 bg-[#FF3E00]/10 text-[#FF3E00] text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-[#FF3E00]/20">
              {lang === 'uz' ? 'HOZIR' : lang === 'ru' ? 'ТЕПЕРЬ' : 'NOW WITH AI'}
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-medium text-lg text-[#FF3E00] flex items-center gap-2">
                <span>{lang === 'uz' ? 'Mijoz 30 soniyada chop etadi' : lang === 'ru' ? 'Автоматический запуск за 30 секунд' : '30-Second Autopilot Checkout'}</span>
                <Sparkles className="w-4 h-4" />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'uz' ? 'Rasmni yuklash → AI pre-print tayyorlash → Avtomatlashgan narx va to\'lov → To\'g\'ridan-to\'g\'ri pechat uskunasiga uzatish.' : lang === 'ru' ? 'Загрузка фото → моментальная ИИ-подгонка под вылеты → онлайн-оплата → прямая передача на станок.' : 'Instant customer upload → neural scaling & margin correction → integrated payments → file drops directly into hardware print queue.'}
              </p>
              <div className="space-y-2 border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]" />
                  <span className="font-semibold text-[#FF3E00]">30 {lang === 'uz' ? 'soniya yuklashdan chopgacha' : lang === 'ru' ? 'секунд от загрузки до оплаты' : 'seconds from portal action to machine'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]" />
                  <span>{lang === 'uz' ? '0% texnik xatolik xavfi' : lang === 'ru' ? '0% человеческих ошибок при вёрстке' : '0% manual sizing and cropping mistakes'}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FF3E00]/10 p-3 rounded-none border border-[#FF3E00]/20 font-mono text-[11px] text-[#FF3E00] mt-4 text-center font-black">
              {lang === 'uz' ? 'Faqat 1 ta foydalanuvchi harakati' : lang === 'ru' ? '1 действие со стороны клиента' : '1 core simple click path'}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Problem Grid (Page 2) */}
      <section className="space-y-8" id="problem-grid-section">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-brand-orange uppercase tracking-wider">{lang === 'uz' ? 'BOZOR MUAMMOSI' : lang === 'ru' ? 'ПРОБЛЕМА РЫНКА' : 'MARKET INEFFICIENCIES'}</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight">{getTranslation('problemTitle')}</h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">{getTranslation('problemSub')}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* The current process steps list */}
          <div className="lg:col-span-7 bg-[#0D0D0D] p-6 rounded-none border border-white/10 space-y-4">
            <h3 className="font-display font-medium text-xs font-mono text-slate-450 uppercase tracking-wider">{getTranslation('currentProcess')}</h3>
            <div className="space-y-3">
              {currentWorkflowSteps.map((step, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  key={step.num} 
                  className="flex items-center gap-3 p-3 bg-[#050505] rounded-none border border-white/5 hover:border-white/10 transition-colors"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-none bg-[#111111] text-[#FF3E00] text-xs flex items-center justify-center font-mono font-black border border-[#FF3E00]/20">
                    {step.num}
                  </span>
                  <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wide">{step.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pain points breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-medium text-xs font-mono text-slate-450 uppercase tracking-wider">{getTranslation('whatGoesWrong')}</h3>
            <div className="grid sm:grid-cols-1 gap-4">
              {paintPoints.map((pt, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  key={i} 
                  className="p-4 bg-[#0D0D0D] rounded-none border border-white/5 flex gap-4 items-start hover:border-[#FF3E00]/30 transition-all duration-200"
                >
                  <div className="p-2 bg-[#050505] border border-white/10">
                    {pt.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-xs font-black text-[#F5F5F5] uppercase tracking-wider">{pt.title}</h4>
                    <p className="text-xs text-slate-450 leading-relaxed font-sans font-medium">{pt.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Unified Solution (Page 3) */}
      <section className="bg-[#0D0D0D] p-8 rounded-none border border-white/10 space-y-8" id="unified-solution">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">{lang === 'uz' ? 'BIZNING YECHIM' : lang === 'ru' ? 'НАШЕ РЕШЕНИЕ' : 'OUR ECOSYSTEM'}</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight">{getTranslation('solTitle')}</h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">{getTranslation('solSub')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((f, idx) => (
            <motion.div 
              whileHover={{ y: -4, borderColor: '#FF3E00' }}
              transition={{ duration: 0.2 }}
              key={idx} 
              className="p-5 bg-[#050505] rounded-none border border-white/10 hover:border-[#FF3E00]/40 transition-all duration-200 space-y-3"
            >
              <div className="w-10 h-10 rounded-none bg-[#111111] border border-white/5 flex items-center justify-center">
                {f.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">{f.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Business Outcome Stats (Page 10) */}
      <section className="space-y-8" id="outcomes-stats">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">{lang === 'uz' ? 'TIZIM SAMARASI' : lang === 'ru' ? 'БИЗНЕС-ЭФФЕКТ' : 'BUSINESS METRICS'}</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight">
            {lang === 'uz' ? 'Bosmaxona va Agentliklar nima oladi?' : lang === 'ru' ? 'Что получает типография и агентство' : 'Tangible Enterprise Reductions & Gains'}
          </h2>
          <p className="text-sm text-slate-400">
            {lang === 'uz' ? 'Kompaniya xodimlarni ko\'paytirmasdan buyurtmalar sonini 3 martagacha oshiradi.' : lang === 'ru' ? 'Компания обрабатывает в разы больше заказов без расширения штата за счет автоматизации.' : 'Scale printing ingestion exponentially without hiring more support representatives.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cost Reductions */}
          <div className="p-6 bg-[#0D0D0D] rounded-none border border-white/10 space-y-6">
            <h3 className="font-mono text-xs text-rose-500 font-black uppercase tracking-widest flex items-center gap-1.5">
              <span>{lang === 'uz' ? 'QISQARADI / KAMAYADI' : lang === 'ru' ? 'С О К Р А Щ А Е Т С Я' : 'REDUCTIONS (-)'}</span>
            </h3>
            <div className="space-y-4">
              {outcomesReductions.map((item, idx) => (
                <motion.div 
                  whileHover={{ x: 3 }}
                  key={idx} 
                  className="flex items-center gap-4 p-4 bg-[#050505] rounded-none border border-white/5"
                >
                  <div className="text-3xl sm:text-4xl font-display font-black text-rose-500 font-mono w-28 tracking-tighter">
                    {item.percent}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-[#F5F5F5] uppercase tracking-wider leading-tight">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Business Gains */}
          <div className="p-6 bg-[#0D0D0D] rounded-none border border-white/10 space-y-6">
            <h3 className="font-mono text-xs text-[#FF3E00] font-black uppercase tracking-widest flex items-center gap-1.5">
              <span>{lang === 'uz' ? 'OSHADI / O\'SADI' : lang === 'ru' ? 'Р А С Т Ё Т' : 'BUSINESS GAINS (+)'}</span>
            </h3>
            <div className="space-y-4">
              {outcomesGains.map((item, idx) => (
                <motion.div 
                  whileHover={{ x: 3 }}
                  key={idx} 
                  className="flex items-center gap-4 p-4 bg-[#050505] rounded-none border border-white/5"
                >
                  <div className="text-3xl sm:text-4xl font-display font-black text-[#FF3E00] font-mono w-28 tracking-tighter">
                    {item.percent}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-[#F5F5F5] uppercase tracking-wider leading-tight">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Evolutionary Product Roadmap (Page 13) */}
      <section className="space-y-8" id="roadmap-section">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-brand-orange uppercase tracking-wider">{lang === 'uz' ? 'STRATEGIK REJA' : lang === 'ru' ? 'РАЗВИТИЕ ПЛАТФОРМЫ' : 'FUTURE EVOLUTION'}</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight">{getTranslation('futureTitle')}</h2>
          <p className="text-sm text-slate-400 max-w-3xl mx-auto">{getTranslation('futureDesc')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROADMAP_ITEMS.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              whileHover={{ y: -3, borderColor: '#FF3E00' }}
              key={item.id} 
              className="p-5 bg-[#0D0D0D] rounded-none border border-white/5 relative space-y-3 group hover:border-[#FF3E00]/40 transition-colors duration-200"
            >
              <div className="absolute top-4 right-4 bg-[#FF3E00]/10 text-[#FF3E00] font-mono text-[9px] font-black px-2 py-0.5 rounded-none border border-[#FF3E00]/20 uppercase tracking-widest">
                {item.quarter}
              </div>
              <div className="w-8 h-8 rounded-none bg-[#111111] flex items-center justify-center font-mono text-xs font-black text-slate-350 border border-white/5">
                Q{item.id}
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-black text-xs text-slate-100 uppercase tracking-wider">{item.title[lang]}</h4>
                <p className="text-xs text-slate-450 leading-relaxed font-sans font-medium">{item.desc[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Landing Call to Action */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-[#0D0D0D] rounded-none border border-white/10 space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF3E00] to-transparent" />
        <h3 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white uppercase italic">
          {getTranslation('ctaText')}
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          {getTranslation('pricingDesc')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartDemo}
            className="px-8 py-3.5 bg-[#FF3E00] text-white text-xs font-black uppercase tracking-widest rounded-none transition-transform cursor-pointer border border-transparent"
          >
            {lang === 'uz' ? 'Sinxron Demo' : lang === 'ru' ? 'Запустить клиентское демо' : 'Run Interactive Demo'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#1C1C1C' }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartCalculator}
            className="px-8 py-3.5 bg-[#111111] text-white text-xs font-black uppercase tracking-widest rounded-none border border-white/10 transition-transform cursor-pointer"
          >
            {getTranslation('roiTitle')}
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
}
