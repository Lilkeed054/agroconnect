// contexts/NotificationContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationToast = createContext();

export const useNotification = () => useContext(NotificationToast);

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
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaExclamationTriangle, 
  FaTimes 
} from 'react-icons/fa';

const ToastItem = ({ id, message, type, onClose }) => {
  const icons = {
    success: <FaCheckCircle size={20} />,
    error: <FaExclamationCircle size={20} />,
    info: <FaInfoCircle size={20} />,
    warning: <FaExclamationTriangle size={20} />
  };

  // Dark theme color mapping – all use dark backgrounds with subtle accent colors
  const colors = {
    success: { 
      bg: '#162016', 
      text: '#7C9A5E', 
      border: '#7C9A5E',
      icon: '#7C9A5E',
      close: '#B0C0A8'
    },
    error: { 
      bg: '#1A1212', 
      text: '#E87A7A', 
      border: '#E87A7A',
      icon: '#E87A7A',
      close: '#B0C0A8'
    },
    info: { 
      bg: '#121A1A', 
      text: '#7AA8C0', 
      border: '#7AA8C0',
      icon: '#7AA8C0',
      close: '#B0C0A8'
    },
    warning: { 
      bg: '#1A1A12', 
      text: '#D4A837', 
      border: '#D4A837',
      icon: '#D4A837',
      close: '#B0C0A8'
    }
  };

  const color = colors[type] || colors.info;

  return (
    <div 
      className="toast show rounded-3 shadow-lg mb-3"
      style={{ 
        backgroundColor: color.bg,
        border: `1px solid ${color.border}`,
        borderLeft: `4px solid ${color.border}`,
        minWidth: '280px',
        maxWidth: '380px',
        animation: 'slideInRight 0.35s ease-out',
        boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
      }}
      role="alert"
    >
      <div className="toast-body d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center gap-3">
          <div style={{ color: color.icon }}>
            {icons[type]}
          </div>
          <div style={{ color: color.text, fontWeight: 500, fontSize: '0.95rem' }}>
            {message}
          </div>
        </div>
        <button 
          type="button" 
          className="btn-close" 
          onClick={() => onClose(id)}
          aria-label="Close"
          style={{
            filter: 'brightness(0) invert(0.7)',
            opacity: 0.6,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
        />
      </div>
    </div>
  );
};

const NotificationToastContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <>
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
        .toast-container-custom {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 1090;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          pointer-events: none;
        }
        .toast-container-custom .toast {
          pointer-events: auto;
        }
        .btn-close {
          background: transparent;
          border: none;
          font-size: 1.2rem;
          line-height: 1;
          padding: 0.25rem;
          color: #B0C0A8;
          transition: all 0.2s;
        }
        .btn-close:hover {
          color: #D4A837;
          transform: rotate(90deg);
        }
      `}</style>
      <div className="toast-container-custom">
        {notifications.map(notification => (
          <ToastItem 
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={removeNotification}
          />
        ))}
      </div>
    </>
  );
};

export default NotificationToast;