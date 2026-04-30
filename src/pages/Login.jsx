import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaLock, FaSeedling, FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
      <div className="col-md-5" data-aos="fade-up">
        <div className="card shadow border-0 rounded-4 overflow-hidden" style={{ animation: 'slideUp 0.5s ease-out' }}>
          {/* Header gradient: yellow → green */}
          <div className="text-white text-center py-4" style={{ background: 'linear-gradient(135deg, #F4E04D, #09F315)' }}>
            <FaSeedling size={48} className="mb-2" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
            <h3 className="mb-0 fw-bold" style={{ color: '#2C3A1F' }}>Welcome Back</h3>
            <p className="mb-0" style={{ color: '#2C3A1F', opacity: 0.9 }}>Sign in to continue</p>
          </div>
          
          <div className="card-body p-5" style={{ backgroundColor: '#FFFFFF' }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-semibold"><FaEnvelope className="me-2" style={{ color: '#F4E04D' }} /> Email</label>
                <input 
                  type="email" 
                  className="form-control form-control-lg rounded-pill border-0 shadow-sm" 
                  style={{ backgroundColor: '#F9FAFB' }}
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold"><FaLock className="me-2" style={{ color: '#09F315' }} /> Password</label>
                <input 
                  type="password" 
                  className="form-control form-control-lg rounded-pill border-0 shadow-sm" 
                  style={{ backgroundColor: '#F9FAFB' }}
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="btn w-100 btn-lg rounded-pill fw-semibold shadow-sm"
                style={{ 
                  background: 'linear-gradient(135deg, #B2EC05, #09F315)', 
                  color: '#2C3A1F',
                  transition: 'all 0.2s',
                  border: 'none'
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.transform = 'scale(1.02)'; 
                  e.currentTarget.style.background = 'linear-gradient(135deg, #09F315, #F4E04D)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.transform = 'scale(1)'; 
                  e.currentTarget.style.background = 'linear-gradient(135deg, #B2EC05, #09F315)'; 
                }}
              >
                Login <FaArrowRight className="ms-2" />
              </button>
            </form>
            <div className="text-center mt-4">
              <Link to="/register" className="text-decoration-none" style={{ color: '#09F315' }}>
                Don't have an account? <strong>Sign up</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;