import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { useAuth } from '../contexts/AuthContext';
import { FaGlobe, FaChartLine, FaTractor, FaPaintBrush, FaHeart, FaRocket, FaStar, FaSeedling, FaHandsHelping } from 'react-icons/fa';

const Welcome = () => {
  const { city } = useLocation();
  const { user } = useAuth();

  // Three professional farmers market background images
  const backgrounds = [
    '/images/pexels-n-voitkevich-5792479.jpg',
    '/images/pexels-viktoria-slowikowska-5677703.jpg',
    '/images/pexels-nc-farm-bureau-mark-18900457.jpg'
  ];

  const [currentBg, setCurrentBg] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <>
      {/* Professional, subtle animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes floatSoft {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-up { animation: fadeUp 0.7s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .animate-float { animation: floatSoft 3s ease-in-out infinite; }
        .animate-slide-left { animation: slideLeft 0.7s ease-out forwards; }
        .animate-slide-right { animation: slideRight 0.7s ease-out forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.2s; opacity: 0; }
        .delay-3 { animation-delay: 0.3s; opacity: 0; }
        
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -10px rgba(0,0,0,0.1) !important;
        }
        .btn-hover {
          transition: all 0.2s ease;
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          filter: brightness(1.02);
        }
        .bg-fade {
          transition: opacity 1s ease-in-out;
        }
      `}</style>

      {/* Hero Section */}
      <div className="position-relative overflow-hidden" style={{ minHeight: '90vh' }}>
        {/* Rotating background images */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 bg-fade"
          style={{
            backgroundImage: `url(${backgrounds[currentBg]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            transition: 'opacity 1s ease-in-out',
            zIndex: 0
          }}
        />
        {/* Sophisticated overlay for readability */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)', zIndex: 1 }} />
        
        <div className="container position-relative d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '90vh', zIndex: 2 }}>
          <div className="animate-float mb-3">
            <FaSeedling size={72} style={{ color: '#B2EC05', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />
          </div>
          <h1 className="display-1 fw-bold animate-fade-up" style={{ color: '#B2EC05', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            🌾 AgroConnect
          </h1>
          <p className="lead fs-2 animate-fade-up delay-1">
            Fresh from <span style={{ color: '#B2EC05' }}>local farms</span> to your table
          </p>
          <p className="mb-4 fs-5 animate-fade-up delay-2">Connecting you with farmers and artisans in your neighborhood</p>
          <div className="animate-scale-in delay-3">
            {!user ? (
              <>
                <Link to="/register?role=vendor" className="btn btn-lg rounded-pill me-3 btn-hover" style={{ backgroundColor: '#09F315', color: '#1F2937', padding: '12px 30px', border: 'none', fontWeight: 600 }}>
                  Start Selling <FaRocket className="ms-2" />
                </Link>
                <Link to="/products" className="btn btn-lg btn-outline-light rounded-pill btn-hover" style={{ padding: '12px 30px', borderWidth: '2px' }}>
                  Explore Market
                </Link>
              </>
            ) : (
              <Link to="/products" className="btn btn-lg rounded-pill btn-hover" style={{ backgroundColor: '#B2EC05', color: '#1F2937', padding: '12px 40px', fontWeight: 600 }}>
                Browse {city} vendors
              </Link>
            )}
          </div>
        </div>
        
        {/* Background image dots */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 mb-3" style={{ zIndex: 3 }}>
          {backgrounds.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBg(idx)}
              className="border-0 rounded-circle p-0"
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: currentBg === idx ? '#B2EC05' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container py-5">
        <div className="row text-center g-4">
          {[
            { value: '500+', label: 'Local Vendors', icon: <FaTractor size={36} />, color: '#09F315' },
            { value: '10,000+', label: 'Happy Customers', icon: <FaHeart size={36} />, color: '#F4E04D' },
            { value: '15+', label: 'Regional Markets', icon: <FaGlobe size={36} />, color: '#B2EC05' },
            { value: '98%', label: 'Fresh Delivery Rate', icon: <FaStar size={36} />, color: '#F4A41A' }
          ].map((stat, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card border-0 shadow-sm rounded-4 p-3 card-hover h-100">
                <div className="card-body">
                  <div style={{ color: stat.color }} className="mb-3">{stat.icon}</div>
                  <h3 className="fw-bold" style={{ color: stat.color }}>{stat.value}</h3>
                  <p className="text-muted">{stat.label}</p>
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
              src="https://images.pexels.com/photos/33319743/pexels-photo-33319743.jpeg" 
              className="img-fluid rounded-4 shadow" 
              alt="Farmers market stall" 
              style={{ border: '3px solid #B2EC05' }} 
            />
          </div>
          <div className="col-md-6 animate-slide-right">
            <h2 className="fw-bold" style={{ background: 'linear-gradient(135deg, #09F315, #F4E04D)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Cut out the middlemen
            </h2>
            <p className="lead">Traditional supply chains eat up to 70% of a farmer's income. AgroConnect gives them a direct digital storefront.</p>
            <div className="d-flex gap-4 mt-4">
              <div className="text-center p-3 rounded-4 shadow-sm flex-fill card-hover" style={{ backgroundColor: '#F0FBD8' }}>
                <FaHandsHelping size={40} color="#09F315" className="mb-2" />
                <h5>For Farmers</h5>
                <p className="small">Own your store, set your price, keep more profit.</p>
              </div>
              <div className="text-center p-3 rounded-4 shadow-sm flex-fill card-hover" style={{ backgroundColor: '#FEF9E6' }}>
                <FaHeart size={40} color="#F4E04D" className="mb-2" />
                <h5>For Shoppers</h5>
                <p className="small">Fresh, traceable, local goods delivered fast.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold">Why choose AgroConnect?</h2>
        <div className="row g-4">
          {[
            { icon: <FaGlobe />, title: "Hyperlocal Discovery", desc: "Find products within 10km of your home.", color: "#09F315" },
            { icon: <FaChartLine />, title: "Zero Commission Starter", desc: "Keep 100% of your first 500 in sales.", color: "#F4E04D" },
            { icon: <FaTractor />, title: "Farmer Verification", desc: "Trust badges and quality certifications.", color: "#B2EC05" },
            { icon: <FaPaintBrush />, title: "Artisan Collective", desc: "Handmade goods from local creators.", color: "#F4A41A" }
          ].map((feat, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card h-100 border-0 shadow-sm text-center p-3 rounded-4 card-hover">
                <div className="card-body">
                  <div className="display-4 mb-3" style={{ color: feat.color }}>{feat.icon}</div>
                  <h5>{feat.title}</h5>
                  <p className="text-muted">{feat.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Subscription Plans */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="container">
          <h2 className="text-center mb-3 fw-bold">Vendor subscription plans</h2>
          <p className="text-center text-muted mb-5">Choose the plan that fits your farm or artisan business</p>
          
          <div className="row g-4">
            {/* Starter Plan */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow rounded-4 overflow-hidden card-hover">
                <div className="card-body p-4 text-center">
                  <h3 className="fw-semibold mb-2">Starter</h3>
                  <div className="display-4 fw-bold mb-3" style={{ color: '#F4E04D' }}>Free</div>
                  <ul className="list-unstyled text-start mt-4 mb-4">
                    <li className="mb-2"><span className="text-success me-2">✓</span> Up to 20 product listings</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Basic store profile</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Standard visibility</li>
                    <li className="text-muted"><span className="text-muted me-2">✗</span> No analytics</li>
                  </ul>
                  <Link to="/register?plan=starter" className="btn w-100 rounded-pill py-2 btn-hover" style={{ backgroundColor: '#F4E04D', color: '#2C3A1F', border: 'none', fontWeight: 500 }}>
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            {/* Growth Plan - Featured */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow rounded-4 overflow-hidden card-hover position-relative">
                <div className="position-absolute top-0 start-50 translate-middle-x bg-success text-white px-3 py-1 rounded-bottom" style={{ fontSize: '0.8rem', zIndex: 1, backgroundColor: '#09F315 !important', color: '#1F2937 !important', fontWeight: 600 }}>
                  Most Popular
                </div>
                <div className="card-body p-4 text-center mt-3">
                  <h3 className="fw-semibold mb-2">Growth</h3>
                  <div className="display-4 fw-bold mb-3" style={{ color: '#09F315' }}>$19<span style={{ fontSize: '1rem' }}>/mo</span></div>
                  <ul className="list-unstyled text-start mt-4 mb-4">
                    <li className="mb-2"><span className="text-success me-2">✓</span> Unlimited listings</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Basic sales analytics</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Priority visibility</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Email support</li>
                  </ul>
                  <Link to="/register?plan=growth" className="btn w-100 rounded-pill py-2 btn-hover" style={{ backgroundColor: '#09F315', color: 'white', border: 'none', fontWeight: 500 }}>
                    Choose Growth
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow rounded-4 overflow-hidden card-hover">
                <div className="card-body p-4 text-center">
                  <h3 className="fw-semibold mb-2">Pro</h3>
                  <div className="display-4 fw-bold mb-3" style={{ color: '#B2EC05' }}>$49<span style={{ fontSize: '1rem' }}>/mo</span></div>
                  <ul className="list-unstyled text-start mt-4 mb-4">
                    <li className="mb-2"><span className="text-success me-2">✓</span> Everything in Growth</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Featured placement</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Verified vendor badge</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Marketing tools + priority support</li>
                  </ul>
                  <Link to="/register?plan=pro" className="btn w-100 rounded-pill py-2 btn-hover" style={{ backgroundColor: '#B2EC05', color: '#2C3A1F', border: 'none', fontWeight: 500 }}>
                    Go Pro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold">Trusted by farmers & food lovers</h2>
        <div className="row g-4">
          {[
            { text: "AgroConnect doubled my direct sales in 3 months. I finally feel in control of my income.", name: "Grace M., Farmer, Zimbabwe", img: "https://randomuser.me/api/portraits/women/68.jpg", bg: "#F0FBD8" },
            { text: "I found organic honey from a beekeeper just 5km away. Unbelievable quality!", name: "John D., Customer, South Africa", img: "https://randomuser.me/api/portraits/men/32.jpg", bg: "#FEF9E6" },
            { text: "The platform is intuitive and the support team is super responsive.", name: "Amina K., Artisan, Kenya", img: "https://randomuser.me/api/portraits/women/90.jpg", bg: "#E9F7E1" }
          ].map((t, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card border-0 shadow p-4 rounded-4 h-100 card-hover" style={{ backgroundColor: t.bg }}>
                <p className="fs-5 fst-italic">"{t.text}"</p>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <img src={t.img} className="rounded-circle border border-2" style={{ borderColor: '#B2EC05' }} width="50" height="50" alt="avatar" />
                  <strong>{t.name}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container text-center py-5">
        <div className="p-5 rounded-5 shadow-lg" style={{ background: 'linear-gradient(125deg, #F4E04D, #B2EC05, #09F315)' }}>
          <h3 className="display-6 fw-bold text-dark">Ready to grow with AgroConnect?</h3>
          <FaSeedling size={56} className="my-3 animate-float" style={{ color: '#2C3A1F' }} />
          <div>
            <Link to="/register" className="btn btn-dark rounded-pill btn-lg px-5 mt-3 btn-hover" style={{ backgroundColor: '#2C3A1F', color: '#FDF8EB', border: 'none' }}>
              Join the movement →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;