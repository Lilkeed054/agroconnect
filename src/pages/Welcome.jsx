import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaGlobe, FaChartLine, FaTractor, FaPaintBrush, 
  FaHeart, FaRocket, FaStar, FaSeedling, FaHandsHelping 
} from 'react-icons/fa';

const Welcome = () => {
  const { city } = useLocation();
  const { user } = useAuth();

  // Fast‑loading, CDN‑hosted background images
  const backgrounds = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ];

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <>
      {/* Professional animations & dark theme enhancements */}
      <style>{`
        /* ── Prevent horizontal scrolling ── */
        html, body {
          overflow-x: hidden;
          width: 100%;
          max-width: 100%;
        }
        #root {
          overflow-x: hidden;
        }
        .container, .container-fluid {
          padding-left: 15px;
          padding-right: 15px;
        }
        img, svg {
          max-width: 100%;
          height: auto;
        }

        /* ── Animations (unchanged) ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes floatSoft {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 15px rgba(212, 168, 55, 0.2); }
          50% { box-shadow: 0 0 30px rgba(212, 168, 55, 0.5); }
          100% { box-shadow: 0 0 15px rgba(212, 168, 55, 0.2); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-float { animation: floatSoft 4s ease-in-out infinite; }
        .animate-slide-left { animation: slideLeft 0.8s ease-out forwards; }
        .animate-slide-right { animation: slideRight 0.8s ease-out forwards; }
        .delay-1 { animation-delay: 0.15s; opacity: 0; }
        .delay-2 { animation-delay: 0.3s; opacity: 0; }
        .delay-3 { animation-delay: 0.45s; opacity: 0; }
        
        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px -12px rgba(0,0,0,0.6) !important;
          border-color: rgba(212, 168, 55, 0.3) !important;
        }
        .btn-hover {
          transition: all 0.25s ease;
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 8px 25px rgba(212, 168, 55, 0.25);
        }
        .bg-fade {
          transition: opacity 1.2s ease-in-out;
        }
        .glass-card {
          background: rgba(22, 32, 22, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 168, 55, 0.12);
        }

        /* ── Mobile responsiveness ── */
        @media (max-width: 576px) {
          .display-1 {
            font-size: 2.5rem !important;
          }
          .lead.fs-2 {
            font-size: 1.2rem !important;
          }
          .fs-5 {
            font-size: 1rem !important;
          }
          .btn-lg {
            font-size: 0.9rem !important;
            padding: 0.6rem 1.2rem !important;
          }
          .btn-lg.me-3 {
            margin-right: 0.5rem !important;
          }
          .row.g-4 {
            --bs-gutter-y: 1rem;
          }
          .card-hover {
            transform: none !important;
          }
          .card-hover:hover {
            transform: none !important;
          }
        }
        @media (max-width: 768px) {
          .display-1 {
            font-size: 3.5rem !important;
          }
          .lead.fs-2 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="position-relative overflow-hidden" style={{ minHeight: '90vh' }}>
        {/* Rotating background images */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 bg-fade"
          style={{
            backgroundImage: `url(${backgrounds[currentBg]})`,
            backgroundColor: '#0A120A',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            transition: 'opacity 1.2s ease-in-out',
            zIndex: 0
          }}
        />
        {/* Dark overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ 
            background: 'linear-gradient(145deg, rgba(10,18,10,0.85) 0%, rgba(22,32,22,0.7) 100%)', 
            zIndex: 1 
          }} 
        />
        
        <div className="container position-relative d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '90vh', zIndex: 2 }}>
          <div className="animate-float mb-3">
            <FaSeedling size={80} style={{ color: '#D4A837', filter: 'drop-shadow(0 4px 12px rgba(212,168,55,0.3))' }} />
          </div>
          <h1 className="display-1 fw-bold animate-fade-up" style={{ color: '#D4A837', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            🌾 AgroConnect
          </h1>
          <p className="lead fs-2 animate-fade-up delay-1" style={{ color: '#D0D8C8' }}>
            Fresh from <span style={{ color: '#D4A837' }}>local farms</span> to your table
          </p>
          <p className="mb-4 fs-5 animate-fade-up delay-2" style={{ color: '#B0C0A8' }}>
            Connecting you with farmers and artisans in your neighborhood
          </p>
          <div className="animate-scale-in delay-3 d-flex flex-wrap justify-content-center gap-2">
            {!user ? (
              <>
                <Link 
                  to="/register?role=vendor" 
                  className="btn btn-lg rounded-pill btn-hover" 
                  style={{ 
                    backgroundColor: '#D4A837', 
                    color: '#0A120A', 
                    padding: '12px 32px', 
                    border: 'none', 
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(212,168,55,0.3)'
                  }}
                >
                  Start Selling <FaRocket className="ms-2" />
                </Link>
                <Link 
                  to="/products" 
                  className="btn btn-lg rounded-pill btn-hover" 
                  style={{ 
                    padding: '12px 32px', 
                    border: '2px solid #D4A837', 
                    color: '#D0D8C8',
                    fontWeight: 500,
                    backgroundColor: 'transparent'
                  }}
                >
                  Explore Market
                </Link>
              </>
            ) : (
              <Link 
                to="/products" 
                className="btn btn-lg rounded-pill btn-hover" 
                style={{ 
                  backgroundColor: '#D4A837', 
                  color: '#0A120A', 
                  padding: '12px 40px', 
                  fontWeight: 600,
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(212,168,55,0.3)'
                }}
              >
                Browse {city} vendors
              </Link>
            )}
          </div>
        </div>
        
        {/* Background image dots */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-3 mb-4" style={{ zIndex: 3 }}>
          {backgrounds.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBg(idx)}
              className="border-0 rounded-circle p-0"
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: currentBg === idx ? '#D4A837' : 'rgba(176,192,168,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: currentBg === idx ? '0 0 12px rgba(212,168,55,0.5)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar - dark cards */}
      <div className="container py-5">
        <div className="row text-center g-4">
          {[
            { value: '500+', label: 'Local Vendors', icon: <FaTractor size={36} />, color: '#D4A837' },
            { value: '10,000+', label: 'Happy Customers', icon: <FaHeart size={36} />, color: '#7C9A5E' },
            { value: '15+', label: 'Regional Markets', icon: <FaGlobe size={36} />, color: '#D4A837' },
            { value: '98%', label: 'Fresh Delivery Rate', icon: <FaStar size={36} />, color: '#7C9A5E' }
          ].map((stat, idx) => (
            <div className="col-6 col-md-3" key={idx}>
              <div className="card border-0 shadow-lg rounded-4 p-3 card-hover h-100" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.1)' }}>
                <div className="card-body">
                  <div style={{ color: stat.color }} className="mb-3">{stat.icon}</div>
                  <h3 className="fw-bold" style={{ color: '#D4A837' }}>{stat.value}</h3>
                  <p className="mb-0" style={{ color: '#B0C0A8' }}>{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Problem / Solution Section */}
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6 animate-slide-left">
            <img 
              src="https://images.pexels.com/photos/33319743/pexels-photo-33319743.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
              className="img-fluid rounded-4 shadow-lg" 
              alt="Farmers market stall" 
              style={{ border: '3px solid #D4A837', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
            />
          </div>
          <div className="col-md-6 animate-slide-right">
            <h2 className="fw-bold" style={{ color: '#D4A837' }}>
              Cut out the middlemen
            </h2>
            <p className="lead" style={{ color: '#D0D8C8' }}>
              Traditional supply chains eat up to 70% of a farmer's income. AgroConnect gives them a direct digital storefront.
            </p>
            <div className="d-flex flex-wrap gap-4 mt-4">
              <div className="text-center p-3 rounded-4 shadow-lg flex-fill card-hover" style={{ background: '#162016', border: '1px solid rgba(124,154,94,0.2)' }}>
                <FaHandsHelping size={40} color="#D4A837" className="mb-2" />
                <h5 style={{ color: '#D0D8C8' }}>For Farmers</h5>
                <p className="small" style={{ color: '#B0C0A8' }}>Own your store, set your price, keep more profit.</p>
              </div>
              <div className="text-center p-3 rounded-4 shadow-lg flex-fill card-hover" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.2)' }}>
                <FaHeart size={40} color="#D4A837" className="mb-2" />
                <h5 style={{ color: '#D0D8C8' }}>For Shoppers</h5>
                <p className="small" style={{ color: '#B0C0A8' }}>Fresh, traceable, local goods delivered fast.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid - dark cards */}
      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold" style={{ color: '#D4A837' }}>Why choose AgroConnect?</h2>
        <div className="row g-4">
          {[
            { icon: <FaGlobe />, title: "Hyperlocal Discovery", desc: "Find products within 10km of your home.", color: "#D4A837" },
            { icon: <FaChartLine />, title: "Zero Commission Starter", desc: "Keep 100% of your first 500 in sales.", color: "#7C9A5E" },
            { icon: <FaTractor />, title: "Farmer Verification", desc: "Trust badges and quality certifications.", color: "#D4A837" },
            { icon: <FaPaintBrush />, title: "Artisan Collective", desc: "Handmade goods from local creators.", color: "#7C9A5E" }
          ].map((feat, idx) => (
            <div className="col-6 col-md-3" key={idx}>
              <div className="card h-100 border-0 shadow-lg text-center p-3 rounded-4 card-hover" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
                <div className="card-body">
                  <div className="display-4 mb-3" style={{ color: feat.color }}>{feat.icon}</div>
                  <h5 style={{ color: '#D0D8C8' }}>{feat.title}</h5>
                  <p className="mb-0" style={{ color: '#B0C0A8' }}>{feat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Plans - dark theme */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#0A120A' }}>
        <div className="container">
          <h2 className="text-center mb-3 fw-bold" style={{ color: '#D4A837' }}>Vendor subscription plans</h2>
          <p className="text-center mb-5" style={{ color: '#B0C0A8' }}>Choose the plan that fits your farm or artisan business</p>
          
          <div className="row g-4">
            {/* Starter Plan */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden card-hover" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.1)' }}>
                <div className="card-body p-4 text-center">
                  <h3 className="fw-semibold mb-2" style={{ color: '#D0D8C8' }}>Starter</h3>
                  <div className="display-4 fw-bold mb-3" style={{ color: '#D4A837' }}>Free</div>
                  <ul className="list-unstyled text-start mt-4 mb-4" style={{ color: '#B0C0A8' }}>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Up to 20 product listings</li>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Basic store profile</li>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Standard visibility</li>
                    <li className="text-muted"><span className="text-muted me-2">✗</span> No analytics</li>
                  </ul>
                  <Link to="/register?plan=starter" className="btn w-100 rounded-pill py-2 btn-hover" style={{ backgroundColor: '#D4A837', color: '#0A120A', border: 'none', fontWeight: 500 }}>
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            {/* Growth Plan - Featured */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden card-hover position-relative" style={{ background: '#162016', border: '2px solid #D4A837' }}>
                <div className="position-absolute top-0 start-50 translate-middle-x px-3 py-1 rounded-bottom" style={{ fontSize: '0.8rem', zIndex: 1, backgroundColor: '#D4A837', color: '#0A120A', fontWeight: 600 }}>
                  Most Popular
                </div>
                <div className="card-body p-4 text-center mt-3">
                  <h3 className="fw-semibold mb-2" style={{ color: '#D0D8C8' }}>Growth</h3>
                  <div className="display-4 fw-bold mb-3" style={{ color: '#D4A837' }}>$19<span style={{ fontSize: '1rem' }}>/mo</span></div>
                  <ul className="list-unstyled text-start mt-4 mb-4" style={{ color: '#B0C0A8' }}>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Unlimited listings</li>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Basic sales analytics</li>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Priority visibility</li>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Email support</li>
                  </ul>
                  <Link to="/register?plan=growth" className="btn w-100 rounded-pill py-2 btn-hover" style={{ backgroundColor: '#D4A837', color: '#0A120A', border: 'none', fontWeight: 500 }}>
                    Choose Growth
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden card-hover" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.1)' }}>
                <div className="card-body p-4 text-center">
                  <h3 className="fw-semibold mb-2" style={{ color: '#D0D8C8' }}>Pro</h3>
                  <div className="display-4 fw-bold mb-3" style={{ color: '#D4A837' }}>$49<span style={{ fontSize: '1rem' }}>/mo</span></div>
                  <ul className="list-unstyled text-start mt-4 mb-4" style={{ color: '#B0C0A8' }}>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Everything in Growth</li>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Featured placement</li>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Verified vendor badge</li>
                    <li className="mb-2"><span style={{ color: '#D4A837' }} className="me-2">✓</span> Marketing tools + priority support</li>
                  </ul>
                  <Link to="/register?plan=pro" className="btn w-100 rounded-pill py-2 btn-hover" style={{ backgroundColor: '#D4A837', color: '#0A120A', border: 'none', fontWeight: 500 }}>
                    Go Pro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - dark cards */}
      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold" style={{ color: '#D4A837' }}>Trusted by farmers & food lovers</h2>
        <div className="row g-4">
          {[
            { text: "AgroConnect doubled my direct sales in 3 months. I finally feel in control of my income.", name: "Grace M., Farmer, Zimbabwe", img: "https://randomuser.me/api/portraits/women/68.jpg", bg: "#162016" },
            { text: "I found organic honey from a beekeeper just 5km away. Unbelievable quality!", name: "John D., Customer, South Africa", img: "https://randomuser.me/api/portraits/men/32.jpg", bg: "#162016" },
            { text: "The platform is intuitive and the support team is super responsive.", name: "Amina K., Artisan, Kenya", img: "https://randomuser.me/api/portraits/women/90.jpg", bg: "#162016" }
          ].map((t, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card border-0 shadow-lg p-4 rounded-4 h-100 card-hover" style={{ background: t.bg, border: '1px solid rgba(212,168,55,0.08)' }}>
                <p className="fs-5 fst-italic" style={{ color: '#D0D8C8' }}>"{t.text}"</p>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <img src={t.img} className="rounded-circle border border-2" style={{ borderColor: '#D4A837' }} width="50" height="50" alt="avatar" />
                  <strong style={{ color: '#D4A837' }}>{t.name}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action - dark gradient */}
      <div className="container text-center py-5">
        <div className="p-5 rounded-5 shadow-lg" style={{ background: 'linear-gradient(135deg, #162016 0%, #0A120A 100%)', border: '1px solid rgba(212,168,55,0.2)' }}>
          <h3 className="display-6 fw-bold" style={{ color: '#D4A837' }}>Ready to grow with AgroConnect?</h3>
          <FaSeedling size={56} className="my-3 animate-float" style={{ color: '#D4A837' }} />
          <div>
            <Link to="/register" className="btn rounded-pill btn-lg px-5 mt-3 btn-hover" style={{ backgroundColor: '#D4A837', color: '#0A120A', border: 'none', fontWeight: 600 }}>
              Join the movement →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;