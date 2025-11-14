import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    // Update document direction for RTL support
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      display: 'flex',
      gap: '0.5rem'
    }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '20px',
            border: 'none',
            background: i18n.language === lang.code
              ? 'linear-gradient(45deg, #61dafb, #21b4d6)'
              : 'rgba(255,255,255,0.9)',
            color: i18n.language === lang.code ? 'white' : '#333',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: i18n.language === lang.code
              ? '0 4px 15px rgba(97, 218, 251, 0.4)'
              : '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
          title={lang.name}
        >
          <span>{lang.flag}</span>
          <span style={{ fontSize: '0.8rem' }}>{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
