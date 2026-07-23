import { FaFacebook, FaTwitter, FaInstagram, FaHeart, FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer 
      className="py-4 mt-3" 
      style={{ 
        background: 'linear-gradient(145deg, #0A120A, #162016, #0A120A)',
        borderTop: '1px solid rgba(212, 168, 55, 0.15)'
      }}
    >
      <div className="container">
        <div className="row gy-4">
          {/* Brand & Social */}
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaLeaf size={24} style={{ color: '#D4A837' }} />
              <h6 
                className="fw-bold mb-0" 
                style={{ 
                  background: 'linear-gradient(135deg, #D4A837, #A67B2E)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: '0.5px'
                }}
              >
                AgroConnect
              </h6>
            </div>
            <p className="small mb-2" style={{ fontSize: '0.8rem', color: '#B0C0A8' }}>
              From our hands to your home – empowering local farmers and artisans globally.
            </p>
            <div className="d-flex gap-3">
              <a 
                href="#" 
                style={{ color: '#B0C0A8', transition: 'all 0.25s' }} 
                onMouseEnter={e => { e.currentTarget.style.color = '#D4A837'; e.currentTarget.style.transform = 'translateY(-3px)'; }} 
                onMouseLeave={e => { e.currentTarget.style.color = '#B0C0A8'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="#" 
                style={{ color: '#B0C0A8', transition: 'all 0.25s' }} 
                onMouseEnter={e => { e.currentTarget.style.color = '#D4A837'; e.currentTarget.style.transform = 'translateY(-3px)'; }} 
                onMouseLeave={e => { e.currentTarget.style.color = '#B0C0A8'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="#" 
                style={{ color: '#B0C0A8', transition: 'all 0.25s' }} 
                onMouseEnter={e => { e.currentTarget.style.color = '#D4A837'; e.currentTarget.style.transform = 'translateY(-3px)'; }} 
                onMouseLeave={e => { e.currentTarget.style.color = '#B0C0A8'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="col-md-2">
            <h6 className="fw-bold mb-2" style={{ color: '#D4A837', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
              Explore
            </h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1">
                <a 
                  href="/products" 
                  className="text-decoration-none" 
                  style={{ color: '#B0C0A8', transition: 'all 0.2s', fontSize: '0.85rem' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#7C9A5E'; e.currentTarget.style.paddingLeft = '6px'; }} 
                  onMouseLeave={e => { e.currentTarget.style.color = '#B0C0A8'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  Shop Local
                </a>
              </li>
              <li className="mb-1">
                <a 
                  href="/about" 
                  className="text-decoration-none" 
                  style={{ color: '#B0C0A8', transition: 'all 0.2s', fontSize: '0.85rem' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#7C9A5E'; e.currentTarget.style.paddingLeft = '6px'; }} 
                  onMouseLeave={e => { e.currentTarget.style.color = '#B0C0A8'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  Our Story
                </a>
              </li>
              <li>
                <a 
                  href="/become-vendor" 
                  className="text-decoration-none" 
                  style={{ color: '#B0C0A8', transition: 'all 0.2s', fontSize: '0.85rem' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#7C9A5E'; e.currentTarget.style.paddingLeft = '6px'; }} 
                  onMouseLeave={e => { e.currentTarget.style.color = '#B0C0A8'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  Sell with Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-2" style={{ color: '#D4A837', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
              Support
            </h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1">
                <a 
                  href="/faq" 
                  className="text-decoration-none" 
                  style={{ color: '#B0C0A8', transition: 'all 0.2s', fontSize: '0.85rem' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#7C9A5E'; e.currentTarget.style.paddingLeft = '6px'; }} 
                  onMouseLeave={e => { e.currentTarget.style.color = '#B0C0A8'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  FAQ
                </a>
              </li>
              <li className="mb-1">
                <a 
                  href="/contact" 
                  className="text-decoration-none" 
                  style={{ color: '#B0C0A8', transition: 'all 0.2s', fontSize: '0.85rem' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#7C9A5E'; e.currentTarget.style.paddingLeft = '6px'; }} 
                  onMouseLeave={e => { e.currentTarget.style.color = '#B0C0A8'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-decoration-none" 
                  style={{ color: '#B0C0A8', transition: 'all 0.2s', fontSize: '0.85rem' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#7C9A5E'; e.currentTarget.style.paddingLeft = '6px'; }} 
                  onMouseLeave={e => { e.currentTarget.style.color = '#B0C0A8'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* App Section */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-2" style={{ color: '#D4A837', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
              Get the App
            </h6>
            <p className="small mb-2" style={{ fontSize: '0.75rem', color: '#889A80' }}>
              Coming soon on iOS & Android
            </p>
            <div className="d-flex gap-2">
              <button 
                className="btn rounded-pill btn-sm px-3 py-1" 
                style={{ 
                  fontSize: '0.7rem', 
                  color: '#D4A837', 
                  border: '1px solid #3A4A3A', 
                  backgroundColor: 'transparent',
                  transition: 'all 0.25s' 
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.backgroundColor = '#D4A837'; 
                  e.currentTarget.style.color = '#0A120A'; 
                  e.currentTarget.style.borderColor = '#D4A837'; 
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 168, 55, 0.15)';
                }} 
                onMouseLeave={e => { 
                  e.currentTarget.style.backgroundColor = 'transparent'; 
                  e.currentTarget.style.color = '#D4A837'; 
                  e.currentTarget.style.borderColor = '#3A4A3A';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                App Store
              </button>
              <button 
                className="btn rounded-pill btn-sm px-3 py-1" 
                style={{ 
                  fontSize: '0.7rem', 
                  color: '#D4A837', 
                  border: '1px solid #3A4A3A', 
                  backgroundColor: 'transparent',
                  transition: 'all 0.25s' 
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.backgroundColor = '#D4A837'; 
                  e.currentTarget.style.color = '#0A120A'; 
                  e.currentTarget.style.borderColor = '#D4A837';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 168, 55, 0.15)';
                }} 
                onMouseLeave={e => { 
                  e.currentTarget.style.backgroundColor = 'transparent'; 
                  e.currentTarget.style.color = '#D4A837'; 
                  e.currentTarget.style.borderColor = '#3A4A3A';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Google Play
              </button>
            </div>
          </div>
        </div>

        <hr className="my-3" style={{ borderColor: 'rgba(212, 168, 55, 0.12)' }} />

        <div className="d-flex flex-wrap justify-content-between align-items-center small" style={{ fontSize: '0.7rem', color: '#6A7A62' }}>
          <span>© 2026 AgroConnect. All rights reserved.</span>
          <span className="mt-1 mt-sm-0" style={{ color: '#6A7A62' }}>
            Made with <FaHeart style={{ color: '#D4A837' }} className="mx-1" /> for local economies
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;