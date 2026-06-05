import { Language } from '../types';
import { TRANSLATIONS, PRICING_PLANS } from '../data';
import { Check, ShieldCheck, Zap, Network, Cpu, Store, ArrowRight } from 'lucide-react';

interface PricingTiersProps {
  lang: Language;
}

export default function PricingTiers({ lang }: PricingTiersProps) {
  const getTranslation = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  // Localized prices helper
  const getPlanPrice = (usdPrice: number) => {
    if (lang === 'uz') {
      const uZSRate = 12800;
      return `${(usdPrice * uZSRate).toLocaleString()} so'm`;
    } else if (lang === 'ru') {
      const rUBRate = 90;
      return `${(usdPrice * rUBRate).toLocaleString()} руб`;
    } else {
      return `$${usdPrice}`;
    }
  };

  const getPlanIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store':
        return <Store className="w-6 h-6 text-brand-cyan" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-brand-orange" />;
      case 'Network':
        return <Network className="w-6 h-6 text-purple-400" />;
      default:
        return <Zap className="w-6 h-6 text-brand-cyan" />;
    }
  };

  return (
    <div className="space-y-8" id="pricing-tiers-component">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">{lang === 'uz' ? 'TARIFLAR' : lang === 'ru' ? 'МОДЕЛЬ ПОДПИСКИ' : 'AFFORDABLE PLANS'}</span>
        <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight">{getTranslation('pricingTitle')}</h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">{getTranslation('pricingDesc')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isPopular = plan.id === 'business';
          return (
            <div 
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className={`p-6 rounded-2xl border flex flex-col justify-between relative transition-all duration-300 ${
                isPopular 
                  ? 'bg-gradient-to-b from-primary-light via-slate-900/60 to-primary-dark border-brand-orange shadow-xl shadow-brand-orange/5 scale-100' 
                  : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700/80'
              }`}
            >
              {/* Popular orange flag */}
              {isPopular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-brand-orange text-slate-950 font-mono text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {getTranslation('popularText')}
                </div>
              )}

              <div className="space-y-6">
                {/* Icon & Title block */}
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-slate-400 tracking-wider font-semibold block">
                      {plan.id.toUpperCase()}
                    </span>
                    <h3 className="text-2xl font-display font-medium text-white tracking-tight">
                      {plan.name[lang]}
                    </h3>
                  </div>
                  <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800">
                    {getPlanIcon(plan.icon)}
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {plan.tagline[lang]}
                </p>

                {/* Localized Price */}
                <div className="py-4 border-y border-slate-800/80">
                  <span className="text-3xl sm:text-4.5xl font-display font-bold text-white tracking-tight">
                    {getPlanPrice(plan.price)}
                  </span>
                  <span className="text-xs text-slate-500 font-mono ml-1">
                    /{lang === 'uz' ? 'oylik' : lang === 'ru' ? 'месяц' : 'mo'}
                  </span>
                </div>

                {/* Features bullet list */}
                <ul className="space-y-3">
                  {plan.features[lang].map((feature, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs text-slate-300">
                      <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${isPopular ? 'text-brand-orange' : 'text-brand-cyan'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* In-App mock subscription trigger */}
              <button
                id={`sub-now-btn-${plan.id}`}
                onClick={() => {
                  alert(
                    lang === 'uz' 
                      ? `${plan.name[lang]} paketi ulanish so'rovi yuborildi! Tez orada mutaxassis bog'lanadi.` 
                      : lang === 'ru' 
                      ? `Запрос на подключение тарифа ${plan.name[lang]} отправлен! С вами свяжутся.` 
                      : `Integration inquiry for ${plan.name[lang]} submitted! Our specialists will reach out shortly.`
                  );
                }}
                className={`w-full mt-8 py-2.5 text-xs font-semibold rounded-lg transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5 ${
                  isPopular 
                    ? 'bg-brand-orange hover:bg-brand-orange/90 text-slate-950 shadow-md shadow-brand-orange/15' 
                    : 'bg-slate-800 hover:bg-slate-700/80 text-white border border-slate-750'
                }`}
              >
                <span>{lang === 'uz' ? 'Ulanish so\'rovi' : lang === 'ru' ? 'Подключить тариф' : 'Request Integration'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
