import React from 'react';

const About = () => {
  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
        fontSize: '2.5rem'
      }}>
        📖 À propos de TechShop
      </h1>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '3rem',
        marginBottom: '3rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{
          color: '#61dafb',
          marginBottom: '1rem',
          fontSize: '2rem'
        }}>
          Bienvenue chez TechShop SARL
        </h2>
        <p style={{
          color: '#666',
          fontSize: '1.2rem',
          lineHeight: '1.6',
          margin: '0'
        }}>
          Votre destination ultime pour les dernières technologies. Depuis notre création en 2020,
          nous nous engageons à offrir des produits de qualité supérieure avec un service client exceptionnel.
        </p>
      </div>

      {/* Mission Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Notre Mission</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Fournir des produits technologiques innovants et accessibles à tous,
            en garantissant qualité, sécurité et satisfaction client.
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👁️</div>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Notre Vision</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Devenir le leader e-commerce technologique en Afrique du Nord,
            reconnu pour notre excellence et notre innovation.
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</div>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Nos Valeurs</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Intégrité, innovation, excellence du service et engagement
            envers la satisfaction de nos clients.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
        borderRadius: '15px',
        padding: '3rem',
        marginBottom: '3rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>TechShop en Chiffres</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>50K+</div>
            <div>Clients Satisfaits</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>10K+</div>
            <div>Produits Disponibles</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>99%</div>
            <div>Taux de Satisfaction</div>
          </div>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>24/7</div>
            <div>Support Client</div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '3rem',
        marginBottom: '3rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#333', marginBottom: '2rem' }}>Notre Équipe</h2>
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          Une équipe passionnée de professionnels dédiés à votre satisfaction.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '10px',
            padding: '1.5rem',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍💼</div>
            <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Ahmed Bennani</h4>
            <p style={{ color: '#666', margin: '0' }}>Directeur Général</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '10px',
            padding: '1.5rem',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👩‍💻</div>
            <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Fatima Alaoui</h4>
            <p style={{ color: '#666', margin: '0' }}>Directrice Technique</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '10px',
            padding: '1.5rem',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍💼</div>
            <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>Youssef Tazi</h4>
            <p style={{ color: '#666', margin: '0' }}>Responsable Commercial</p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div style={{
        background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
        borderRadius: '15px',
        padding: '3rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Contactez-nous</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Besoin d'aide ? Notre équipe est là pour vous accompagner.
        </p>
        <button style={{
          background: 'white',
          color: '#4caf50',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '25px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          📞 Nous Contacter
        </button>
      </div>
    </div>
  );
};

export default About;
