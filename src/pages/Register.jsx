import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaSeedling, FaArrowRight } from 'react-icons/fa';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', password_confirmation: '', 
    role: 'customer', country: 'Zimbabwe', city: 'Harare', phone: ''
  });
  const { register, user } = useAuth();
  const navigate = useNavigate();

  // Redirect based on role after registration
  useEffect(() => {
    if (user) {
      if (user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/'); // customer goes to home
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      alert('Passwords do not match');
      return;
    }
    await register(form);
    // No navigate here – useEffect will handle it
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-hover-register {
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .card-hover-register:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 30px -10px rgba(0,0,0,0.7) !important;
        }
        .input-dark {
          background-color: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-dark:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
          background-color: #1A2A1A !important;
          color: #D0D8C8 !important;
        }
        .input-dark::placeholder {
          color: #6A7A62 !important;
        }
        .input-dark option {
          background-color: #1A2A1A;
          color: #D0D8C8;
        }
        .btn-gold {
          background: #D4A837;
          color: #0A120A;
          border: none;
          font-weight: 600;
          transition: all 0.25s ease;
          padding: 10px;
        }
        .btn-gold:hover {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
        .link-gold {
          color: #D4A837;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .link-gold:hover {
          color: #C49A2E;
          text-decoration: underline;
        }
        .select-dark {
          background-color: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23D4A837' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.2rem center;
          background-size: 12px 8px;
          padding-right: 2.5rem;
        }
        .select-dark:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
          background-color: #1A2A1A !important;
          color: #D0D8C8 !important;
        }
        .select-dark option {
          background-color: #1A2A1A;
          color: #D0D8C8;
        }
        .form-label-dark {
          color: #D0D8C8;
          font-weight: 600;
        }
        .icon-gold {
          color: #D4A837;
        }
        .icon-moss {
          color: #7C9A5E;
        }
      `}</style>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6" data-aos="fade-up">
            <div 
              className="card border-0 rounded-4 overflow-hidden card-hover-register" 
              style={{ 
                background: '#162016', 
                border: '1px solid rgba(212, 168, 55, 0.12)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
                animation: 'slideUp 0.6s ease-out'
              }}
            >
              {/* Header with dark gradient and gold accents */}
              <div className="text-center py-4" style={{ background: 'linear-gradient(135deg, #0A120A 0%, #1A2A1A 100%)', borderBottom: '1px solid rgba(212, 168, 55, 0.15)' }}>
                <FaSeedling size={48} className="mb-2" style={{ color: '#D4A837', filter: 'drop-shadow(0 2px 8px rgba(212,168,55,0.3))' }} />
                <h3 className="mb-0 fw-bold" style={{ color: '#D4A837' }}>Join AgroConnect</h3>
                <p className="mb-0" style={{ color: '#B0C0A8' }}>Start buying or selling locally</p>
              </div>
              
              <div className="card-body p-4" style={{ backgroundColor: '#162016' }}>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label form-label-dark">
                      <FaUser className="me-2 icon-moss" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      className="form-control rounded-pill input-dark" 
                      placeholder="Your full name"
                      value={form.name} 
                      onChange={e => setForm({...form, name: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label form-label-dark">
                      <FaEnvelope className="me-2 icon-gold" /> Email
                    </label>
                    <input 
                      type="email" 
                      className="form-control rounded-pill input-dark" 
                      placeholder="you@example.com"
                      value={form.email} 
                      onChange={e => setForm({...form, email: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label form-label-dark">
                        <FaLock className="me-2 icon-gold" /> Password
                      </label>
                      <input 
                        type="password" 
                        className="form-control rounded-pill input-dark" 
                        placeholder="Min 6 chars"
                        value={form.password} 
                        onChange={e => setForm({...form, password: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label form-label-dark">Confirm Password</label>
                      <input 
                        type="password" 
                        className="form-control rounded-pill input-dark" 
                        placeholder="Confirm"
                        value={form.password_confirmation} 
                        onChange={e => setForm({...form, password_confirmation: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label form-label-dark">I am a</label>
                    <select 
                      className="form-select rounded-pill select-dark" 
                      value={form.role} 
                      onChange={e => setForm({...form, role: e.target.value})}
                    >
                      <option value="customer">Customer</option>
                      <option value="vendor">Vendor</option>
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label form-label-dark">
                        <FaMapMarkerAlt className="me-2 icon-moss" /> Country
                      </label>
                      <input 
                        type="text" 
                        className="form-control rounded-pill input-dark" 
                        placeholder="Country"
                        value={form.country} 
                        onChange={e => setForm({...form, country: e.target.value})} 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label form-label-dark">City</label>
                      <input 
                        type="text" 
                        className="form-control rounded-pill input-dark" 
                        placeholder="City"
                        value={form.city} 
                        onChange={e => setForm({...form, city: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label form-label-dark">
                      <FaPhone className="me-2 icon-gold" /> Phone (optional)
                    </label>
                    <input 
                      type="tel" 
                      className="form-control rounded-pill input-dark" 
                      placeholder="+1234567890"
                      value={form.phone} 
                      onChange={e => setForm({...form, phone: e.target.value})} 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn w-100 rounded-pill fw-semibold btn-gold shadow-sm"
                  >
                    Create Account <FaArrowRight className="ms-2" />
                  </button>
                </form>
                <div className="text-center mt-4">
                  <Link to="/login" className="link-gold">
                    Already have an account? <strong>Login</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;