import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaSeedling, FaArrowRight } from 'react-icons/fa';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', password_confirmation: '', role: 'customer', country: 'Zimbabwe', city: 'Harare', phone: ''
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) return alert('Passwords do not match');
    await register(form);
    navigate('/');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6" data-aos="fade-up">
          <div className="card shadow border-0 rounded-4 overflow-hidden" style={{ animation: 'slideUp 0.5s ease-out' }}>
            {/* Header with brand gradient (yellow → green) */}
            <div className="text-white text-center py-4" style={{ background: 'linear-gradient(135deg, #F4E04D, #09F315)' }}>
              <FaSeedling size={48} className="mb-2" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              <h3 className="mb-0 fw-bold" style={{ color: '#2C3A1F' }}>Join AgroConnect</h3>
              <p className="mb-0" style={{ color: '#2C3A1F', opacity: 0.9 }}>Start buying or selling locally</p>
            </div>
            
            <div className="card-body p-4" style={{ backgroundColor: '#FFFFFF' }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold"><FaUser className="me-2" style={{ color: '#09F315' }} /> Full Name</label>
                  <input 
                    type="text" 
                    className="form-control rounded-pill border-0 shadow-sm" 
                    style={{ backgroundColor: '#F9FAFB' }}
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold"><FaEnvelope className="me-2" style={{ color: '#F4E04D' }} /> Email</label>
                  <input 
                    type="email" 
                    className="form-control rounded-pill border-0 shadow-sm" 
                    style={{ backgroundColor: '#F9FAFB' }}
                    value={form.email} 
                    onChange={e => setForm({...form, email: e.target.value})} 
                    required 
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold"><FaLock className="me-2" style={{ color: '#B2EC05' }} /> Password</label>
                    <input 
                      type="password" 
                      className="form-control rounded-pill border-0 shadow-sm" 
                      style={{ backgroundColor: '#F9FAFB' }}
                      value={form.password} 
                      onChange={e => setForm({...form, password: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <input 
                      type="password" 
                      className="form-control rounded-pill border-0 shadow-sm" 
                      style={{ backgroundColor: '#F9FAFB' }}
                      value={form.password_confirmation} 
                      onChange={e => setForm({...form, password_confirmation: e.target.value})} 
                      required 
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">I am a</label>
                  <select 
                    className="form-select rounded-pill border-0 shadow-sm" 
                    style={{ backgroundColor: '#F9FAFB' }}
                    value={form.role} 
                    onChange={e => setForm({...form, role: e.target.value})}
                  >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold"><FaMapMarkerAlt className="me-2" style={{ color: '#09F315' }} /> Country</label>
                    <input 
                      type="text" 
                      className="form-control rounded-pill border-0 shadow-sm" 
                      style={{ backgroundColor: '#F9FAFB' }}
                      value={form.country} 
                      onChange={e => setForm({...form, country: e.target.value})} 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">City</label>
                    <input 
                      type="text" 
                      className="form-control rounded-pill border-0 shadow-sm" 
                      style={{ backgroundColor: '#F9FAFB' }}
                      value={form.city} 
                      onChange={e => setForm({...form, city: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold"><FaPhone className="me-2" style={{ color: '#B2EC05' }} /> Phone (optional)</label>
                  <input 
                    type="tel" 
                    className="form-control rounded-pill border-0 shadow-sm" 
                    style={{ backgroundColor: '#F9FAFB' }}
                    value={form.phone} 
                    onChange={e => setForm({...form, phone: e.target.value})} 
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn w-100 rounded-pill fw-semibold shadow-sm"
                  style={{ 
                    background: 'linear-gradient(135deg, #B2EC05, #09F315)', 
                    color: '#2C3A1F',
                    transition: 'all 0.2s',
                    border: 'none',
                    padding: '10px'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.background = 'linear-gradient(135deg, #09F315, #F4E04D)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'linear-gradient(135deg, #B2EC05, #09F315)'; }}
                >
                  Create Account <FaArrowRight className="ms-2" />
                </button>
              </form>
              <div className="text-center mt-4">
                <Link to="/login" className="text-decoration-none" style={{ color: '#09F315' }}>
                  Already have an account? <strong>Login</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;