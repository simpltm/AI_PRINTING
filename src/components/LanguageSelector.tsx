import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return (
    <div className="flex items-center gap-1 bg-[#111111] p-1 rounded-none border border-white/10" id="lang-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          id={`lang-btn-${lang.code}`}
          onClick={() => onLanguageChange(lang.code)}
          className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider rounded-none transition-all duration-200 flex items-center gap-1.5 ${
            currentLanguage === lang.code
              ? 'bg-[#FF3E00] text-white shadow-none'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A1A1A] border border-transparent'
          }`}
        >
          <span>{lang.flag}</span>
          <span className="hidden sm:inline">{lang.name}</span>
          <span className="inline sm:hidden uppercase">{lang.code}</span>
        </button>
      ))}
    </div>
  );
}
