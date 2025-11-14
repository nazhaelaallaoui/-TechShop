import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffa726';
      case 'processing': return '#42a5f5';
      case 'shipped': return '#66bb6a';
      case 'delivered': return '#26a69a';
      case 'cancelled': return '#ef5350';
      default: return '#999';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'processing': return 'En traitement';
      case 'shipped': return 'Expédié';
      case 'delivered': return 'Livré';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333',
        fontSize: '2.5rem'
      }}>
        Historique des Commandes
      </h1>

      {orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#666', marginBottom: '1rem' }}>Aucune commande trouvée</h2>
          <p style={{ color: '#999' }}>Vous n'avez pas encore passé de commande.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
                borderRadius: '15px',
                padding: '1.5rem',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <h3 style={{
                    margin: '0 0 0.5rem 0',
                    color: '#333',
                    fontSize: '1.2rem'
                  }}>
                    Commande #{order.id}
                  </h3>
                  <p style={{
                    margin: '0',
                    color: '#666',
                    fontSize: '0.9rem'
                  }}>
                    {formatDate(order.date)}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    background: getStatusColor(order.status),
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    {getStatusText(order.status)}
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
                borderTop: '1px solid #e0e0e0',
                paddingTop: '1rem'
              }}>
                <h4 style={{
                  margin: '0 0 1rem 0',
                  color: '#555',
                  fontSize: '1rem'
                }}>
                  Articles commandés:
                </h4>
                <div style={{
                  display: 'grid',
                  gap: '0.75rem',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
                }}>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.75rem',
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '10px',
                        border: '1px solid #f0f0f0'
                      }}
                    >
                      <img
                        src={item.image || 'https://via.placeholder.com/60x60/61dafb/ffffff?text=Img'}
                        alt={item.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h5 style={{
                          margin: '0 0 0.25rem 0',
                          fontSize: '0.9rem',
                          color: '#333'
                        }}>
                          {item.name}
                        </h5>
                        <p style={{
                          margin: '0',
                          fontSize: '0.8rem',
                          color: '#666'
                        }}>
                          Quantité: {item.qty} × {item.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
