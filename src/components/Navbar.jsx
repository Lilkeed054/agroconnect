import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from '../contexts/LocationContext';
import LocationSector from './LocationSector'; // Assuming this is the updated dark version
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

  // Updated logo – dark theme with gold and moss
  const Logo = () => (
    <div className="d-flex align-items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#D4A837" />
        <path d="M20 6 L26 16 L22 16 L22 28 L18 28 L18 16 L14 16 Z" fill="#7C9A5E" />
        <path d="M12 20 L28 20" stroke="#0A120A" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="24" r="3" fill="#0A120A" />
      </svg>
      <span className="fw-bold fs-4" style={{ color: '#D4A837' }}>AgroConnect</span>
    </div>
  );

  return (
    <>
      <style>{`
        .navbar-dark-custom {
          background: #162016;
          border-bottom: 1px solid rgba(212, 168, 55, 0.15);
          box-shadow: 0 4px 20px rgba(0,0,0,0.6);
          transition: all 0.2s;
        }
        .navbar-dark-custom .nav-link {
          color: #B0C0A8 !important;
          font-weight: 500;
          transition: all 0.2s;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
        }
        .navbar-dark-custom .nav-link:hover,
        .navbar-dark-custom .nav-link.active {
          color: #D4A837 !important;
          background: rgba(212, 168, 55, 0.08);
        }
        .navbar-dark-custom .navbar-toggler {
          border: 1px solid rgba(212, 168, 55, 0.3);
          background: transparent;
        }
        .navbar-dark-custom .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E%3Cpath stroke='%23D4A837' stroke-width='2' d='M5 7h20M5 15h20M5 23h20'/%3E%3C/svg%3E");
        }
        .btn-outline-gold-nav {
          background: transparent;
          border: 1px solid #D4A837;
          color: #D4A837;
          transition: all 0.25s ease;
          border-radius: 2rem;
          padding: 0.4rem 1.2rem;
        }
        .btn-outline-gold-nav:hover {
          background: #D4A837;
          color: #0A120A;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 168, 55, 0.3);
        }
        .btn-gold-nav {
          background: #D4A837;
          color: #0A120A;
          border: none;
          font-weight: 600;
          transition: all 0.25s ease;
          border-radius: 2rem;
          padding: 0.4rem 1.2rem;
        }
        .btn-gold-nav:hover {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
        .cart-btn {
          background: transparent;
          border: 1px solid rgba(212, 168, 55, 0.3);
          color: #D0D8C8;
          border-radius: 2rem;
          padding: 0.4rem 0.8rem;
          transition: all 0.25s ease;
          position: relative;
        }
        .cart-btn:hover {
          background: rgba(212, 168, 55, 0.1);
          border-color: #D4A837;
          transform: translateY(-2px);
        }
        .cart-badge {
          background: #D4A837;
          color: #0A120A;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 2rem;
          position: absolute;
          top: -6px;
          right: -6px;
        }
        .dropdown-dark .dropdown-menu {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.7);
          border-radius: 1rem;
          padding: 0.5rem 0;
        }
        .dropdown-dark .dropdown-item {
          color: #B0C0A8;
          padding: 0.5rem 1.5rem;
          transition: all 0.2s;
        }
        .dropdown-dark .dropdown-item:hover {
          background: rgba(212, 168, 55, 0.08);
          color: #D4A837;
        }
        .dropdown-dark .dropdown-divider {
          border-color: rgba(212, 168, 55, 0.1);
        }
        .dropdown-dark .dropdown-item.text-danger {
          color: #E87A7A !important;
        }
        .dropdown-dark .dropdown-item.text-danger:hover {
          background: rgba(232, 122, 122, 0.1);
          color: #FF6B6B !important;
        }
        .user-btn {
          background: transparent;
          border: 1px solid rgba(212, 168, 55, 0.2);
          color: #D0D8C8;
          border-radius: 2rem;
          padding: 0.4rem 1rem;
          transition: all 0.25s ease;
        }
        .user-btn:hover {
          background: rgba(212, 168, 55, 0.08);
          border-color: #D4A837;
          color: #D4A837;
        }
        .user-btn::after {
          margin-left: 0.4rem;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg sticky-top navbar-dark-custom">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </NavLink>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/products"
                  activeClassName="active"
                >
                  Discover
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  to="/about"
                  activeClassName="active"
                >
                  About
                </NavLink>
              </li>
              {user?.role === 'vendor' && (
                <li className="nav-item">
                  <NavLink 
                    className="nav-link" 
                    to="/vendor/dashboard"
                    activeClassName="active"
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
                    activeClassName="active"
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
                className="cart-btn"
              >
                <FaShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </NavLink>

              {user ? (
                <div className="dropdown dropdown-dark">
                  <button 
                    className="btn dropdown-toggle user-btn"
                    data-bs-toggle="dropdown"
                  >
                    <FaUser className="me-1" /> {user.name.split(' ')[0]}
                  </button>
                  <ul className="dropdown-menu">
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
                    className="btn btn-outline-gold-nav"
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    className="btn btn-gold-nav"
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;