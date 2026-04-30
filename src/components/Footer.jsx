import { FaFacebook, FaTwitter, FaInstagram, FaHeart, FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-3 mt-2" style={{ background: 'linear-gradient(135deg, #B2EC05, #09F315, #F4E04D)' }}>
      <div className="container">
        <div className="row gy-3">
          {/* Brand & Social */}
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaLeaf size={24} style={{ color: '#F4E04D' }} />
              <h6 className="fw-bold mb-0" style={{ background: 'linear-gradient(135deg, #F4E04D, #FBBF24)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>AgroConnect</h6>
            </div>
            <p className="small mb-2" style={{ fontSize: '0.8rem' }}>From our hands to your home – empowering local farmers and artisans globally.</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50" style={{ transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}><FaFacebook size={20} /></a>
              <a href="#" className="text-white-50" style={{ transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}><FaTwitter size={20} /></a>
              <a href="#" className="text-white-50" style={{ transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}><FaInstagram size={20} /></a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="col-md-2">
            <h6 className="fw-bold mb-2" style={{ color: '#F4E04D', fontSize: '0.9rem' }}>Explore</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1"><a href="/products" className="text-white-50 text-decoration-none" style={{ transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#F4E04D'; e.currentTarget.style.paddingLeft = '4px'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.paddingLeft = '0'; }}>Shop Local</a></li>
              <li className="mb-1"><a href="/about" className="text-white-50 text-decoration-none" style={{ transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#F4E04D'; e.currentTarget.style.paddingLeft = '4px'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.paddingLeft = '0'; }}>Our Story</a></li>
              <li><a href="/become-vendor" className="text-white-50 text-decoration-none" style={{ transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#F4E04D'; e.currentTarget.style.paddingLeft = '4px'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.paddingLeft = '0'; }}>Sell with Us</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-2" style={{ color: '#F4E04D', fontSize: '0.9rem' }}>Support</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1"><a href="/faq" className="text-white-50 text-decoration-none" style={{ transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#F4E04D'; e.currentTarget.style.paddingLeft = '4px'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.paddingLeft = '0'; }}>FAQ</a></li>
              <li className="mb-1"><a href="/contact" className="text-white-50 text-decoration-none" style={{ transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#F4E04D'; e.currentTarget.style.paddingLeft = '4px'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.paddingLeft = '0'; }}>Contact</a></li>
              <li><a href="/terms" className="text-white-50 text-decoration-none" style={{ transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.color = '#F4E04D'; e.currentTarget.style.paddingLeft = '4px'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.paddingLeft = '0'; }}>Terms</a></li>
            </ul>
          </div>

          {/* App Section */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-2" style={{ color: '#F4E04D', fontSize: '0.9rem' }}>Get the App</h6>
            <p className="small mb-2" style={{ fontSize: '0.75rem' }}>Coming soon on iOS & Android</p>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-light rounded-pill btn-sm px-3 py-1" style={{ fontSize: '0.7rem', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#3B82F6'; e.currentTarget.style.borderColor = '#3B82F6'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'white'; }}>App Store</button>
              <button className="btn btn-outline-light rounded-pill btn-sm px-3 py-1" style={{ fontSize: '0.7rem', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#3B82F6'; e.currentTarget.style.borderColor = '#3B82F6'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'white'; }}>Google Play</button>
            </div>
          </div>
        </div>

        <hr className="my-2" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        <div className="d-flex flex-wrap justify-content-between align-items-center small" style={{ fontSize: '0.7rem' }}>
          <span>© 2026 AgroConnect. All rights reserved.</span>
          <span className="mt-1 mt-sm-0">Made with <FaHeart style={{ color: '#F4E04D' }} className="mx-1" /> for local economies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;