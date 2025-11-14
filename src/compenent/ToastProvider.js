import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Allow fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '10px',
      color: 'white',
      fontWeight: '600',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(100%)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
    };

    switch (type) {
      case 'success':
        return { ...baseStyle, background: 'linear-gradient(45deg, #4CAF50, #45a049)' };
      case 'error':
        return { ...baseStyle, background: 'linear-gradient(45deg, #f44336, #d32f2f)' };
      case 'warning':
        return { ...baseStyle, background: 'linear-gradient(45deg, #ff9800, #f57c00)' };
      case 'info':
      default:
        return { ...baseStyle, background: 'linear-gradient(45deg, #2196F3, #1976D2)' };
    }
  };

  return <div style={getToastStyle()}>{message}</div>;
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1000 }}>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            marginBottom: '10px',
            marginTop: index === 0 ? '20px' : '0'
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};
