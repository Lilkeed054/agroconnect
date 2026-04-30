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
    <div className="container py-4">
      <div className="row g-4">
        {/* Sidebar Filters – redesigned with brand colors */}
        <div className="col-md-3">
          <div 
            className="card border-0 shadow-sm rounded-4 p-3 sticky-top animate-slide-left" 
            style={{ top: '90px', backgroundColor: '#FFFFFF', transition: 'all 0.3s' }}
          >
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaFilter style={{ color: '#09F315' }} />
              <h5 className="fw-bold mb-0" style={{ color: '#2C3A1F' }}>Filters</h5>
            </div>
            <hr className="my-2" style={{ borderColor: '#F4E04D' }} />
            
            <label className="fw-semibold mb-2" style={{ color: '#09F315' }}>Category</label>
            <select 
              className="form-select rounded-pill mb-3 border-0 shadow-sm" 
              style={{ backgroundColor: '#F9FAFB' }}
              value={category} 
              onChange={e => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="dairy">Dairy</option>
              <option value="handmade">Handmade</option>
            </select>
            
            <label className="fw-semibold mb-2" style={{ color: '#09F315' }}>Price Range</label>
            <select 
              className="form-select rounded-pill border-0 shadow-sm" 
              style={{ backgroundColor: '#F9FAFB' }}
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
              <FaSeedling size={28} style={{ color: '#B2EC05' }} />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
            <h3 className="fw-bold" style={{ color: '#2C3A1F' }}>
              Fresh products near <span style={{ color: '#09F315' }}>{city}</span>
            </h3>
            <div className="btn-group shadow-sm">
              <button 
                className={`btn rounded-pill rounded-end-0 ${view === 'grid' ? 'btn-active' : 'btn-outline-secondary'}`}
                style={{
                  backgroundColor: view === 'grid' ? '#B2EC05' : 'white',
                  color: view === 'grid' ? '#2C3A1F' : '#6C757D',
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.2s'
                }}
                onClick={() => setView('grid')}
              >
                <FaList className="me-1" /> Grid
              </button>
              <button 
                className={`btn rounded-pill rounded-start-0 ${view === 'map' ? 'btn-active' : 'btn-outline-secondary'}`}
                style={{
                  backgroundColor: view === 'map' ? '#B2EC05' : 'white',
                  color: view === 'map' ? '#2C3A1F' : '#6C757D',
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.2s'
                }}
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
                <div className="text-center py-5 bg-light rounded-4">
                  <FaSeedling size={48} className="mb-3" style={{ color: '#B2EC05' }} />
                  <h5>No products found</h5>
                  <p className="text-muted">Try adjusting your filters</p>
                </div>
              )}
            </div>
          ) : (
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden animate-scale-in">
              <MapView products={filtered} center={coordinates} />
            </div>
          )}
        </div>
      </div>

      {/* Inline animations for consistency */}
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
      `}</style>
    </div>
  );
};

export default Products;