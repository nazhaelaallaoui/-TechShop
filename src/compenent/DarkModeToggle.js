import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '0.75rem',
        borderRadius: '50%',
        border: 'none',
        background: isDarkMode
          ? 'linear-gradient(45deg, #333, #555)'
          : 'linear-gradient(45deg, #61dafb, #21b4d6)',
        color: 'white',
        fontSize: '1.2rem',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
      title={isDarkMode ? 'Mode clair' : 'Mode sombre'}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;
