import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../panier';
import Notifications from './Notifications';

const StickyNavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      navigate(`/dachbord?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const profileMenuItems = [
    { path: '/dachbord/profil', label: 'Mon Profil', icon: '👤' },
    { path: '/dachbord/order-history', label: 'Mes Commandes', icon: '📋' },
    { path: '/dachbord/wishlist', label: 'Ma Liste de Souhaits', icon: '❤️' },
    { path: '/dachbord/settings', label: 'Paramètres', icon: '⚙️' },
    { label: 'Se Déconnecter', icon: '🚪', action: () => navigate('/') }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      padding: isScrolled ? '0.5rem 2rem' : '1rem 2rem',
      boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem'
      }}>
        {/* Logo */}
        <Link to="/dachbord" style={{
          fontSize: isScrolled ? '1.5rem' : '2rem',
          fontWeight: 'bold',
          color: '#61dafb',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap'
        }}>
          🛍️ TechShop
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{
          flex: 1,
          maxWidth: '400px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              paddingRight: '3rem',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              background: 'rgba(255,255,255,0.9)'
            }}
            onFocus={(e) => e.target.style.borderColor = '#61dafb'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          <button
            type="submit"
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            🔍
          </button>
        </form>

        {/* Right Side Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Cart */}
          <Link
            to="/dachbord/panier"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              color: '#333',
              textDecoration: 'none',
              borderRadius: '20px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(97, 218, 251, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🛒</span>
            {items.length > 0 && (
              <span style={{
                background: '#ff6b6b',
                color: 'white',
                borderRadius: '50%',
                padding: '0.2rem 0.5rem',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                position: 'absolute',
                top: '0.2rem',
                right: '0.2rem'
              }}>
                {items.length}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <Notifications />

          {/* Profile Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'none',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(97, 218, 251, 0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              👤
            </button>

            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                minWidth: '200px',
                zIndex: 1001,
                overflow: 'hidden'
              }}>
                {profileMenuItems.map((item, index) => (
                  item.path ? (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setIsProfileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1rem',
                        color: '#333',
                        textDecoration: 'none',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setIsProfileMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1rem',
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        color: '#333',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for closing dropdown */}
      {isProfileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000
          }}
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default StickyNavBar;
