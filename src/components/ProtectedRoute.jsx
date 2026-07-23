import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div 
        className="d-flex flex-column align-items-center justify-content-center" 
        style={{ 
          minHeight: '100vh', 
          background: '#0A120A',
          color: '#D4A837'
        }}
      >
        <div 
          className="spinner-border" 
          style={{ 
            color: '#D4A837',
            width: '3rem',
            height: '3rem',
            borderWidth: '0.25rem'
          }} 
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3" style={{ color: '#B0C0A8', fontSize: '0.9rem' }}>
          Verifying your session...
        </p>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  
  return children;
};

export default ProtectedRoute;