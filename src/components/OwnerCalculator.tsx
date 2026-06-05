import { useState } from 'react';
import { Language, PricingPlan } from '../types';
import { TRANSLATIONS, PRICING_PLANS } from '../data';
import { 
  Building2, 
  Clock, 
  TrendingUp, 
  Coins, 
  ShieldAlert, 
  ChevronRight, 
  HelpCircle,
  HelpCircle as InfoIcon
} from 'lucide-react';
import { motion } from 'motion/react';

interface OwnerCalculatorProps {
  lang: Language;
}

export default function OwnerCalculator({ lang }: OwnerCalculatorProps) {
  const getTranslation = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  // Set default settings depending on language currency defaults
  const getDefaultCurrencyParams = () => {
    switch (lang) {
      case 'uz':
        return {
          symbol: "so'm",
          salary: 5000000, // 5M sum/mo
          step: 200000,
          min: 1500000,
          max: 15000000,
          rateToUsd: 12800
        };
      case 'ru':
        return {
          symbol: 'руб',
          salary: 60000, // 60k rub/mo
          step: 2000,
          min: 20000,
          max: 200000,
          rateToUsd: 90
        };
      case 'en':
      default:
        return {
          symbol: '$',
          salary: 1500, // $1500/mo
          step: 50,
          min: 300,
          max: 6000,
          rateToUsd: 1
        };
    }
  };

  const currency = getDefaultCurrencyParams();

  // Slider inputs state
  const [dailyOrders, setDailyOrders] = useState<number>(300); // matching Slide 12
  const [minutesPerOrder, setMinutesPerOrder] = useState<number>(10); // matching Slide 12
  const [monthlySalary, setMonthlySalary] = useState<number>(currency.salary);

  // Sync state if language swaps currencies
  const [currLang, setCurrLang] = useState<Language>(lang);
  if (lang !== currLang) {
    setMonthlySalary(currency.salary);
    setCurrLang(lang);
  }

  // Mathematics variables based on Slide 12
  const dailyTimeTotalMin = dailyOrders * minutesPerOrder;
  const dailyTimeTotalHours = Math.round((dailyTimeTotalMin / 60) * 10) / 10;
  
  // 80% automated migration
  const automatedOrdersCount = Math.round(dailyOrders * 0.8);
  const hoursSavedDaily = Math.round((dailyTimeTotalHours * 0.8) * 10) / 10;
  
  // Estimated staff headcount required (assuming 1 manager works 8 hours a day, 22 days/mo)
  const calculateHeadcount = () => {
    // If we have 50 hours/day of support work, that's 50/8 = 6.2 full-time equivalent operators
    const heads = dailyTimeTotalHours / 8;
    return Math.max(1, Math.round(heads * 10) / 10);
  };
  const staffNeeded = calculateHeadcount();

  // Money spent on intake staff per month
  const currentStaffCostMonthly = Math.round(staffNeeded * monthlySalary);
  
  // AI Automation Savings (80% of staff time saved)
  const monthlySavingsAmt = Math.round(currentStaffCostMonthly * 0.8);

  // Recommended SaaS tier
  const recommendedSaaSTier = () => {
    if (dailyOrders <= 100) return PRICING_PLANS[0]; // Start
    if (dailyOrders <= 1000) return PRICING_PLANS[1]; // Business
    return PRICING_PLANS[2]; // Enterprise
  };
  const recommendedPlan = recommendedSaaSTier();

  // Convert USD Plan Price to custom currency
  const getSubPriceLocalized = (plan: PricingPlan) => {
    if (lang === 'uz') {
      return `${Math.round(plan.price * currency.rateToUsd).toLocaleString()} ${currency.symbol}`;
    } else if (lang === 'ru') {
      return `${Math.round(plan.price * currency.rateToUsd).toLocaleString()} ${currency.symbol}`;
    } else {
      return `${currency.symbol}${plan.price}`;
    }
  };

  const formatCurrencyValue = (val: number) => {
    return `${val.toLocaleString()} ${currency.symbol}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8" 
      id="owner-calculator-component"
    >
      {/* 3 Overview stat cards from presentation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Orders per Day */}
        <motion.div 
          whileHover={{ y: -3, borderColor: '#FF3E00' }}
          className="p-4 bg-[#0D0D0D] rounded-none border border-white/10 space-y-1 transition-colors duration-200"
        >
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
            {lang === 'uz' ? 'Kunlik Oqim' : lang === 'ru' ? 'Средний поток' : 'Daily Flow'}
          </span>
          <div className="text-xl sm:text-2xl font-display font-black text-white">
            {dailyOrders}
          </div>
          <p className="text-[10px] font-mono text-slate-450 uppercase font-black">
            {lang === 'uz' ? 'buyurtma / kun' : lang === 'ru' ? 'заказов в день' : 'orders / day'}
          </p>
        </motion.div>

        {/* Support load time */}
        <motion.div 
          whileHover={{ y: -3, borderColor: '#FF3E00' }}
          className="p-4 bg-[#0D0D0D] rounded-none border border-white/10 space-y-1 transition-colors duration-200"
        >
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
            {lang === 'uz' ? 'Menejer Ishi' : lang === 'ru' ? 'Работа менеджера' : 'Support Time'}
          </span>
          <div className="text-xl sm:text-2xl font-display font-black text-white">
            {minutesPerOrder} {lang === 'uz' ? 'daq' : lang === 'ru' ? 'мин' : 'min'}
          </div>
          <p className="text-[10px] font-mono text-slate-450 uppercase font-black">
            {lang === 'uz' ? 'bitta buyurtmaga' : lang === 'ru' ? 'на один заказ' : 'spent per job'}
          </p>
        </motion.div>

        {/* Total hours */}
        <motion.div 
          whileHover={{ y: -3, borderColor: '#FF3E00' }}
          className="p-4 bg-[#0D0D0D] rounded-none border border-white/10 space-y-1 transition-colors duration-200"
        >
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
            {lang === 'uz' ? 'Sarlfangan Vaqt' : lang === 'ru' ? 'Общее время' : 'Aggregated Time'}
          </span>
          <div className="text-xl sm:text-2xl font-display font-black text-white">
            {dailyTimeTotalHours} {lang === 'uz' ? 'soat' : lang === 'ru' ? 'ч' : 'hrs'}
          </div>
          <p className="text-[10px] font-mono text-slate-450 uppercase font-black">
            {lang === 'uz' ? 'kuniga yozishmalarda' : lang === 'ru' ? 'в день на согласование' : 'daily chats total'}
          </p>
        </motion.div>

        {/* Operators Headcount */}
        <motion.div 
          whileHover={{ y: -3, borderColor: '#FF3E00' }}
          className="p-4 bg-[#0D0D0D] rounded-none border border-white/10 space-y-1 transition-colors duration-200"
        >
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
            {lang === 'uz' ? 'Menejerlar Soni' : lang === 'ru' ? 'Требуется менеджеров' : 'Staff Intake Load'}
          </span>
          <div className="text-xl sm:text-2xl font-display font-black text-brand-orange">
            {staffNeeded} {lang === 'uz' ? 'kishi' : lang === 'ru' ? 'чел' : 'FTE'}
          </div>
          <p className="text-[10px] font-mono text-slate-450 uppercase font-black">
            {lang === 'uz' ? 'faqat kassa hujjati uchun' : lang === 'ru' ? 'для ручного сопровождения' : 'to solve backlog manual'}
          </p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Control Block */}
        <div className="lg:col-span-6 bg-[#0D0D0D] p-6 rounded-none border border-white/10 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
            <Building2 className="w-5 h-5 text-brand-cyan" />
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
              {lang === 'uz' ? 'Bosmaxonangiz ko\'rsatkichlari' : lang === 'ru' ? 'Параметры вашей типографии' : 'Configure Business Sliders'}
            </h4>
          </div>

          {/* Slider 1: Average Orders */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase tracking-wider">{getTranslation('ordersCount')}</span>
              <span className="text-brand-cyan font-black">{dailyOrders}</span>
            </div>
            <input
              id="roi-orders-slider"
              type="range"
              min="10"
              max="1000"
              step="10"
              value={dailyOrders}
              onChange={(e) => setDailyOrders(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            />
          </div>

          {/* Slider 2: Average Time */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase tracking-wider">{getTranslation('managerTime')}</span>
              <span className="text-brand-cyan font-black">{minutesPerOrder} {lang === 'uz' ? 'daqiqa' : lang === 'ru' ? 'минут' : 'min'}</span>
            </div>
            <input
              id="roi-time-slider"
              type="range"
              min="3"
              max="30"
              step="1"
              value={minutesPerOrder}
              onChange={(e) => setMinutesPerOrder(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            />
          </div>

          {/* Slider 3: Average Salary */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase tracking-wider">{getTranslation('managerSalary')}</span>
              <span className="text-brand-cyan font-black">{formatCurrencyValue(monthlySalary)}</span>
            </div>
            <input
              id="roi-salary-slider"
              type="range"
              min={currency.min}
              max={currency.max}
              step={currency.step}
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            />
            <div className="text-[10px] text-slate-500 font-mono italic">
              {lang === 'uz' 
                ? "*Xodimning soliqlari va barcha qo'shimcha xarajatlarini qo'shib hisoblang." 
                : lang === 'ru' 
                ? "*Учитывайте налоги, аренду рабочего места и премии менеджера." 
                : "*Make sure to include taxes, workspace rent, and support equipment costs."}
            </div>
          </div>
        </div>

        {/* Dynamic ROI Financial Results (Page 12) */}
        <div className="lg:col-span-6 bg-[#0D0D0D] p-6 rounded-none border border-white/10 space-y-6 flex flex-col justify-between" id="roi-calculations-card">
          <span className="text-xs font-mono text-brand-orange uppercase tracking-widest block font-black">
            {lang === 'uz' ? 'VNETRENIYE PLATFORMI (BOSXONAGA TA\'SIRI)' : lang === 'ru' ? 'В Н Е Д Р Е Н И Е  П Л А Т Ф О Р М Ы' : 'AUTO INTEGRATION YIELD'}
          </span>

          <div className="space-y-6">
            {/* ROI Item 1: Auto Orders */}
            <div className="border-l-2 border-brand-orange pl-4 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-black text-brand-orange">80%</span>
                <span className="text-xs text-slate-400 font-mono font-bold">
                  ({automatedOrdersCount} {lang === 'uz' ? 'buyurtma/kun' : lang === 'ru' ? 'заказов в день' : 'jobs / day'})
                </span>
              </div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-200">{getTranslation('autoscaledJobs')}</p>
              <p className="text-xs text-slate-450 leading-tight font-sans font-medium">
                {lang === 'uz' ? 'Xabar almashmasdan va dizayerlarsiz, rasm yuklangandayoq avtomatik ssenariyda chop bo\'limiga keladi.' : lang === 'ru' ? 'Без участия менеджера вообще — от загрузки послом до начала печати станка.' : 'Direct ingestion on autopilot, dropping directly to physical plates without admin lag.'}
              </p>
            </div>

            {/* ROI Item 2: Time Savings */}
            <div className="border-l-2 border-[#FF3E00] pl-4 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-black text-[#FF3E00]">
                  {hoursSavedDaily} {lang === 'uz' ? 'soat' : lang === 'ru' ? 'ч' : 'hrs'}
                </span>
              </div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-200">{getTranslation('timeSavedLabel')}</p>
              <p className="text-xs text-slate-450 leading-tight font-sans font-medium">
                {lang === 'uz' ? 'Kreativ, murakkab maketlar va VIP mijozlar bilan ishlash uchun bo\'shagan vaqt.' : lang === 'ru' ? 'Высвобождаемое ценное время операторов на творческие и действительно маржинальные задачи.' : 'Freed up labor headcount to target higher margins & major custom accounts.'}
              </p>
            </div>

            {/* ROI Item 3: Labor Money Saved */}
            <div className="border-l-2 border-emerald-400 pl-4 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-display font-black text-emerald-400">
                  {formatCurrencyValue(monthlySavingsAmt)}
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">/{lang === 'uz' ? 'oyiga tejash' : lang === 'ru' ? 'в месяц чистыми' : 'monthly saved'}</span>
              </div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-200">
                {lang === 'uz' ? 'Ish haqidan tejalgan sof foyda:' : lang === 'ru' ? 'Экономия фонда оплаты труда (ФОТ):' : 'Reclaimed Staff Salaries:'}
              </p>
            </div>
          </div>

          {/* Recommended SaaS package match */}
          <div className="mt-6 p-4 bg-[#050505] rounded-none border border-white/15">
            <span className="text-[9px] font-mono text-slate-450 uppercase tracking-widest block mb-2 font-black">
              {getTranslation('monthlySaaSRecommend')}
            </span>
            <div className="flex justify-between items-center bg-[#111111] p-3 rounded-none border border-white/5">
              <div className="space-y-0.5">
                <div className="text-xs font-black text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-none bg-[#FF3E00]" />
                  <span>AI PRINT - {recommendedPlan.name[lang]}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono font-black uppercase tracking-widest">{recommendedPlan.tagline[lang]}</div>
              </div>
              <div className="text-right">
                <span className="text-lg font-display font-black text-brand-cyan block">{getSubPriceLocalized(recommendedPlan)}</span>
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">/ {lang === 'uz' ? 'oylik' : lang === 'ru' ? 'в месяц' : 'monthly'}</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="uppercase tracking-wider font-bold">{getTranslation('paybackPeriod')}</span>
              <span className="text-emerald-400 font-black uppercase tracking-wider">{getTranslation('paybackValue')}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
