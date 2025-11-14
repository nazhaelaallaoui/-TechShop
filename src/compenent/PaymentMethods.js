import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PaymentMethods = ({ total, onPaymentComplete }) => {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    paypalEmail: '',
    cashOnDelivery: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte bancaire',
      icon: '💳',
      description: 'Visa, MasterCard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Paiement sécurisé PayPal'
    },
    {
      id: 'cash',
      name: 'Paiement à la livraison',
      icon: '💵',
      description: 'Payez en espèces lors de la livraison'
    }
  ];

  const validateCard = () => {
    const newErrors = {};

    if (!paymentData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Numéro de carte invalide (16 chiffres)';
    }

    if (!paymentData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiryDate = 'Date d\'expiration invalide (MM/YY)';
    }

    if (!paymentData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'CVV invalide (3-4 chiffres)';
    }

    if (!paymentData.cardName.trim()) {
      newErrors.cardName = 'Nom sur la carte requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayPal = () => {
    const newErrors = {};

    if (!paymentData.paypalEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.paypalEmail = 'Email PayPal invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    setLoading(true);
    setErrors({});

    let isValid = false;

    switch (selectedMethod) {
      case 'card':
        isValid = validateCard();
        break;
      case 'paypal':
        isValid = validatePayPal();
        break;
      case 'cash':
        isValid = true; // No validation needed for cash on delivery
        break;
      default:
        isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      return;
    }

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate payment success/failure (90% success rate)
      const success = Math.random() > 0.1;

      if (success) {
        onPaymentComplete({
          method: selectedMethod,
          amount: total,
          status: 'success',
          transactionId: 'TXN_' + Date.now(),
          timestamp: new Date().toISOString()
        });
      } else {
        setErrors({ general: 'Paiement refusé. Veuillez réessayer.' });
      }
    } catch (error) {
      setErrors({ general: 'Erreur de paiement. Veuillez réessayer.' });
    }

    setLoading(false);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>
        {t('paymentMethod')}
      </h2>

      {errors.general && (
        <div style={{
          color: '#f44336',
          background: '#ffebee',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {errors.general}
        </div>
      )}

      {/* Payment Methods Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#555' }}>Choisissez votre méthode de paiement</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                border: `2px solid ${selectedMethod === method.id ? '#61dafb' : '#ddd'}`,
                borderRadius: '10px',
                background: selectedMethod === method.id ? 'rgba(97, 218, 251, 0.1)' : 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{method.icon}</span>
              <div>
                <div style={{ fontWeight: '600', color: '#333' }}>{method.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{method.description}</div>
              </div>
              <input
                type="radio"
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                style={{ marginLeft: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payment Forms */}
      {selectedMethod === 'card' && (
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#333' }}>Informations de carte bancaire</h4>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <input
                type="text"
                placeholder="Numéro de carte"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({
                  ...paymentData,
                  cardNumber: formatCardNumber(e.target.value)
                })}
                maxLength="19"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${errors.cardNumber ? '#f44336' : '#ddd'}`,
                  boxSizing: 'border-box'
                }}
              />
              {errors.cardNumber && <span style={{ color: '#f44336', fontSize: '0.9rem' }}>{errors.cardNumber}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData({
                    ...paymentData,
                    expiryDate: formatExpiryDate(e.target.value)
                  })}
                  maxLength="5"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${errors.expiryDate ? '#f44336' : '#ddd'}`,
                    boxSizing: 'border-box'
                  }}
                />
                {errors.expiryDate && <span style={{ color: '#f44336', fontSize: '0.9rem' }}>{errors.expiryDate}</span>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="CVV"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({
                    ...paymentData,
                    cvv: e.target.value.replace(/\D/g, '').substring(0, 4)
                  })}
                  maxLength="4"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${errors.cvv ? '#f44336' : '#ddd'}`,
                    boxSizing: 'border-box'
                  }}
                />
                {errors.cvv && <span style={{ color: '#f44336', fontSize: '0.9rem' }}>{errors.cvv}</span>}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Nom sur la carte"
                value={paymentData.cardName}
                onChange={(e) => setPaymentData({
                  ...paymentData,
                  cardName: e.target.value
                })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `1px solid ${errors.cardName ? '#f44336' : '#ddd'}`,
                  boxSizing: 'border-box'
                }}
              />
              {errors.cardName && <span style={{ color: '#f44336', fontSize: '0.9rem' }}>{errors.cardName}</span>}
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'paypal' && (
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#333' }}>Connexion PayPal</h4>

          <div>
            <input
              type="email"
              placeholder="Email PayPal"
              value={paymentData.paypalEmail}
              onChange={(e) => setPaymentData({
                ...paymentData,
                paypalEmail: e.target.value
              })}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: `1px solid ${errors.paypalEmail ? '#f44336' : '#ddd'}`,
                boxSizing: 'border-box'
              }}
            />
            {errors.paypalEmail && <span style={{ color: '#f44336', fontSize: '0.9rem' }}>{errors.paypalEmail}</span>}
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
              style={{
                background: '#0070ba',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              🅿️ Se connecter à PayPal
            </button>
          </div>
        </div>
      )}

      {selectedMethod === 'cash' && (
        <div style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💵</div>
          <h4 style={{ marginBottom: '1rem', color: '#333' }}>Paiement à la livraison</h4>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Payez en espèces lors de la réception de votre commande.
            Aucun frais supplémentaire.
          </p>
          <div style={{
            background: '#fff3cd',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ffeaa7'
          }}>
            <strong>Montant à préparer: {total.toFixed(2)}€</strong>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div style={{
        background: 'rgba(255,255,255,0.8)',
        padding: '1.5rem',
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>{t('orderSummary')}</h4>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>{t('subtotal')}:</span>
          <span>{(total * 0.8).toFixed(2)}€</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>{t('shipping')}:</span>
          <span>{total > 50 ? '0.00€' : '5.99€'}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>{t('tax')}:</span>
          <span>{(total * 0.2).toFixed(2)}€</span>
        </div>

        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #ddd' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span>{t('total')}:</span>
          <span>{total.toFixed(2)}€</span>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: '100%',
          background: loading ? '#ccc' : 'linear-gradient(45deg, #4caf50, #66bb6a)',
          color: 'white',
          border: 'none',
          padding: '1rem',
          borderRadius: '10px',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        {loading ? (
          <span>🔄 Traitement en cours...</span>
        ) : (
          <span>💳 {t('placeOrder')} - {total.toFixed(2)}€</span>
        )}
      </button>

      <div style={{
        marginTop: '1rem',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        🔒 Paiement sécurisé SSL • 30 jours pour retourner
      </div>
    </div>
  );
};

export default PaymentMethods;
