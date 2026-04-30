import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { FaShoppingBag, FaWallet, FaCalendarAlt, FaSeedling } from 'react-icons/fa';

const CustomerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.getOrders('customer').then(setOrders);
  }, []);

  // Calculate stats
  const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0);
  const totalOrders = orders.length;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-5">
        <h2 className="fw-bold" style={{ color: '#2C3A1F' }}>My Dashboard</h2>
        <p className="text-muted">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <FaShoppingBag size={36} className="mx-auto mb-2" style={{ color: '#F4E04D' }} />
            <h5 className="text-muted">Total Orders</h5>
            <h3 className="fw-bold" style={{ color: '#09F315' }}>{totalOrders}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <FaWallet size={36} className="mx-auto mb-2" style={{ color: '#B2EC05' }} />
            <h5 className="text-muted">Total Spent</h5>
            <h3 className="fw-bold" style={{ color: '#09F315' }}>${totalSpent.toFixed(2)}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <FaCalendarAlt size={36} className="mx-auto mb-2" style={{ color: '#F4E04D' }} />
            <h5 className="text-muted">Member Since</h5>
            <h3 className="fw-bold" style={{ color: '#09F315' }}>
              {user?.created_at ? new Date(user.created_at).getFullYear() : '2024'}
            </h3>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold" style={{ color: '#2C3A1F' }}>Order History</h4>
        {orders.length > 0 && (
          <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: '#B2EC05', color: '#2C3A1F' }}>
            {orders.length} orders
          </span>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <FaSeedling size={48} className="mb-3" style={{ color: '#B2EC05' }} />
          <h5 style={{ color: '#2C3A1F' }}>No orders yet</h5>
          <p className="text-muted">Start exploring our fresh products and place your first order!</p>
          <a href="/products" className="btn rounded-pill mt-2" style={{ backgroundColor: '#09F315', color: '#2C3A1F' }}>
            Browse Products
          </a>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map(order => (
            <div className="col-12" key={order.id}>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                    <div>
                      <h5 className="fw-bold mb-1" style={{ color: '#2C3A1F' }}>Order #{order.id}</h5>
                      <p className="text-muted small mb-2">
                        <FaCalendarAlt className="me-1" /> {new Date(order.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'long', day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <span 
                      className="badge rounded-pill px-3 py-2"
                      style={{ 
                        backgroundColor: order.status === 'delivered' ? '#B2EC05' : '#F4E04D',
                        color: '#2C3A1F'
                      }}
                    >
                      {order.status || 'Processing'}
                    </span>
                  </div>
                  <hr className="my-3" style={{ borderColor: '#F4E04D' }} />
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div>
                      <span className="text-muted">Total amount: </span>
                      <span className="fw-bold fs-5" style={{ color: '#09F315' }}>${parseFloat(order.total).toFixed(2)}</span>
                    </div>
                    <button 
                      className="btn btn-sm rounded-pill mt-2 mt-sm-0"
                      style={{ backgroundColor: '#F9FAFB', color: '#09F315', border: '1px solid #E5E7EB' }}
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
  );
};

export default CustomerDashboard;