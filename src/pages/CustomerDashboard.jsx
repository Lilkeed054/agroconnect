import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { FaShoppingBag, FaWallet, FaCalendarAlt, FaSeedling } from 'react-icons/fa';

const CustomerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getOrders('customer');
      // Ensure we always have an array
      const ordersData = Array.isArray(response) ? response : response?.data || [];
      setOrders(ordersData);
    } catch (err) {
      console.error('Failed to load orders:', err);
      setError('Failed to load orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0);
  const totalOrders = orders.length;

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border" style={{ color: '#D4A837' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container py-5 text-center" style={{ color: '#B0C0A8' }}>
        <p>{error}</p>
        <button className="btn btn-gold-dash" onClick={loadOrders}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .card-hover-dash {
          transition: transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-hover-dash:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px -10px rgba(0,0,0,0.7) !important;
          border-color: rgba(212, 168, 55, 0.3) !important;
        }
        .badge-delivered {
          background: #1A2A1A;
          color: #7C9A5E;
          border: 1px solid rgba(124, 154, 94, 0.3);
        }
        .badge-processing {
          background: #1A2A1A;
          color: #D4A837;
          border: 1px solid rgba(212, 168, 55, 0.2);
        }
        .btn-outline-gold-dash {
          background: transparent;
          border: 1px solid rgba(212, 168, 55, 0.2);
          color: #D4A837;
          transition: all 0.25s ease;
        }
        .btn-outline-gold-dash:hover {
          background: #D4A837;
          color: #0A120A;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
        }
        .btn-gold-dash {
          background: #D4A837;
          color: #0A120A;
          border: none;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .btn-gold-dash:hover {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
        .empty-state-dash {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.08);
          border-radius: 1.5rem;
        }
      `}</style>

      <div className="container py-5" style={{ color: '#D0D8C8' }}>
        {/* Header */}
        <div className="mb-5">
          <h2 className="fw-bold" style={{ color: '#D4A837' }}>My Dashboard</h2>
          <p style={{ color: '#B0C0A8' }}>Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-lg rounded-4 p-3 text-center h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
              <FaShoppingBag size={36} className="mx-auto mb-2" style={{ color: '#D4A837' }} />
              <h5 style={{ color: '#B0C0A8' }}>Total Orders</h5>
              <h3 className="fw-bold" style={{ color: '#D4A837' }}>{totalOrders}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg rounded-4 p-3 text-center h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
              <FaWallet size={36} className="mx-auto mb-2" style={{ color: '#7C9A5E' }} />
              <h5 style={{ color: '#B0C0A8' }}>Total Spent</h5>
              <h3 className="fw-bold" style={{ color: '#D4A837' }}>${totalSpent.toFixed(2)}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg rounded-4 p-3 text-center h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
              <FaCalendarAlt size={36} className="mx-auto mb-2" style={{ color: '#D4A837' }} />
              <h5 style={{ color: '#B0C0A8' }}>Member Since</h5>
              <h3 className="fw-bold" style={{ color: '#D4A837' }}>
                {user?.created_at ? new Date(user.created_at).getFullYear() : '2024'}
              </h3>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold" style={{ color: '#D4A837' }}>Order History</h4>
          {orders.length > 0 && (
            <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: '#1A2A1A', color: '#D4A837', border: '1px solid rgba(212,168,55,0.2)' }}>
              {orders.length} orders
            </span>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-5 empty-state-dash">
            <FaSeedling size={48} className="mb-3" style={{ color: '#D4A837' }} />
            <h5 style={{ color: '#D0D8C8' }}>No orders yet</h5>
            <p style={{ color: '#B0C0A8' }}>Start exploring our fresh products and place your first order!</p>
            <a href="/products" className="btn rounded-pill mt-2 btn-gold-dash">
              Browse Products
            </a>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div className="col-12" key={order.id}>
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
                  <div className="card-body p-4">
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                      <div>
                        <h5 className="fw-bold mb-1" style={{ color: '#D4A837' }}>Order #{order.id}</h5>
                        <p className="small mb-2" style={{ color: '#B0C0A8' }}>
                          <FaCalendarAlt className="me-1" /> {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={order.status === 'delivered'
                          ? { backgroundColor: '#1A2A1A', color: '#7C9A5E', border: '1px solid rgba(124,154,94,0.3)' }
                          : { backgroundColor: '#1A2A1A', color: '#D4A837', border: '1px solid rgba(212,168,55,0.2)' }
                        }
                      >
                        {order.status || 'Processing'}
                      </span>
                    </div>
                    <hr className="my-3" style={{ borderColor: 'rgba(212,168,55,0.15)' }} />
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <div>
                        <span style={{ color: '#B0C0A8' }}>Total amount: </span>
                        <span className="fw-bold fs-5" style={{ color: '#D4A837' }}>${parseFloat(order.total).toFixed(2)}</span>
                      </div>
                      <button
                        className="btn btn-sm rounded-pill mt-2 mt-sm-0 btn-outline-gold-dash"
                        onClick={() => window.location.href = `/orders/${order.id}`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerDashboard;