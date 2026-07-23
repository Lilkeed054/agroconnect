import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaLock, FaSeedling, FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect based on role when user becomes available
  useEffect(() => {
    if (user) {
      if (user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/'); // customers go to home (or you can change to '/customer/dashboard')
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    // No need to navigate here – the useEffect will handle it
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-hover-login {
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .card-hover-login:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 30px -10px rgba(0,0,0,0.7) !important;
        }
        .input-dark {
          background-color: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
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
        .btn-gold {
          background: #D4A837;
          color: #0A120A;
          border: none;
          font-weight: 600;
          transition: all 0.25s ease;
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
      `}</style>

      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
        <div className="col-md-5" data-aos="fade-up">
          <div 
            className="card border-0 rounded-4 overflow-hidden card-hover-login" 
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
              <h3 className="mb-0 fw-bold" style={{ color: '#D4A837' }}>Welcome Back</h3>
              <p className="mb-0" style={{ color: '#B0C0A8' }}>Sign in to continue</p>
            </div>
            
            <div className="card-body p-5" style={{ backgroundColor: '#162016' }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ color: '#D0D8C8' }}>
                    <FaEnvelope className="me-2" style={{ color: '#D4A837' }} /> Email
                  </label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg rounded-pill input-dark" 
                    placeholder="you@example.com"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ color: '#D0D8C8' }}>
                    <FaLock className="me-2" style={{ color: '#7C9A5E' }} /> Password
                  </label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg rounded-pill input-dark" 
                    placeholder="••••••••"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn w-100 btn-lg rounded-pill fw-semibold btn-gold shadow-sm"
                >
                  Login <FaArrowRight className="ms-2" />
                </button>
              </form>
              <div className="text-center mt-4">
                <Link to="/register" className="link-gold">
                  Don't have an account? <strong>Sign up</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;