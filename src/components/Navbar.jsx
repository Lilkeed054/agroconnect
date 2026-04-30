import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from '../contexts/LocationContext';
import LocationSector from './LocationSector';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // New logo – elegant leaf + typography using brand colors (yellow, green, lime)
  const Logo = () => (
    <div className="d-flex align-items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#F4E04D" />
        <path d="M20 6 L26 16 L22 16 L22 28 L18 28 L18 16 L14 16 Z" fill="#09F315" />
        <path d="M12 20 L28 20" stroke="#B2EC05" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="24" r="3" fill="#2C3A1F" />
      </svg>
      <span className="fw-bold fs-4" style={{ color: '#2C3A1F' }}>AgroConnect</span>
    </div>
  );

  return (
    <nav 
      className="navbar navbar-expand-lg sticky-top" 
      style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'all 0.2s'
      }}
    >
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/" style={{ textDecoration: 'none' }}>
          <Logo />
        </NavLink>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#mainNavbar"
          style={{ backgroundColor: '#F4E04D' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/" 
                style={({ isActive }) => ({
                  color: isActive ? '#09F315' : '#4B5563',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.2s'
                })}
                onMouseEnter={e => e.currentTarget.style.color = '#09F315'}
                onMouseLeave={e => e.currentTarget.style.color = e.currentTarget.classList.contains('active') ? '#09F315' : '#4B5563'}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/products"
                style={({ isActive }) => ({
                  color: isActive ? '#09F315' : '#4B5563',
                  fontWeight: isActive ? 600 : 500
                })}
                onMouseEnter={e => e.currentTarget.style.color = '#09F315'}
                onMouseLeave={e => e.currentTarget.style.color = e.currentTarget.classList.contains('active') ? '#09F315' : '#4B5563'}
              >
                Discover
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/about"
                style={({ isActive }) => ({
                  color: isActive ? '#09F315' : '#4B5563',
                  fontWeight: isActive ? 600 : 500
                })}
                onMouseEnter={e => e.currentTarget.style.color = '#09F315'}
                onMouseLeave={e => e.currentTarget.style.color = e.currentTarget.classList.contains('active') ? '#09F315' : '#4B5563'}
              >
                About
              </NavLink>
            </li>
            {user?.role === 'vendor' && (
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/vendor/dashboard"
                  style={({ isActive }) => ({
                    color: isActive ? '#09F315' : '#4B5563',
                    fontWeight: isActive ? 600 : 500
                  })}
                >
                  Vendor Hub
                </NavLink>
              </li>
            )}
            {user?.role === 'admin' && (
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/admin/dashboard"
                  style={({ isActive }) => ({
                    color: isActive ? '#09F315' : '#4B5563',
                    fontWeight: isActive ? 600 : 500
                  })}
                >
                  Admin
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <LocationSector />
            
            <NavLink 
              to="/cart" 
              className="btn position-relative rounded-pill"
              style={{ 
                backgroundColor: 'transparent',
                color: '#2C3A1F',
                border: '1px solid #E5E7EB',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#F4E04D';
                e.currentTarget.style.borderColor = '#F4E04D';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{ backgroundColor: '#09F315', color: '#1F2937', fontSize: '0.7rem' }}
                >
                  {cartCount}
                </span>
              )}
            </NavLink>

            {user ? (
              <div className="dropdown">
                <button 
                  className="btn dropdown-toggle d-flex align-items-center gap-2 rounded-pill"
                  style={{ 
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    color: '#2C3A1F',
                    transition: 'all 0.2s'
                  }}
                  data-bs-toggle="dropdown"
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F4E04D'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                >
                  <FaUser /> {user.name.split(' ')[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
                  <li>
                    <NavLink className="dropdown-item" to={user.role === 'customer' ? '/customer/dashboard' : '/vendor/dashboard'}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li><NavLink className="dropdown-item" to="/chat">Messages</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <NavLink 
                  to="/login" 
                  className="btn rounded-pill"
                  style={{ 
                    backgroundColor: 'transparent',
                    border: '1px solid #B2EC05',
                    color: '#2C3A1F',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#B2EC05';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="btn rounded-pill"
                  style={{ 
                    backgroundColor: '#09F315',
                    border: 'none',
                    color: '#1F2937',
                    fontWeight: 500,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#F4E04D';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = '#09F315';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;