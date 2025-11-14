import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'fr',
    notifications: true,
    emailUpdates: false,
    currency: 'EUR',
    privacyMode: false,
    autoSave: true,
    compactView: false
  });

  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Load user profile
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUserProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  const handleProfileChange = (key, value) => {
    const newProfile = { ...userProfile, [key]: value };
    setUserProfile(newProfile);

    // Update current user in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedUser = { ...currentUser, [key]: value };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const exportData = () => {
    const data = {
      profile: userProfile,
      settings: settings,
      orders: JSON.parse(localStorage.getItem('orders') || '[]'),
      wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
      cart: JSON.parse(localStorage.getItem('cart') || '[]')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-data-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.')) {
      localStorage.clear();
      alert('Toutes les données ont été supprimées.');
      window.location.reload();
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
        fontSize: '2.5rem'
      }}>
        ⚙️ Paramètres du Site
      </h1>

      {/* Profile Settings */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>👤 Profil Utilisateur</h2>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Nom complet
            </label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Email
            </label>
            <input
              type="email"
              value={userProfile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Téléphone
            </label>
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Adresse
            </label>
            <textarea
              value={userProfile.address}
              onChange={(e) => handleProfileChange('address', e.target.value)}
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>🔧 Paramètres du Site</h2>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Thème
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="auto">Automatique</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Langue
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Devise
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('currency', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="EUR">Euro (€)</option>
              <option value="USD">Dollar ($)</option>
              <option value="GBP">Livre (£)</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              id="notifications"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              style={{ width: '20px', height: '20px' }}
            />
            <label htmlFor="notifications" style={{ fontWeight: '600' }}>
              Notifications push
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              id="emailUpdates"
              checked={settings.emailUpdates}
              onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
              style={{ width: '20px', height: '20px' }}
            />
            <label htmlFor="emailUpdates" style={{ fontWeight: '600' }}>
              Mises à jour par email
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              id="privacyMode"
              checked={settings.privacyMode}
              onChange={(e) => handleSettingChange('privacyMode', e.target.checked)}
              style={{ width: '20px', height: '20px' }}
            />
            <label htmlFor="privacyMode" style={{ fontWeight: '600' }}>
              Mode privé (masquer l'activité)
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              id="autoSave"
              checked={settings.autoSave}
              onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
              style={{ width: '20px', height: '20px' }}
            />
            <label htmlFor="autoSave" style={{ fontWeight: '600' }}>
              Sauvegarde automatique
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="checkbox"
              id="compactView"
              checked={settings.compactView}
              onChange={(e) => handleSettingChange('compactView', e.target.checked)}
              style={{ width: '20px', height: '20px' }}
            />
            <label htmlFor="compactView" style={{ fontWeight: '600' }}>
              Vue compacte
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '2rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>💾 Gestion des Données</h2>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={exportData}
            style={{
              background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            📥 Exporter mes données
          </button>

          <button
            onClick={clearAllData}
            style={{
              background: 'linear-gradient(45deg, #f44336, #e53935)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            🗑️ Supprimer toutes les données
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
