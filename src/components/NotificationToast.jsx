// contexts/NotificationContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification, notifications }}>
      {children}
      <NotificationToastContainer />
    </NotificationContext.Provider>
  );
};

// components/NotificationToast.jsx
import { useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ToastItem = ({ id, message, type, onClose }) => {
  const icons = {
    success: <FaCheckCircle size={20} />,
    error: <FaExclamationCircle size={20} />,
    info: <FaInfoCircle size={20} />,
    warning: <FaExclamationTriangle size={20} />
  };

  const colors = {
    success: { bg: '#09F315', text: '#2C3A1F', border: '#B2EC05' },
    error: { bg: '#FEF2F2', text: '#DC2626', border: '#FEE2E2' },
    info: { bg: '#EFF6FF', text: '#3B82F6', border: '#DBEAFE' },
    warning: { bg: '#FEF9E6', text: '#F59E0B', border: '#FDE68A' }
  };

  const color = colors[type] || colors.info;

  return (
    <div 
      className="toast show rounded-3 shadow-lg mb-3"
      style={{ 
        backgroundColor: color.bg,
        borderLeft: `4px solid ${color.border}`,
        minWidth: '280px',
        animation: 'slideInRight 0.3s ease-out'
      }}
      role="alert"
    >
      <div className="toast-body d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center gap-3">
          <div style={{ color: type === 'success' ? '#2C3A1F' : color.text }}>
            {icons[type]}
          </div>
          <div style={{ color: color.text, fontWeight: 500 }}>{message}</div>
        </div>
        <button 
          type="button" 
          className="btn-close btn-close-sm" 
          onClick={() => onClose(id)}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

const NotificationToastContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div 
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1090, maxWidth: '380px' }}
    >
      {notifications.map(notification => (
        <ToastItem 
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={removeNotification}
        />
      ))}
      
      {/* Keyframes for slide-in animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationToastContainer;