import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(data.message || 'Une erreur est survenue lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setError('Erreur de connexion. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
        fontSize: '2.5rem'
      }}>
        📞 Contactez-nous
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Informations de l'entreprise */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>🏢 Informations générales</h2>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#61dafb', marginBottom: '0.5rem' }}>TechShop SARL</h3>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>
              <strong>Adresse:</strong> 12 Rue de la Technologie, Casablanca, Maroc
            </p>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>
              <strong>Email:</strong> contact@techshop.ma
            </p>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>
              <strong>Téléphone:</strong> +212 6 12 34 56 78
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#61dafb', marginBottom: '0.5rem' }}>Horaires d'ouverture</h3>
            <ul style={{ color: '#666', paddingLeft: '1.5rem' }}>
              <li>Lundi – Vendredi : 9h00 – 18h00</li>
              <li>Samedi : 10h00 – 14h00</li>
              <li>Dimanche : Fermé</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#61dafb', marginBottom: '0.5rem' }}>🌐 Réseaux sociaux</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="https://www.techshop.ma" target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb', textDecoration: 'none' }}>
                🌍 Site officiel : www.techshop.ma
              </a>
              <a href="https://facebook.com/TechShopMA" target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb', textDecoration: 'none' }}>
                📱 Facebook : facebook.com/TechShopMA
              </a>
              <a href="https://instagram.com/TechShopMA" target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb', textDecoration: 'none' }}>
                📸 Instagram : instagram.com/TechShopMA
              </a>
              <a href="https://linkedin.com/company/techshop-ma" target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb', textDecoration: 'none' }}>
                💼 LinkedIn : linkedin.com/company/techshop-ma
              </a>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>📩 Formulaire de contact</h2>

          {error && (
            <div style={{
              background: '#f44336',
              color: 'white',
              padding: '1rem',
              borderRadius: '10px',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              ❌ {error}
            </div>
          )}

          {isSubmitted ? (
            <div style={{
              background: '#4caf50',
              color: 'white',
              padding: '1rem',
              borderRadius: '10px',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              ✅ Merci ! Votre message a été envoyé avec succès.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Adresse e-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Sujet *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
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

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: isLoading ? '#ccc' : 'linear-gradient(45deg, #61dafb, #21b4d6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'none')}
              >
                {isLoading ? '⏳ Envoi en cours...' : '📤 Envoyer'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Carte Google Maps */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '2rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1.5rem', textAlign: 'center' }}>🗺️ Notre Localisation</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.814997!2d-7.6256!3d33.5865!2m3!1f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd00f3c8b7f9%3A0x1234567890abcdef!2sCasablanca%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1663254123456"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
          title="Localisation TechShop"
        />
      </div>

      {/* Message de bienvenue */}
      <div style={{
        textAlign: 'center',
        background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
        color: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(97, 218, 251, 0.3)'
      }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>💬 Notre équipe est à votre écoute !</h3>
        <p style={{ margin: 0, fontSize: '1.1rem' }}>
          N'hésitez pas à nous écrire pour toute question, suggestion ou assistance technique.
        </p>
      </div>
    </div>
  );
};

export default Contact;
