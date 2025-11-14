import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);
    setUnreadCount(savedNotifications.filter(n => !n.read).length);

    // Generate some sample notifications if none exist
    if (savedNotifications.length === 0) {
      const sampleNotifications = [
        {
          id: 1,
          type: 'order',
          title: 'Commande confirmée',
          message: 'Votre commande #12345 a été confirmée et est en cours de préparation.',
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          read: false,
          actionUrl: '/orders/12345'
        },
        {
          id: 2,
          type: 'promotion',
          title: 'Offre spéciale !',
          message: 'Profitez de -20% sur tous les smartphones cette semaine !',
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          read: false,
          actionUrl: '/products?category=smartphones'
        },
        {
          id: 3,
          type: 'shipping',
          title: 'Commande expédiée',
          message: 'Votre commande #12344 a été expédiée. Suivez-la en temps réel.',
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          read: true,
          actionUrl: '/orders/12344'
        },
        {
          id: 4,
          type: 'review',
          title: 'Avis reçu',
          message: 'Merci pour votre avis sur le Smartphone Galaxy S23 !',
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          read: true,
          actionUrl: '/profile/reviews'
        }
      ];
      setNotifications(sampleNotifications);
      setUnreadCount(sampleNotifications.filter(n => !n.read).length);
      localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
    }
  }, []);

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const deleteNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order: '📦',
      promotion: '🎉',
      shipping: '🚚',
      review: '⭐',
      system: '🔔',
      payment: '💳'
    };
    return icons[type] || '🔔';
  };

  const getNotificationColor = (type) => {
    const colors = {
      order: '#2196f3',
      promotion: '#ff9800',
      shipping: '#4caf50',
      review: '#9c27b0',
      system: '#607d8b',
      payment: '#f44336'
    };
    return colors[type] || '#607d8b';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now - notificationTime) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '50%',
          transition: 'background 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(97, 218, 251, 0.1)'}
        onMouseLeave={(e) => e.target.style.background = 'none'}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: '#f44336',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '0.7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          width: '400px',
          maxHeight: '500px',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,240,240,0.95))',
          borderRadius: '15px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h4 style={{ margin: '0', color: '#333' }}>
              Notifications ({notifications.length})
            </h4>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
                  color: 'white',
                  border: 'none',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}
              >
                Tout marquer comme lu
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {notifications.length > 0 ? notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid #f0f0f0',
                  background: notification.read ? 'transparent' : 'rgba(97, 218, 251, 0.05)',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  position: 'relative'
                }}
                onClick={() => markAsRead(notification.id)}
                onMouseEnter={(e) => e.target.style.background = 'rgba(97, 218, 251, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = notification.read ? 'transparent' : 'rgba(97, 218, 251, 0.05)'}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    fontSize: '1.5rem',
                    color: getNotificationColor(notification.type),
                    flexShrink: 0
                  }}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '0.25rem',
                      fontSize: '0.95rem'
                    }}>
                      {notification.title}
                    </div>
                    <div style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      marginBottom: '0.5rem'
                    }}>
                      {notification.message}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#999'
                    }}>
                      {formatTimestamp(notification.timestamp)}
                    </div>
                  </div>

                  {!notification.read && (
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#61dafb',
                      flexShrink: 0,
                      alignSelf: 'flex-start',
                      marginTop: '0.5rem'
                    }} />
                  )}
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: '#999',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: '0.25rem',
                    borderRadius: '50%',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0'}
                >
                  ×
                </button>
              </div>
            )) : (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                color: '#666'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔔</div>
                <p>Aucune notification pour le moment</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid #e0e0e0',
              textAlign: 'center'
            }}>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#61dafb',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'underline'
              }}>
                Voir toutes les notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {showNotifications && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default Notifications;
