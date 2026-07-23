import { useState, useEffect } from 'react';
import { useLocation } from '../contexts/LocationContext';
import ProductCard from '../components/ProductCard';
import MapView from '../components/MapView';
import { FaFilter, FaMap, FaList, FaSeedling } from 'react-icons/fa';
import { mockProducts } from '../utils/mockData';

const Products = () => {
  const { coordinates, city } = useLocation();
  const [view, setView] = useState('grid');
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    setProducts(mockProducts);
    setFiltered(mockProducts);
  }, [coordinates]);

  useEffect(() => {
    let result = products;
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (priceRange === 'low') result = result.filter(p => p.price < 10);
    else if (priceRange === 'mid') result = result.filter(p => p.price >= 10 && p.price <= 30);
    else if (priceRange === 'high') result = result.filter(p => p.price > 30);
    setFiltered(result);
  }, [category, priceRange, products]);

  return (
    <>
      <style>{`
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-left { animation: slideLeft 0.5s ease-out forwards; }
        .animate-fade-up { animation: fadeUp 0.5s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.4s ease-out forwards; }
        
        .filter-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.12);
          transition: all 0.3s ease;
        }
        .filter-card:hover {
          border-color: rgba(212, 168, 55, 0.3);
          box-shadow: 0 12px 24px -8px rgba(0,0,0,0.6) !important;
        }
        .input-dark-products {
          background-color: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-dark-products:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
          background-color: #1A2A1A !important;
          color: #D0D8C8 !important;
        }
        .input-dark-products option {
          background-color: #1A2A1A;
          color: #D0D8C8;
        }
        .btn-toggle {
          transition: all 0.2s ease;
          border: 1px solid rgba(212, 168, 55, 0.2);
          background: transparent;
          color: #B0C0A8;
        }
        .btn-toggle:hover {
          background: rgba(212, 168, 55, 0.1);
          color: #D4A837;
        }
        .btn-toggle.active {
          background: #D4A837;
          color: #0A120A;
          border-color: #D4A837;
        }
        .empty-state {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.08);
          border-radius: 1.5rem;
        }
        .map-container {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.08);
          border-radius: 1.5rem;
          overflow: hidden;
        }
      `}</style>

      <div className="container py-4" style={{ color: '#D0D8C8' }}>
        <div className="row g-4">
          {/* Sidebar Filters – dark themed */}
          <div className="col-md-3">
            <div 
              className="card filter-card shadow-lg rounded-4 p-3 sticky-top animate-slide-left" 
              style={{ top: '90px' }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaFilter style={{ color: '#D4A837' }} />
                <h5 className="fw-bold mb-0" style={{ color: '#D4A837' }}>Filters</h5>
              </div>
              <hr className="my-2" style={{ borderColor: 'rgba(212,168,55,0.15)' }} />
              
              <label className="fw-semibold mb-2" style={{ color: '#7C9A5E' }}>Category</label>
              <select 
                className="form-select rounded-pill mb-3 input-dark-products" 
                value={category} 
                onChange={e => setCategory(e.target.value)}
              >
                <option value="all">All</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="dairy">Dairy</option>
                <option value="handmade">Handmade</option>
              </select>
              
              <label className="fw-semibold mb-2" style={{ color: '#7C9A5E' }}>Price Range</label>
              <select 
                className="form-select rounded-pill input-dark-products" 
                value={priceRange} 
                onChange={e => setPriceRange(e.target.value)}
              >
                <option value="all">All</option>
                <option value="low">Under $10</option>
                <option value="mid">$10 – $30</option>
                <option value="high">Above $30</option>
              </select>
              
              {/* Decorative icon */}
              <div className="text-center mt-4">
                <FaSeedling size={28} style={{ color: '#D4A837', opacity: 0.6 }} />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-md-9">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
              <h3 className="fw-bold" style={{ color: '#D4A837' }}>
                Fresh products near <span style={{ color: '#7C9A5E' }}>{city}</span>
              </h3>
              <div className="btn-group shadow-sm">
                <button 
                  className={`btn rounded-pill rounded-end-0 btn-toggle ${view === 'grid' ? 'active' : ''}`}
                  onClick={() => setView('grid')}
                >
                  <FaList className="me-1" /> Grid
                </button>
                <button 
                  className={`btn rounded-pill rounded-start-0 btn-toggle ${view === 'map' ? 'active' : ''}`}
                  onClick={() => setView('map')}
                >
                  <FaMap className="me-1" /> Map
                </button>
              </div>
            </div>

            {view === 'grid' ? (
              <div className="row g-4">
                {filtered.length > 0 ? (
                  filtered.map(product => (
                    <div className="col-md-6 col-lg-4 animate-fade-up" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="empty-state text-center py-5">
                    <FaSeedling size={48} className="mb-3" style={{ color: '#D4A837' }} />
                    <h5 style={{ color: '#D0D8C8' }}>No products found</h5>
                    <p style={{ color: '#B0C0A8' }}>Try adjusting your filters</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="map-container shadow-lg">
                <MapView products={filtered} center={coordinates} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;