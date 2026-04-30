import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { FaEdit, FaTrash, FaChartLine, FaSeedling, FaBoxOpen } from 'react-icons/fa';
import { Chart } from 'react-google-charts';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', category: '' });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await api.getProducts({ vendor_id: user.id });
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) await api.updateProduct(editing.id, form);
    else await api.createProduct(form);
    setShowForm(false);
    loadProducts();
  };

  const deleteProduct = async (id) => {
    if (confirm('Delete product?')) await api.deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold" style={{ color: '#2C3A1F' }}>Vendor Dashboard</h2>
          <p className="text-muted">Welcome back, {user?.name}!</p>
        </div>
        <button 
          className="btn rounded-pill px-4 fw-semibold"
          style={{ 
            backgroundColor: '#09F315', 
            color: '#2C3A1F', 
            border: 'none',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#B2EC05'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#09F315'; e.currentTarget.style.transform = 'translateY(0)'; }}
          onClick={() => { setEditing(null); setForm({ name: '', price: '', description: '', image: '', category: '' }); setShowForm(true); }}
        >
          + Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <FaChartLine size={36} className="mx-auto mb-2" style={{ color: '#F4E04D' }} />
            <h5 className="text-muted">Sales Today</h5>
            <h3 className="fw-bold" style={{ color: '#09F315' }}>$342</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
            <FaBoxOpen size={36} className="mx-auto mb-2" style={{ color: '#B2EC05' }} />
            <h5 className="text-muted">Total Products</h5>
            <h3 className="fw-bold" style={{ color: '#09F315' }}>{products.length}</h3>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h5 className="fw-semibold mb-1" style={{ color: '#2C3A1F' }}>Current Plan: Starter</h5>
                <small className="text-muted">Limited listings · Standard visibility</small>
              </div>
              <button 
                className="btn rounded-pill btn-sm px-3"
                style={{ backgroundColor: '#F4E04D', color: '#2C3A1F', border: 'none' }}
              >
                Upgrade to Growth ($19/mo)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <h4 className="fw-bold mb-3" style={{ color: '#2C3A1F' }}>Your Products</h4>
      {products.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <FaSeedling size={48} className="mb-3" style={{ color: '#B2EC05' }} />
          <p className="text-muted">You haven't added any products yet.</p>
          <button 
            className="btn rounded-pill"
            style={{ backgroundColor: '#09F315', color: '#2C3A1F' }}
            onClick={() => setShowForm(true)}
          >
            Add your first product
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {products.map(p => (
            <div className="col-md-3 col-sm-6" key={p.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                <img 
                  src={p.image} 
                  className="card-img-top" 
                  alt={p.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h6 className="fw-semibold">{p.name}</h6>
                  <p className="text-success fw-bold mb-0">${p.price}</p>
                </div>
                <div className="card-footer bg-white border-0 d-flex gap-2 pb-3">
                  <button 
                    className="btn btn-sm rounded-pill flex-fill"
                    style={{ backgroundColor: '#F9FAFB', color: '#09F315', border: '1px solid #E5E7EB' }}
                    onClick={() => { setEditing(p); setForm(p); setShowForm(true); }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button 
                    className="btn btn-sm rounded-pill flex-fill"
                    style={{ backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none' }}
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

      {/* Product Form Modal */}
      {showForm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header" style={{ borderBottomColor: '#F4E04D' }}>
                <h5 className="fw-bold" style={{ color: '#2C3A1F' }}>{editing ? 'Edit' : 'Add'} Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <input 
                      className="form-control rounded-pill border-0 shadow-sm" 
                      style={{ backgroundColor: '#F9FAFB' }}
                      placeholder="Product Name" 
                      value={form.name} 
                      onChange={e => setForm({...form, name: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      className="form-control rounded-pill border-0 shadow-sm" 
                      style={{ backgroundColor: '#F9FAFB' }}
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
                      className="form-control rounded-3 border-0 shadow-sm" 
                      style={{ backgroundColor: '#F9FAFB' }}
                      placeholder="Description" 
                      rows="3"
                      value={form.description} 
                      onChange={e => setForm({...form, description: e.target.value})} 
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      className="form-control rounded-pill border-0 shadow-sm" 
                      style={{ backgroundColor: '#F9FAFB' }}
                      placeholder="Image URL" 
                      value={form.image} 
                      onChange={e => setForm({...form, image: e.target.value})} 
                    />
                  </div>
                  <div className="mb-3">
                    <select 
                      className="form-select rounded-pill border-0 shadow-sm" 
                      style={{ backgroundColor: '#F9FAFB' }}
                      value={form.category} 
                      onChange={e => setForm({...form, category: e.target.value})}
                    >
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="dairy">Dairy</option>
                      <option value="handmade">Handmade</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer" style={{ borderTopColor: '#E5E7EB' }}>
                  <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={() => setShowForm(false)}>Cancel</button>
                  <button 
                    type="submit" 
                    className="btn rounded-pill px-4"
                    style={{ backgroundColor: '#09F315', color: '#2C3A1F' }}
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;