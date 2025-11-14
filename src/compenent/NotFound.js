import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      {/* Animation SVG */}
      <div style={{ marginBottom: '2rem' }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#61dafb" strokeWidth="4" strokeDasharray="20 10">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <text x="100" y="110" textAnchor="middle" fontSize="60" fill="#ff6b6b">404</text>
        </svg>
      </div>

      <h1 style={{
        color: '#333',
        marginBottom: '1rem',
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}>
        Oups ! Page introuvable
      </h1>

      <p style={{
        color: '#666',
        marginBottom: '2rem',
        fontSize: '1.2rem',
        maxWidth: '500px'
      }}>
        La page que vous cherchez semble avoir disparu dans le cyberespace.
        Pas de panique, retournons à l'aventure shopping !
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link
          to="/dachbord"
          style={{
            background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
            color: 'white',
            padding: '1rem 2rem',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(97, 218, 251, 0.3)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🏠 Retour à l'accueil
        </Link>

        <Link
          to="/dachbord"
          style={{
            background: 'linear-gradient(45deg, #ff6b6b, #ff5252)',
            color: 'white',
            padding: '1rem 2rem',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🔍 Rechercher des produits
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
