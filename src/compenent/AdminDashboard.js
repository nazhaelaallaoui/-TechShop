import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    recentOrders: [],
    topProducts: []
  });

  useEffect(() => {
    // Load data from localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    setProducts(savedProducts);
    setUsers(savedUsers);
    setOrders(savedOrders);

    // Calculate analytics
    const revenue = savedOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    const recentOrders = savedOrders.slice(-5).reverse();

    setAnalytics({
      totalRevenue: revenue,
      totalOrders: savedOrders.length,
      totalUsers: savedUsers.length,
      totalProducts: savedProducts.length,
      recentOrders,
      topProducts: savedProducts.slice(0, 5)
    });
  }, []);

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div style={{
      background: `linear-gradient(145deg, ${color}20, ${color}10)`,
      borderRadius: '15px',
      padding: '1.5rem',
      textAlign: 'center',
      border: `1px solid ${color}30`
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>{value}</div>
      <div style={{ color: '#666', fontSize: '0.9rem' }}>{title}</div>
    </div>
  );

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
        📊 {t('adminPanel')}
      </h1>

      {/* Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'overview', label: 'Vue d\'ensemble', icon: '📈' },
          { id: 'products', label: t('manageProducts'), icon: '📦' },
          { id: 'users', label: t('manageUsers'), icon: '👥' },
          { id: 'orders', label: t('manageOrders'), icon: '📋' },
          { id: 'analytics', label: t('analytics'), icon: '📊' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id
                ? 'linear-gradient(45deg, #61dafb, #21b4d6)'
                : 'rgba(255,255,255,0.9)',
              color: activeTab === tab.id ? 'white' : '#333',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: activeTab === tab.id
                ? '0 4px 15px rgba(97, 218, 251, 0.4)'
                : '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <StatCard
              title="Revenus totaux"
              value={`${analytics.totalRevenue.toFixed(2)}€`}
              icon="💰"
              color="#4caf50"
            />
            <StatCard
              title="Commandes totales"
              value={analytics.totalOrders}
              icon="📦"
              color="#2196f3"
            />
            <StatCard
              title="Utilisateurs"
              value={analytics.totalUsers}
              icon="👥"
              color="#ff9800"
            />
            <StatCard
              title="Produits"
              value={analytics.totalProducts}
              icon="🛍️"
              color="#9c27b0"
            />
          </div>

          {/* Recent Orders */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>📋 Commandes récentes</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {analytics.recentOrders.length > 0 ? analytics.recentOrders.map(order => (
                <div key={order.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.8)',
                  borderRadius: '10px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#333' }}>
                      Commande #{order.id}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: '#61dafb' }}>
                      {order.total}€
                    </div>
                    <div style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      background: order.status === 'delivered' ? '#4caf50' :
                                 order.status === 'shipped' ? '#2196f3' :
                                 order.status === 'processing' ? '#ff9800' : '#f44336',
                      color: 'white'
                    }}>
                      {order.status}
                    </div>
                  </div>
                </div>
              )) : (
                <p style={{ textAlign: 'center', color: '#666' }}>Aucune commande récente</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Products Management */}
      {activeTab === 'products' && (
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ color: '#333' }}>📦 Gestion des produits</h3>
            <button style={{
              background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              ➕ Ajouter un produit
            </button>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {products.map(product => (
              <div key={product.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '10px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: '600', color: '#333' }}>{product.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {product.price}€ • Stock: {product.stock || 'N/A'}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{
                    background: '#2196f3',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    cursor: 'pointer'
                  }}>
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    style={{
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Management */}
      {activeTab === 'users' && (
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>👥 Gestion des utilisateurs</h3>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {users.map(user => (
              <div key={user.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '10px',
                border: '1px solid #e0e0e0'
              }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#333' }}>
                    {user.name || user.email}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {user.email} • Inscrit le {new Date(user.createdAt || Date.now()).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{
                    background: '#2196f3',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '15px',
                    cursor: 'pointer'
                  }}>
                    👁️ Voir profil
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={{
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    🚫 Bloquer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Management */}
      {activeTab === 'orders' && (
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>📋 Gestion des commandes</h3>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {orders.map(order => (
              <div key={order.id} style={{
                padding: '1rem',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '10px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#333' }}>
                      Commande #{order.id}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {new Date(order.date).toLocaleDateString('fr-FR')} • {order.total}€
                    </div>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      background: 'white'
                    }}
                  >
                    <option value="pending">En attente</option>
                    <option value="processing">En traitement</option>
                    <option value="shipped">Expédié</option>
                    <option value="delivered">Livré</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>

                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {order.items?.length || 0} article(s) • Client: {order.customerName || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>📊 Analyses détaillées</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Revenue Chart Placeholder */}
            <div style={{
              background: 'rgba(255,255,255,0.8)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid #e0e0e0'
            }}>
              <h4 style={{ marginBottom: '1rem', color: '#333' }}>💰 Revenus mensuels</h4>
              <div style={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(45deg, #e3f2fd, #f3e5f5)',
                borderRadius: '8px'
              }}>
                <span style={{ color: '#666' }}>Graphique des revenus</span>
              </div>
            </div>

            {/* Top Products */}
            <div style={{
              background: 'rgba(255,255,255,0.8)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid #e0e0e0'
            }}>
              <h4 style={{ marginBottom: '1rem', color: '#333' }}>🏆 Produits populaires</h4>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {analytics.topProducts.map((product, index) => (
                  <div key={product.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'rgba(97, 218, 251, 0.1)',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#61dafb',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        {product.price}€
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
