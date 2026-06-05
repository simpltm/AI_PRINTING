import { useState } from 'react';
import { Language } from './types';
import { TRANSLATIONS } from './data';
import LanguageSelector from './components/LanguageSelector';
import LandingAbout from './components/LandingAbout';
import ClientSandbox from './components/ClientSandbox';
import OwnerCalculator from './components/OwnerCalculator';
import PricingTiers from './components/PricingTiers';
import OrderTrackingPanel from './components/OrderTrackingPanel';
import { 
  Building2, 
  Smartphone, 
  Layers, 
  ArrowRight, 
  Cpu, 
  Mail, 
  Users, 
  HelpCircle,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('uz');
  const [activeTab, setActiveTab] = useState<'landing' | 'client_demo' | 'owner_calc'>('landing');

  // Check if we are scanning a specific order URL
  const urlParams = new URLSearchParams(window.location.search);
  const scannedOrderId = urlParams.get('order');

  if (scannedOrderId) {
    return <OrderTrackingPanel orderId={scannedOrderId} lang={lang} />;
  }

  const getTranslation = (key: string) => {
    return TRANSLATIONS[key]?.[lang] || key;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col justify-between font-sans selection:bg-brand-cyan/20 selection:text-brand-cyan" id="app-root">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-4" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Brand Logo & Subtitle */}
          <div className="flex items-center gap-3" id="brand-logo">
            <div className="w-10 h-10 rounded-none bg-[#FF3E00] p-0.5">
              <div className="w-full h-full bg-[#050505] rounded-none flex items-center justify-center font-display font-black text-[#FF3E00] text-lg select-none italic">
                AI
               </div>
            </div>
            <div>
              <div className="font-display font-black text-white tracking-tighter text-xl flex items-center gap-1.5 leading-none uppercase italic">
                {getTranslation('navTitle')}
              </div>
              <span className="font-mono text-[9px] text-[#FF3E00]/60 uppercase tracking-[0.25em] block mt-1 font-bold">
                {getTranslation('navSubtitle')}
              </span>
            </div>
          </div>

          {/* Interactive Navigation Menu & Lang Switcher */}
          <div className="flex flex-wrap items-center gap-4" id="navigation-controls">
            <nav className="flex items-center gap-1 bg-[#111111] p-1 rounded-none border border-white/10" id="tabs-menu">
              <button
                id="tab-btn-landing"
                onClick={() => setActiveTab('landing')}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-none transition-all duration-200 cursor-pointer ${
                  activeTab === 'landing'
                    ? 'bg-[#FF3E00] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A1A1A]'
                }`}
              >
                {getTranslation('landingTab')}
              </button>
              <button
                id="tab-btn-client-demo"
                onClick={() => setActiveTab('client_demo')}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-none transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'client_demo'
                    ? 'bg-[#FF3E00] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A1A1A]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{lang === 'uz' ? 'Mijoz Demoraduni' : lang === 'ru' ? 'Клиент-Демо' : 'Client Demo'}</span>
              </button>
              <button
                id="tab-btn-owner-calc"
                onClick={() => setActiveTab('owner_calc')}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-none transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'owner_calc'
                    ? 'bg-[#FF3E00] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A1A1A]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{lang === 'uz' ? 'ROI & Tariflar' : lang === 'ru' ? 'Калькулятор и Тарифы' : 'ROI / Costing'}</span>
              </button>
            </nav>

            <LanguageSelector currentLanguage={lang} onLanguageChange={setLang} />
          </div>
        </div>
      </header>

      {/* 2. Main Portal Contents */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8" id="app-main-content">
        {activeTab === 'landing' && (
          <LandingAbout 
            lang={lang} 
            onStartDemo={() => setActiveTab('client_demo')}
            onStartCalculator={() => setActiveTab('owner_calc')}
          />
        )}

        {activeTab === 'client_demo' && (
          <div className="space-y-12 animate-fade-in" id="client-demo-wrapper">
            <div className="space-y-2 border-l-2 border-brand-cyan pl-4">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {lang === 'uz' ? "Mijoz Avtomatik yo'lida o'zingizni sinab ko'ring!" : lang === 'ru' ? "Протестируйте путь клиента в реальном времени" : "Test the Live Customer Order Autopilot Pipeline"}
              </h2>
              <p className="text-sm text-slate-400 max-w-3xl">
                {lang === 'uz' 
                  ? "Siz bu yerda o'z rasmingizni yuklashingiz yoki tayyor namunalarni tanlashingiz mumkin. Tizim avtomatik o'lcham, xavfsizlik chetlari (Bleed-control) va dominant ranglarni tahlil qilishini kuzating."
                  : lang === 'ru' 
                  ? "Параметры считываются автоматически: симулятор извлекает цветовую модель, добавляет блиды под обрез и направляет в умную очередь печати."
                  : "Upload custom prints or switch preset images. Monitor how our neural ingestion engine configures safe-bleed margins and extracts custom CYMK colors instantly."}
              </p>
            </div>
            <ClientSandbox lang={lang} />
          </div>
        )}

        {activeTab === 'owner_calc' && (
          <div className="space-y-16 animate-fade-in" id="owner-dashboard-wrapper">
            {/* ROI Math Block */}
            <div className="space-y-12">
              <div className="space-y-2 border-l-2 border-brand-orange pl-4">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {lang === 'uz' ? "Bosmaxona Rentabelligi & Sarmoyaning O'zini Oqlashi" : lang === 'ru' ? "Экономика и Окупаемость для Руководителей" : "Interactive Business Modeling & Profit Calculations"}
                </h2>
                <p className="text-sm text-slate-400 max-w-3xl">
                  {lang === 'uz'
                    ? "O'z bosmaxona miqyosingizga mos ravishda xodimlarning qo'lda bajaradigan yozishmalarga sarflangan soatlari va tejab qolinadigan xarajatlarni hisoblang."
                    : lang === 'ru'
                    ? "Введите объём заказов и среднюю зарплату сотрудника поддержки, чтобы понять чистую выгоду от внедрения AI Print в месяц."
                    : "Tune metrics like average receipt durations and monthly manager salaries to instantly calculate daily hours and labor costs reclaimed by AI Print."}
                </p>
              </div>
              <OwnerCalculator lang={lang} />
            </div>

            {/* Pricing Section */}
            <div className="border-t border-slate-900 pt-16">
              <PricingTiers lang={lang} />
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer Block */}
      <footer className="bg-slate-950 border-t border-slate-900 px-4 sm:px-6 py-10 mt-16 text-xs text-slate-500" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="space-y-2 text-center md:text-left">
            <div className="font-display font-bold text-slate-300 flex items-center justify-center md:justify-start gap-1.5 uppercase tracking-wider">
              <span>{getTranslation('navTitle')}</span>
              <span className="text-brand-cyan text-[10px] font-mono">MVP BUILD V1.0</span>
            </div>
            <p className="max-w-md text-slate-400 leading-normal">
              {lang === 'uz'
                ? "Dizaynerlar va qo'lda buyurtma olish menejerlari yukini kamaytiruvchi, bosmaxona uskunalariga fayllarni to'g'ridan-to'g'ri yetkazuvchi intellektual SaaS tizimi."
                : lang === 'ru'
                ? "Интеллектуальная SaaS-система автоматизации приема и предпечатной подготовки заказов для типографий и рекламных агентств."
                : "The advanced pre-print automation and customer intake SaaS ecosystem tailored for modern printing networks and advertising houses."}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
            <span className="text-slate-400 text-xs font-mono font-medium block">
              {getTranslation('contactUs')}
              <a href="mailto:info@aiprint.uz" className="text-brand-cyan hover:underline transition-colors font-semibold">
                info@aiprint.uz
              </a>
            </span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors">Uzbekistan</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300 transition-colors">Tashkent Tech Hub</a>
            </div>
            <p className="text-[10px] text-slate-600 font-mono mt-2">
              © {new Date().getFullYear()} AI Print Automation. {lang === 'uz' ? "Barcha huquqlar himoyalangan." : lang === 'ru' ? "Все права защищены." : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
