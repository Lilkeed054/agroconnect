import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { FaEdit, FaTrash, FaChartLine, FaSeedling, FaBoxOpen, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ sales_today: 0, total_products: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [updatingOrder, setUpdatingOrder] = useState(null);

  useEffect(() => {
    loadProducts();
    loadStats();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getProducts({ vendor_id: user?.id });
      const productList = response?.data ?? response;
      setProducts(Array.isArray(productList) ? productList : []);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await api.getVendorStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const loadOrders = async () => {
    try {
      const data = await api.getOrders('vendor');
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load orders:', err);
      setOrders([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setSubmitting(true);

    try {
      if (editing) {
        await api.updateProduct(editing.id, form);
      } else {
        await api.createProduct(form);
      }
      setShowForm(false);
      setForm({ name: '', price: '', description: '', image: '', category: '' });
      await loadProducts();
      await loadStats();
    } catch (err) {
      console.error('Failed to save product:', err);
      const msg = err.message || 'Failed to save product. Please try again.';
      if (msg.includes(',')) {
        const errors = {};
        msg.split(',').forEach((part) => {
          const [field, ...rest] = part.trim().split(' ');
          errors[field] = rest.join(' ');
        });
        setValidationErrors(errors);
      } else {
        alert(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete product?')) return;
    try {
      await api.deleteProduct(id);
      await loadProducts();
      await loadStats();
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  const markOrderPaid = async (orderId) => {
    if (!confirm('Mark this order as paid?')) return;
    try {
      await api.markOrderPaid(orderId);
      await loadOrders();
    } catch (err) {
      console.error('Failed to mark order as paid:', err);
      alert('Failed to mark order as paid. Please try again.');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.updateOrderStatus(orderId, status);
      await loadOrders();
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update order status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border" style={{ color: '#D4A837' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4 text-center" style={{ color: '#B0C0A8' }}>
        <p>{error}</p>
        <button className="btn btn-gold-dash" onClick={loadProducts}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .card-hover-dash {
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        .card-hover-dash:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px -10px rgba(0,0,0,0.7) !important;
          border-color: rgba(212, 168, 55, 0.3) !important;
        }
        .input-dark-dash {
          background-color: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-dark-dash:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
          background-color: #1A2A1A !important;
          color: #D0D8C8 !important;
        }
        .input-dark-dash::placeholder {
          color: #6A7A62 !important;
        }
        .select-dark-dash {
          background-color: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
        }
        .select-dark-dash:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
        }
        .select-dark-dash option {
          background-color: #1A2A1A;
          color: #D0D8C8;
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
        .btn-moss-dash {
          background: #7C9A5E;
          color: #0A120A;
          border: none;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .btn-moss-dash:hover {
          background: #6A8A4E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(124, 154, 94, 0.3);
          color: #0A120A;
        }
        .btn-outline-gold-dash {
          background: transparent;
          border: 2px solid #D4A837;
          color: #D4A837;
          transition: all 0.25s ease;
        }
        .btn-outline-gold-dash:hover {
          background: #D4A837;
          color: #0A120A;
          transform: translateY(-2px);
        }
        .modal-content-dark {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.15);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .modal-header-dark {
          border-bottom-color: rgba(212, 168, 55, 0.2);
        }
        .modal-footer-dark {
          border-top-color: rgba(212, 168, 55, 0.1);
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
        .badge-paid {
          background: #1A2A1A;
          color: #7C9A5E;
          border: 1px solid rgba(124, 154, 94, 0.3);
        }
        .badge-pending {
          background: #1A2A1A;
          color: #D4A837;
          border: 1px solid rgba(212, 168, 55, 0.2);
        }
        .order-item {
          background: #0A120A;
          border: 1px solid rgba(212, 168, 55, 0.05);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          margin-bottom: 0.25rem;
        }
        .order-item:last-child {
          margin-bottom: 0;
        }
      `}</style>

      <div className="container py-4" style={{ color: '#D0D8C8' }}>
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold" style={{ color: '#D4A837' }}>Vendor Dashboard</h2>
            <p style={{ color: '#B0C0A8' }}>Welcome back, {user?.name}!</p>
          </div>
          <button
            className="btn rounded-pill px-4 fw-semibold btn-gold-dash"
            onClick={() => {
              setEditing(null);
              setForm({ name: '', price: '', description: '', image: '', category: '' });
              setValidationErrors({});
              setShowForm(true);
            }}
          >
            + Add Product
          </button>
        </div>

        {/* Stats Cards – now 4 columns */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card border-0 shadow-lg rounded-4 p-3 text-center h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
              <FaChartLine size={36} className="mx-auto mb-2" style={{ color: '#D4A837' }} />
              <h5 style={{ color: '#B0C0A8' }}>Sales Today</h5>
              <h3 className="fw-bold" style={{ color: '#D4A837' }}>${stats.sales_today}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-lg rounded-4 p-3 text-center h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
              <FaBoxOpen size={36} className="mx-auto mb-2" style={{ color: '#7C9A5E' }} />
              <h5 style={{ color: '#B0C0A8' }}>Total Products</h5>
              <h3 className="fw-bold" style={{ color: '#D4A837' }}>{products.length}</h3>
            </div>
          </div>

          {/* ✅ NEW: Payment Settings Card */}
          <div className="col-md-3">
            <Link to="/vendor/settings" className="text-decoration-none">
              <div className="card border-0 shadow-lg rounded-4 p-3 text-center h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
                <FaCreditCard size={36} className="mx-auto mb-2" style={{ color: '#D4A837' }} />
                <h5 style={{ color: '#B0C0A8' }}>Payment Settings</h5>
                <p className="small" style={{ color: '#6A7A62' }}>Configure how you receive payments</p>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-lg rounded-4 p-3 h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
              <div className="d-flex flex-column justify-content-center h-100">
                <h5 className="fw-semibold mb-1" style={{ color: '#D0D8C8' }}>Current Plan: Starter</h5>
                <small style={{ color: '#B0C0A8' }}>Limited listings · Standard visibility</small>
                <button className="btn rounded-pill btn-sm px-3 btn-gold-dash mt-2">
                  Upgrade to Growth ($19/mo)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <h4 className="fw-bold mb-3" style={{ color: '#D4A837' }}>Your Products</h4>
        {products.length === 0 ? (
          <div className="text-center py-5 rounded-4" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
            <FaSeedling size={48} className="mb-3" style={{ color: '#D4A837' }} />
            <p style={{ color: '#B0C0A8' }}>You haven't added any products yet.</p>
            <button className="btn rounded-pill btn-gold-dash" onClick={() => setShowForm(true)}>
              Add your first product
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {products.map((p) => (
              <div className="col-md-3 col-sm-6" key={p.id}>
                <div className="card border-0 shadow-lg rounded-4 h-100 overflow-hidden card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
                  <img
                    src={p.image || 'https://via.placeholder.com/300'}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h6 className="fw-semibold" style={{ color: '#D0D8C8' }}>{p.name}</h6>
                    <p className="fw-bold mb-0" style={{ color: '#D4A837' }}>${p.price}</p>
                  </div>
                  <div className="card-footer bg-transparent border-0 d-flex gap-2 pb-3" style={{ borderTop: '1px solid rgba(212,168,55,0.05)' }}>
                    <button
                      className="btn btn-sm rounded-pill flex-fill"
                      style={{ background: '#1A2A1A', color: '#D4A837', border: '1px solid rgba(212,168,55,0.15)' }}
                      onClick={() => { setEditing(p); setForm(p); setShowForm(true); setValidationErrors({}); }}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-sm rounded-pill flex-fill"
                      style={{ background: '#2A1A1A', color: '#E87A7A', border: '1px solid rgba(232,122,122,0.2)' }}
                      onClick={() => deleteProduct(p.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders Section */}
        <h4 className="fw-bold mt-5 mb-3" style={{ color: '#D4A837' }}>Recent Orders</h4>
        {orders.length === 0 ? (
          <div className="text-center py-5 rounded-4" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
            <p style={{ color: '#B0C0A8' }}>No orders yet.</p>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div className="col-12" key={order.id}>
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
                  <div className="card-body p-4">
                    {/* Order Header */}
                    <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                      <div>
                        <h5 className="fw-bold mb-1" style={{ color: '#D4A837' }}>Order #{order.id}</h5>
                        <p className="small mb-2" style={{ color: '#B0C0A8' }}>
                          <FaCalendarAlt className="me-1" /> {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <span className={`badge rounded-pill px-3 py-2 ${order.status === 'delivered' ? 'badge-delivered' : 'badge-processing'}`}>
                          {order.status || 'Processing'}
                        </span>
                        <span className={`badge rounded-pill px-3 py-2 ${order.payment_status === 'paid' ? 'badge-paid' : 'badge-pending'}`}>
                          {order.payment_status || 'Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Customer & Delivery Info */}
                    <div className="row g-3 mt-2">
                      <div className="col-md-6">
                        <div className="p-3 rounded-3" style={{ background: '#1A2A1A', border: '1px solid rgba(212,168,55,0.08)' }}>
                          <h6 className="fw-bold" style={{ color: '#D4A837' }}>Customer Details</h6>
                          <p className="mb-0" style={{ color: '#B0C0A8' }}>
                            <strong style={{ color: '#D0D8C8' }}>Name:</strong> {order.user?.name || 'Unknown'}
                          </p>
                          <p className="mb-0" style={{ color: '#B0C0A8' }}>
                            <strong style={{ color: '#D0D8C8' }}>Phone:</strong> {order.user?.phone || 'Not provided'}
                          </p>
                          <p className="mb-0" style={{ color: '#B0C0A8' }}>
                            <strong style={{ color: '#D0D8C8' }}>Email:</strong> {order.user?.email || 'Not provided'}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 rounded-3" style={{ background: '#1A2A1A', border: '1px solid rgba(212,168,55,0.08)' }}>
                          <h6 className="fw-bold" style={{ color: '#D4A837' }}>Delivery Address</h6>
                          <p className="mb-0" style={{ color: '#B0C0A8' }}>
                            {order.address || 'Not provided'}
                          </p>
                          <p className="mb-0" style={{ color: '#B0C0A8' }}>
                            {order.city}, {order.country}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mt-3">
                      <h6 className="fw-bold" style={{ color: '#7C9A5E' }}>Items</h6>
                      {order.items?.map((item) => (
                        <div key={item.id} className="order-item d-flex justify-content-between align-items-center">
                          <span style={{ color: '#D0D8C8' }}>{item.product?.name || 'Product'}</span>
                          <span style={{ color: '#B0C0A8' }}>x{item.quantity} @ ${item.price}</span>
                        </div>
                      ))}
                      <div className="d-flex justify-content-between mt-2 pt-1 border-top" style={{ borderColor: 'rgba(212,168,55,0.05)' }}>
                        <strong style={{ color: '#D0D8C8' }}>Total</strong>
                        <strong style={{ color: '#D4A837' }}>${parseFloat(order.total).toFixed(2)}</strong>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 pt-2 border-top" style={{ borderColor: 'rgba(212,168,55,0.08)' }}>
                      <div className="d-flex flex-wrap gap-2">
                        <select
                          className="form-select form-select-sm rounded-pill select-dark-dash"
                          style={{ width: 'auto', minWidth: '130px' }}
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {order.payment_status !== 'paid' && (
                          <button
                            className="btn btn-sm rounded-pill btn-gold-dash"
                            onClick={() => markOrderPaid(order.id)}
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                      <button
                        className="btn btn-sm rounded-pill btn-outline-gold-dash"
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

        {/* Product Form Modal */}
        {showForm && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg modal-content-dark">
                <div className="modal-header modal-header-dark">
                  <h5 className="fw-bold" style={{ color: '#D4A837' }}>{editing ? 'Edit' : 'Add'} Product</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowForm(false)} />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {validationErrors && Object.keys(validationErrors).length > 0 && (
                      <div className="alert alert-danger" role="alert">
                        <strong>Please fix the following:</strong>
                        <ul>
                          {Object.entries(validationErrors).map(([field, msg]) => (
                            <li key={field}>{field}: {msg}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mb-3">
                      <input
                        className="form-control rounded-pill input-dark-dash"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control rounded-pill input-dark-dash"
                        placeholder="Price (USD)"
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={e => setForm({...form, price: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control rounded-3 input-dark-dash"
                        placeholder="Description"
                        rows="3"
                        value={form.description}
                        onChange={e => setForm({...form, description: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control rounded-pill input-dark-dash"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={e => setForm({...form, image: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-select rounded-pill select-dark-dash"
                        value={form.category}
                        onChange={e => setForm({...form, category: e.target.value})}
                        required
                      >
                        <option value="">Select category</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="dairy">Dairy</option>
                        <option value="handmade">Handmade</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer modal-footer-dark">
                    <button type="button" className="btn rounded-pill btn-outline-gold-dash" onClick={() => setShowForm(false)}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn rounded-pill px-4 btn-gold-dash"
                      disabled={submitting}
                    >
                      {submitting ? 'Saving...' : 'Save Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VendorDashboard;