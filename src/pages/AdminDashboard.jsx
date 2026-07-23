import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FaStore, FaShoppingCart, FaCheckCircle, FaUserCheck } from 'react-icons/fa';

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/admin/vendors').then(setVendors);
    api.get('/admin/orders').then(setOrders);
  }, []);

  const verifyVendor = async (id) => {
    await api.post(`/admin/vendors/${id}/verify`);
    alert('Vendor verified');
    api.get('/admin/vendors').then(setVendors);
  };

  const pendingVendors = vendors.filter(v => !v.verified);
  const verifiedVendors = vendors.filter(v => v.verified);

  return (
    <>
      <style>{`
        .admin-page {
          background: #0A120A;
          min-height: 90vh;
          padding: 2rem 0;
          color: #D0D8C8;
        }
        .admin-header h2 {
          color: #D4A837;
          font-weight: 700;
        }
        .admin-header p {
          color: #B0C0A8;
        }
        .stat-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.08);
          border-radius: 1.5rem;
          padding: 1.5rem 1rem;
          text-align: center;
          height: 100%;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 168, 55, 0.3);
          box-shadow: 0 20px 30px -10px rgba(0,0,0,0.7);
        }
        .stat-card .stat-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .stat-card .stat-label {
          color: #B0C0A8;
          font-weight: 500;
        }
        .stat-card .stat-value {
          color: #D4A837;
          font-weight: 700;
          font-size: 2rem;
          margin-top: 0.25rem;
        }
        .admin-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.08);
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 12px 24px -8px rgba(0,0,0,0.6);
        }
        .admin-card .card-header {
          background: transparent;
          border-bottom: 2px solid rgba(212, 168, 55, 0.2);
          padding: 1rem 1.5rem;
        }
        .admin-card .card-header h4 {
          color: #D4A837;
          font-weight: 700;
          margin: 0;
        }
        .admin-list-item {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(212, 168, 55, 0.05);
          transition: background 0.2s;
        }
        .admin-list-item:last-child {
          border-bottom: none;
        }
        .admin-list-item:hover {
          background: #1A2A1A;
        }
        .admin-list-item .item-title {
          color: #D0D8C8;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .admin-list-item .item-sub {
          color: #B0C0A8;
          font-size: 0.85rem;
        }
        .btn-verify {
          background: #D4A837;
          color: #0A120A;
          border: none;
          padding: 0.3rem 1.2rem;
          border-radius: 2rem;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .btn-verify:hover {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
        .btn-outline-gold-admin {
          background: transparent;
          border: 1px solid rgba(212, 168, 55, 0.3);
          color: #D4A837;
          padding: 0.2rem 1rem;
          border-radius: 2rem;
          transition: all 0.25s ease;
        }
        .btn-outline-gold-admin:hover {
          background: #D4A837;
          color: #0A120A;
          transform: translateY(-2px);
        }
        .badge-status {
          padding: 0.2rem 0.8rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 600;
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
        .empty-state-admin {
          padding: 2rem 0;
          text-align: center;
          color: #B0C0A8;
        }
        .empty-state-admin svg {
          color: #D4A837;
          margin-bottom: 0.5rem;
        }
        .empty-state-admin p {
          margin: 0;
        }
        .admin-hr {
          border-color: rgba(212, 168, 55, 0.1);
        }
      `}</style>

      <div className="admin-page">
        <div className="container">
          {/* Header */}
          <div className="admin-header mb-5">
            <h2>Admin Dashboard</h2>
            <p>Manage vendors, orders, and platform activity</p>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="stat-card">
                <FaStore className="stat-icon" style={{ color: '#D4A837' }} />
                <div className="stat-label">Total Vendors</div>
                <div className="stat-value">{vendors.length}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <FaUserCheck className="stat-icon" style={{ color: '#7C9A5E' }} />
                <div className="stat-label">Pending Verification</div>
                <div className="stat-value">{pendingVendors.length}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <FaShoppingCart className="stat-icon" style={{ color: '#D4A837' }} />
                <div className="stat-label">Total Orders</div>
                <div className="stat-value">{orders.length}</div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {/* Pending Vendors Section */}
            <div className="col-lg-6">
              <div className="admin-card">
                <div className="card-header">
                  <h4>Pending Vendors</h4>
                </div>
                <div className="card-body p-0">
                  {pendingVendors.length === 0 ? (
                    <div className="empty-state-admin">
                      <FaCheckCircle size={40} />
                      <p>No pending verifications</p>
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {pendingVendors.map(v => (
                        <div key={v.id} className="admin-list-item">
                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                            <div>
                              <div className="item-title">{v.store_name || v.name}</div>
                              <div className="item-sub">{v.email} • {v.city}, {v.country}</div>
                            </div>
                            <button 
                              className="btn btn-verify"
                              onClick={() => verifyVendor(v.id)}
                            >
                              Verify Vendor
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="col-lg-6">
              <div className="admin-card">
                <div className="card-header">
                  <h4>Recent Orders</h4>
                </div>
                <div className="card-body p-0">
                  {orders.length === 0 ? (
                    <div className="empty-state-admin">
                      <FaShoppingCart size={40} />
                      <p>No orders yet</p>
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {orders.slice(0, 10).map(order => (
                        <div key={order.id} className="admin-list-item">
                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                            <div>
                              <div className="item-title">Order #{order.id}</div>
                              <div className="item-sub">
                                ${parseFloat(order.total).toFixed(2)} • Status: 
                                <span className={`badge-status ${order.status === 'delivered' ? 'badge-delivered' : 'badge-processing'}`}>
                                  {order.status || 'Processing'}
                                </span>
                              </div>
                            </div>
                            <button 
                              className="btn btn-outline-gold-admin"
                              onClick={() => window.location.href = `/orders/${order.id}`}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                      {orders.length > 10 && (
                        <div className="text-center p-3" style={{ color: '#B0C0A8' }}>
                          <small>Showing 10 of {orders.length} orders</small>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;