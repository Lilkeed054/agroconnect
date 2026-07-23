import { FaLeaf, FaHandsHelping, FaGlobe, FaTractor, FaSeedling, FaChartLine } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <style>{`
        .about-page {
          background: #0A120A;
          padding: 2rem 0 4rem 0;
          min-height: 90vh;
        }
        .about-hero-icon {
          color: #D4A837;
        }
        .about-title {
          color: #D4A837;
        }
        .about-subtitle {
          color: #B0C0A8;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .about-image-wrapper {
          border: 1px solid rgba(212, 168, 55, 0.15);
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0,0,0,0.6);
        }
        .about-image-wrapper img {
          width: 100%;
          max-height: 450px;
          object-fit: cover;
        }
        .about-section-title {
          color: #D4A837;
        }
        .about-body-text {
          color: #B0C0A8;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        .about-body-text strong {
          color: #D0D8C8;
        }
        .mission-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.1);
          border-radius: 1.5rem;
          box-shadow: 0 15px 30px rgba(0,0,0,0.5);
        }
        .mission-card .mission-title {
          color: #D4A837;
        }
        .mission-card .mission-quote {
          color: #D0D8C8;
          font-style: italic;
        }
        .mission-card .mission-divider {
          border-color: rgba(212, 168, 55, 0.15);
        }
        .mission-card .mission-icon {
          color: #7C9A5E;
        }
        .mission-card .mission-label {
          color: #D0D8C8;
        }
        .mission-card .mission-desc {
          color: #B0C0A8;
        }
        .stat-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.08);
          border-radius: 1.5rem;
          padding: 1.5rem 1rem;
          text-align: center;
          height: 100%;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }
        .stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 168, 55, 0.3);
          box-shadow: 0 15px 30px rgba(0,0,0,0.6);
        }
        .stat-card .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .stat-card .stat-number {
          color: #D4A837;
          font-weight: 700;
          font-size: 2rem;
        }
        .stat-card .stat-label {
          color: #B0C0A8;
        }
        .value-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.08);
          border-radius: 1.5rem;
          padding: 1.5rem 1rem;
          text-align: center;
          height: 100%;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 20px rgba(0,0,0,0.4);
        }
        .value-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 168, 55, 0.3);
          box-shadow: 0 15px 30px rgba(0,0,0,0.6);
        }
        .value-card .value-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .value-card .value-title {
          color: #D0D8C8;
          font-weight: 600;
        }
        .value-card .value-desc {
          color: #B0C0A8;
          font-size: 0.9rem;
        }
        .cta-section {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.2);
          border-radius: 1.5rem;
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 15px 30px rgba(0,0,0,0.5);
        }
        .cta-section .cta-title {
          color: #D4A837;
          font-weight: 700;
        }
        .cta-section .cta-sub {
          color: #B0C0A8;
        }
        .btn-cta-primary {
          background: #D4A837;
          color: #0A120A;
          border: none;
          padding: 0.6rem 2rem;
          border-radius: 2rem;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .btn-cta-primary:hover {
          background: #C49A2E;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(212, 168, 55, 0.4);
          color: #0A120A;
        }
        .btn-cta-secondary {
          background: transparent;
          color: #D4A837;
          border: 2px solid #D4A837;
          padding: 0.6rem 2rem;
          border-radius: 2rem;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .btn-cta-secondary:hover {
          background: #D4A837;
          color: #0A120A;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(212, 168, 55, 0.3);
        }
        /* Animation keyframes */
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
      `}</style>

      <div className="about-page">
        <div className="container">
          {/* Hero Section */}
          <div className="text-center mb-5 animate-fade-up">
            <FaLeaf size={64} className="mb-3 about-hero-icon" />
            <h1 className="display-4 fw-bold about-title">About AgroConnect</h1>
            <p className="lead about-subtitle">
              We're on a mission to reconnect communities with fresh, local food – from farm to table.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-5 animate-scale-in about-image-wrapper">
            <img 
              src="https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              className="img-fluid" 
              alt="Farmers market"
            />
          </div>

          {/* Our Story / Mission */}
          <div className="row g-5 align-items-center mb-5">
            <div className="col-md-6 animate-slide-left">
              <h2 className="fw-bold mb-3 about-section-title">Our Story</h2>
              <p className="about-body-text">
                AgroConnect was born from a simple idea: <strong>farmers and artisans deserve fair prices, and consumers deserve fresh, traceable food</strong>. 
                Traditional supply chains take up to 70% of a farmer's income. We cut out the middlemen, giving growers a direct digital storefront.
              </p>
              <p className="about-body-text mt-3">
                Starting in Zimbabwe, we're now expanding across Africa and beyond – building a global hyperlocal marketplace that empowers local economies.
              </p>
            </div>
            <div className="col-md-6 animate-slide-right">
              <div className="card mission-card p-4">
                <h3 className="fw-bold mb-3 mission-title">Our Mission</h3>
                <p className="lead mission-quote">
                  "To digitize local trade worldwide, making fresh, authentic products accessible to everyone while ensuring farmers get a fair share."
                </p>
                <hr className="my-3 mission-divider" />
                <div className="d-flex gap-3 mt-2">
                  <FaHandsHelping size={28} className="mission-icon" />
                  <div>
                    <strong className="mission-label">Fair Trade</strong>
                    <p className="small mb-0 mission-desc">No hidden fees, transparent pricing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats / Impact Numbers */}
          <div className="row g-4 mb-5 text-center">
            <div className="col-md-3">
              <div className="stat-card animate-zoom">
                <FaTractor className="stat-icon" style={{ color: '#D4A837' }} />
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Local Vendors</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card animate-zoom" style={{ animationDelay: '0.1s' }}>
                <FaHandsHelping className="stat-icon" style={{ color: '#7C9A5E' }} />
                <h3 className="stat-number">10K+</h3>
                <p className="stat-label">Happy Customers</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card animate-zoom" style={{ animationDelay: '0.2s' }}>
                <FaGlobe className="stat-icon" style={{ color: '#D4A837' }} />
                <h3 className="stat-number">15+</h3>
                <p className="stat-label">Regional Markets</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card animate-zoom" style={{ animationDelay: '0.3s' }}>
                <FaChartLine className="stat-icon" style={{ color: '#7C9A5E' }} />
                <h3 className="stat-number">98%</h3>
                <p className="stat-label">Fresh Delivery Rate</p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-4">
            <h2 className="fw-bold about-section-title">What We Stand For</h2>
            <p className="about-subtitle">Core values that drive us every day</p>
          </div>
          <div className="row g-4 mb-5">
            {[
              { icon: <FaSeedling />, title: "Freshness First", desc: "We ensure every product is harvested or made with care.", color: "#D4A837" },
              { icon: <FaHandsHelping />, title: "Empowerment", desc: "Giving farmers control over pricing and visibility.", color: "#7C9A5E" },
              { icon: <FaGlobe />, title: "Sustainability", desc: "Supporting local, reducing food miles.", color: "#D4A837" },
              { icon: <FaChartLine />, title: "Transparency", desc: "Clear pricing, verified origins, honest reviews.", color: "#7C9A5E" },
            ].map((value, idx) => (
              <div className="col-md-3" key={idx}>
                <div className="value-card animate-zoom" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="value-icon" style={{ color: value.color }}>{value.icon}</div>
                  <h5 className="value-title">{value.title}</h5>
                  <p className="value-desc">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <h3 className="cta-title">Ready to join the movement?</h3>
            <p className="cta-sub mb-3">Whether you're a farmer, artisan, or food lover – there's a place for you.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="/register?role=vendor" className="btn btn-cta-primary">
                Become a Vendor
              </a>
              <a href="/products" className="btn btn-cta-secondary">
                Shop Local
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;