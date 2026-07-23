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
            onClick={() => { setEditing(null); setForm({ name: '', price: '', description: '', image: '', category: '' }); setShowForm(true); }}
          >
            + Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card border-0 shadow-lg rounded-4 p-3 text-center h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
              <FaChartLine size={36} className="mx-auto mb-2" style={{ color: '#D4A837' }} />
              <h5 style={{ color: '#B0C0A8' }}>Sales Today</h5>
              <h3 className="fw-bold" style={{ color: '#D4A837' }}>$342</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-lg rounded-4 p-3 text-center h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
              <FaBoxOpen size={36} className="mx-auto mb-2" style={{ color: '#7C9A5E' }} />
              <h5 style={{ color: '#B0C0A8' }}>Total Products</h5>
              <h3 className="fw-bold" style={{ color: '#D4A837' }}>{products.length}</h3>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-lg rounded-4 p-3 h-100 card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <h5 className="fw-semibold mb-1" style={{ color: '#D0D8C8' }}>Current Plan: Starter</h5>
                  <small style={{ color: '#B0C0A8' }}>Limited listings · Standard visibility</small>
                </div>
                <button 
                  className="btn rounded-pill btn-sm px-3 btn-gold-dash"
                >
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
            <button 
              className="btn rounded-pill btn-gold-dash"
              onClick={() => setShowForm(true)}
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {products.map(p => (
              <div className="col-md-3 col-sm-6" key={p.id}>
                <div className="card border-0 shadow-lg rounded-4 h-100 overflow-hidden card-hover-dash" style={{ background: '#162016', border: '1px solid rgba(212,168,55,0.08)' }}>
                  <img 
                    src={p.image} 
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
                      onClick={() => { setEditing(p); setForm(p); setShowForm(true); }}
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

        {/* Product Form Modal */}
        {showForm && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow-lg modal-content-dark">
                <div className="modal-header modal-header-dark">
                  <h5 className="fw-bold" style={{ color: '#D4A837' }}>{editing ? 'Edit' : 'Add'} Product</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowForm(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
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
                      >
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="dairy">Dairy</option>
                        <option value="handmade">Handmade</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer modal-footer-dark">
                    <button type="button" className="btn rounded-pill btn-outline-gold-dash" onClick={() => setShowForm(false)}>Cancel</button>
                    <button 
                      type="submit" 
                      className="btn rounded-pill px-4 btn-gold-dash"
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
    </>
  );
};

export default VendorDashboard;