import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const OrderTracking = ({ orderId }) => {
  const { t } = useTranslation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load order data from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(o => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Mock order for demo
      const mockOrder = {
        id: orderId,
        status: 'shipped',
        date: '2024-01-15T10:30:00Z',
        estimatedDelivery: '2024-01-18',
        trackingNumber: 'TRK_' + Date.now(),
        items: [
          { id: 1, name: 'Smartphone Galaxy S23', qty: 1, price: 899 },
          { id: 2, name: 'Casque Sony WH-1000XM5', qty: 1, price: 349 }
        ],
        total: 1248,
        shippingAddress: {
          name: 'Jean Dupont',
          address: '123 Rue de la Paix',
          city: 'Paris',
          zipCode: '75001',
          country: 'France'
        },
        timeline: [
          {
            status: 'pending',
            date: '2024-01-15T08:00:00Z',
            description: 'Commande reçue et en traitement'
          },
          {
            status: 'processing',
            date: '2024-01-15T10:30:00Z',
            description: 'Commande en cours de préparation'
          },
          {
            status: 'shipped',
            date: '2024-01-16T14:20:00Z',
            description: 'Commande expédiée'
          }
        ]
      };
      setOrder(mockOrder);
      localStorage.setItem('orders', JSON.stringify([...orders, mockOrder]));
    }

    setLoading(false);
  }, [orderId]);

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: {
        label: t('pending'),
        color: '#ffa726',
        icon: '⏳',
        description: 'Votre commande est en attente de traitement'
      },
      processing: {
        label: 'En traitement',
        color: '#42a5f5',
        icon: '🔄',
        description: 'Nous préparons votre commande'
      },
      shipped: {
        label: t('shipped'),
        color: '#66bb6a',
        icon: '🚚',
        description: 'Votre commande est en cours de livraison'
      },
      delivered: {
        label: t('delivered'),
        color: '#26a69a',
        icon: '✅',
        description: 'Commande livrée avec succès'
      },
      cancelled: {
        label: t('cancelled'),
        color: '#ef5350',
        icon: '❌',
        description: 'Commande annulée'
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
        <p>Chargement du suivi de commande...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
        <h2 style={{ color: '#ff6b6b', marginBottom: '1rem' }}>Commande non trouvée</h2>
        <p style={{ color: '#666' }}>Le numéro de commande que vous avez saisi n'existe pas.</p>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const progressSteps = ['pending', 'processing', 'shipped', 'delivered'];
  const currentStepIndex = progressSteps.indexOf(order.status);

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
        📦 Suivi de Commande
      </h1>

      {/* Order Info Card */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
              Commande #{order.id}
            </h2>
            <p style={{ margin: '0', color: '#666' }}>
              Passée le {formatDate(order.date)}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              background: statusInfo.color,
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              {statusInfo.icon} {statusInfo.label}
            </div>
            <p style={{
              margin: '0.5rem 0 0 0',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#333'
            }}>
              Total: {order.total}€
            </p>
          </div>
        </div>

        <div style={{
          padding: '1rem',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '10px',
          border: '1px solid #e0e0e0'
        }}>
          <p style={{ margin: '0', color: '#555' }}>
            <strong>{statusInfo.icon} Statut actuel:</strong> {statusInfo.description}
          </p>
          {order.estimatedDelivery && (
            <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
              📅 Livraison estimée: {new Date(order.estimatedDelivery).toLocaleDateString('fr-FR')}
            </p>
          )}
          {order.trackingNumber && (
            <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
              🔍 Numéro de suivi: <strong>{order.trackingNumber}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Progress Timeline */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>📋 Chronologie de la commande</h3>

        <div style={{ position: 'relative' }}>
          {/* Progress Line */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            height: '2px',
            background: '#ddd',
            zIndex: 1
          }}>
            <div style={{
              width: `${((currentStepIndex + 1) / progressSteps.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
              transition: 'width 0.5s ease'
            }} />
          </div>

          {/* Timeline Steps */}
          <div style={{ display: 'grid', gap: '2rem', position: 'relative', zIndex: 2 }}>
            {progressSteps.map((step, index) => {
              const stepInfo = getStatusInfo(step);
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  opacity: isCompleted ? 1 : 0.5
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isCompleted ? stepInfo.color : '#ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: 'white',
                    border: isCurrent ? '3px solid #61dafb' : 'none',
                    boxShadow: isCurrent ? '0 0 15px rgba(97, 218, 251, 0.5)' : 'none'
                  }}>
                    {stepInfo.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: '0 0 0.25rem 0',
                      color: isCompleted ? '#333' : '#999'
                    }}>
                      {stepInfo.label}
                    </h4>
                    <p style={{
                      margin: '0',
                      color: isCompleted ? '#666' : '#ccc',
                      fontSize: '0.9rem'
                    }}>
                      {stepInfo.description}
                    </p>
                  </div>

                  {order.timeline && order.timeline.find(t => t.status === step) && (
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#999',
                      textAlign: 'right'
                    }}>
                      {formatDate(order.timeline.find(t => t.status === step).date)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Items */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>🛒 Articles commandés</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {order.items.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '10px',
                border: '1px solid #e0e0e0'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#333' }}>
                    {item.name}
                  </h4>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                    Quantité: {item.qty} × {item.price}€
                  </p>
                </div>
                <div style={{ fontWeight: 'bold', color: '#61dafb' }}>
                  {(item.qty * item.price).toFixed(2)}€
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>📍 Adresse de livraison</h3>
          <div style={{
            padding: '1rem',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '10px',
            border: '1px solid #e0e0e0'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: '#333' }}>
              {order.shippingAddress.name}
            </p>
            <p style={{ margin: '0', color: '#666', lineHeight: '1.5' }}>
              {order.shippingAddress.address}<br />
              {order.shippingAddress.zipCode} {order.shippingAddress.city}<br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>

      {/* Support */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '2rem',
        marginTop: '2rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>💬 Besoin d'aide ?</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Notre équipe de support est là pour vous aider avec votre commande.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            📞 Contacter le support
          </button>
          <button style={{
            background: 'linear-gradient(45deg, #25d366, #128c7e)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            💬 WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
