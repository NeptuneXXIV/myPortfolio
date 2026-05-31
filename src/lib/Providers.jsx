'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { translations } from '../data/translations';

// Create Language Context
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export function Providers({ children }) {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLang = localStorage.getItem('portfolio_lang');
    if (savedLang) {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'fr' : 'en';
    setLang(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const t = translations[lang];

  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    </NextThemesProvider>
  );
}
