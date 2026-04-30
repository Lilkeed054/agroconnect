import { FaLeaf, FaHandsHelping, FaGlobe, FaTractor, FaSeedling, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5 animate-fade-up">
        <FaLeaf size={64} className="mb-3" style={{ color: '#09F315' }} />
        <h1 className="display-4 fw-bold" style={{ color: '#2C3A1F' }}>About AgroConnect</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
          We're on a mission to reconnect communities with fresh, local food – from farm to table.
        </p>
      </div>

      {/* Hero Image */}
      <div className="mb-5 animate-scale-in">
        <img 
          src="https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          className="img-fluid rounded-4 shadow" 
          alt="Farmers market"
          style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }}
        />
      </div>

      {/* Our Story / Mission */}
      <div className="row g-5 align-items-center mb-5">
        <div className="col-md-6 animate-slide-left">
          <h2 className="fw-bold mb-3" style={{ background: 'linear-gradient(135deg, #09F315, #B2EC05)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            Our Story
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            AgroConnect was born from a simple idea: <strong>farmers and artisans deserve fair prices, and consumers deserve fresh, traceable food</strong>. 
            Traditional supply chains take up to 70% of a farmer's income. We cut out the middlemen, giving growers a direct digital storefront.
          </p>
          <p className="mt-3">
            Starting in Zimbabwe, we're now expanding across Africa and beyond – building a global hyperlocal marketplace that empowers local economies.
          </p>
        </div>
        <div className="col-md-6 animate-slide-right">
          <div className="card border-0 shadow-sm rounded-4 p-4" style={{ backgroundColor: '#F9FAFB' }}>
            <h3 className="fw-bold mb-3" style={{ color: '#09F315' }}>Our Mission</h3>
            <p className="lead" style={{ fontStyle: 'italic' }}>
              "To digitize local trade worldwide, making fresh, authentic products accessible to everyone while ensuring farmers get a fair share."
            </p>
            <hr className="my-3" style={{ borderColor: '#F4E04D' }} />
            <div className="d-flex gap-3 mt-2">
              <FaHandsHelping size={28} style={{ color: '#B2EC05' }} />
              <div>
                <strong>Fair Trade</strong>
                <p className="small text-muted mb-0">No hidden fees, transparent pricing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats / Impact Numbers */}
      <div className="row g-4 mb-5 text-center">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 animate-zoom">
            <FaTractor size={40} className="mx-auto mb-2" style={{ color: '#F4E04D' }} />
            <h3 className="fw-bold" style={{ color: '#09F315' }}>500+</h3>
            <p className="text-muted">Local Vendors</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 animate-zoom" style={{ animationDelay: '0.1s' }}>
            <FaHandsHelping size={40} className="mx-auto mb-2" style={{ color: '#B2EC05' }} />
            <h3 className="fw-bold" style={{ color: '#09F315' }}>10K+</h3>
            <p className="text-muted">Happy Customers</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 animate-zoom" style={{ animationDelay: '0.2s' }}>
            <FaGlobe size={40} className="mx-auto mb-2" style={{ color: '#F4E04D' }} />
            <h3 className="fw-bold" style={{ color: '#09F315' }}>15+</h3>
            <p className="text-muted">Regional Markets</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 animate-zoom" style={{ animationDelay: '0.3s' }}>
            <FaChartLine size={40} className="mx-auto mb-2" style={{ color: '#B2EC05' }} />
            <h3 className="fw-bold" style={{ color: '#09F315' }}>98%</h3>
            <p className="text-muted">Fresh Delivery Rate</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: '#2C3A1F' }}>What We Stand For</h2>
        <p className="text-muted">Core values that drive us every day</p>
      </div>
      <div className="row g-4 mb-5">
        {[
          { icon: <FaSeedling />, title: "Freshness First", desc: "We ensure every product is harvested or made with care.", color: "#09F315" },
          { icon: <FaHandsHelping />, title: "Empowerment", desc: "Giving farmers control over pricing and visibility.", color: "#B2EC05" },
          { icon: <FaGlobe />, title: "Sustainability", desc: "Supporting local, reducing food miles.", color: "#F4E04D" },
          { icon: <FaChartLine />, title: "Transparency", desc: "Clear pricing, verified origins, honest reviews.", color: "#09F315" },
        ].map((value, idx) => (
          <div className="col-md-3" key={idx}>
            <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100 card-hover">
              <div className="display-6 mb-3" style={{ color: value.color }}>{value.icon}</div>
              <h5>{value.title}</h5>
              <p className="small text-muted">{value.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center p-5 rounded-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #F4E04D, #B2EC05, #09F315)' }}>
        <h3 className="fw-bold" style={{ color: '#2C3A1F' }}>Ready to join the movement?</h3>
        <p className="mb-3" style={{ color: '#2C3A1F' }}>Whether you're a farmer, artisan, or food lover – there's a place for you.</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <a href="/register?role=vendor" className="btn rounded-pill px-4 py-2 fw-semibold" style={{ backgroundColor: '#2C3A1F', color: '#F9FAFB' }}>
            Become a Vendor
          </a>
          <a href="/products" className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold" style={{ borderColor: '#2C3A1F', color: '#2C3A1F' }}>
            Shop Local
          </a>
        </div>
      </div>

      {/* Inline animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-up { animation: fadeUp 0.7s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-slide-left { animation: slideLeft 0.7s ease-out forwards; }
        .animate-slide-right { animation: slideRight 0.7s ease-out forwards; }
        .animate-zoom { animation: zoomIn 0.5s ease-out forwards; opacity: 0; animation-fill-mode: forwards; }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 12px 20px -10px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
};

export default About;