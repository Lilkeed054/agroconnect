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
    // Refresh vendors list
    api.get('/admin/vendors').then(setVendors);
  };

  const pendingVendors = vendors.filter(v => !v.verified);
  const verifiedVendors = vendors.filter(v => v.verified);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-5">
        <h2 className="fw-bold" style={{ color: '#2C3A1F' }}>Admin Dashboard</h2>
        <p className="text-muted">Manage vendors, orders, and platform activity</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <FaStore size={36} className="mx-auto mb-2" style={{ color: '#F4E04D' }} />
            <h5 className="text-muted">Total Vendors</h5>
            <h3 className="fw-bold" style={{ color: '#09F315' }}>{vendors.length}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <FaUserCheck size={36} className="mx-auto mb-2" style={{ color: '#B2EC05' }} />
            <h5 className="text-muted">Pending Verification</h5>
            <h3 className="fw-bold" style={{ color: '#F4E04D' }}>{pendingVendors.length}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <FaShoppingCart size={36} className="mx-auto mb-2" style={{ color: '#09F315' }} />
            <h5 className="text-muted">Total Orders</h5>
            <h3 className="fw-bold" style={{ color: '#09F315' }}>{orders.length}</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Pending Vendors Section */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3 border-0" style={{ borderBottom: '2px solid #F4E04D' }}>
              <h4 className="fw-bold mb-0" style={{ color: '#2C3A1F' }}>Pending Vendors</h4>
            </div>
            <div className="card-body p-0">
              {pendingVendors.length === 0 ? (
                <div className="text-center py-5">
                  <FaCheckCircle size={40} className="mb-3" style={{ color: '#B2EC05' }} />
                  <p className="text-muted">No pending verifications</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {pendingVendors.map(v => (
                    <div key={v.id} className="list-group-item p-3">
                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <div>
                          <h6 className="fw-semibold mb-1">{v.store_name || v.name}</h6>
                          <small className="text-muted">{v.email} • {v.city}, {v.country}</small>
                        </div>
                        <button 
                          className="btn btn-sm rounded-pill px-3"
                          style={{ backgroundColor: '#09F315', color: '#2C3A1F', border: 'none' }}
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
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3 border-0" style={{ borderBottom: '2px solid #F4E04D' }}>
              <h4 className="fw-bold mb-0" style={{ color: '#2C3A1F' }}>Recent Orders</h4>
            </div>
            <div className="card-body p-0">
              {orders.length === 0 ? (
                <div className="text-center py-5">
                  <FaShoppingCart size={40} className="mb-3" style={{ color: '#B2EC05' }} />
                  <p className="text-muted">No orders yet</p>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {orders.slice(0, 10).map(order => (
                    <div key={order.id} className="list-group-item p-3">
                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <div>
                          <h6 className="fw-semibold mb-1">Order #{order.id}</h6>
                          <small className="text-muted">
                            ${parseFloat(order.total).toFixed(2)} • Status: 
                            <span 
                              className="badge rounded-pill ms-1"
                              style={{ 
                                backgroundColor: order.status === 'delivered' ? '#B2EC05' : '#F4E04D',
                                color: '#2C3A1F'
                              }}
                            >
                              {order.status || 'Processing'}
                            </span>
                          </small>
                        </div>
                        <button 
                          className="btn btn-sm btn-outline rounded-pill"
                          style={{ borderColor: '#09F315', color: '#09F315' }}
                          onClick={() => window.location.href = `/orders/${order.id}`}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                  {orders.length > 10 && (
                    <div className="text-center p-3">
                      <small className="text-muted">Showing 10 of {orders.length} orders</small>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;