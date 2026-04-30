import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { FaStar, FaTruck, FaShieldAlt, FaWhatsapp, FaLeaf, FaArrowLeft } from 'react-icons/fa';
import { mockProducts } from '../utils/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const found = mockProducts.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) return (
    <div className="container text-center mt-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const handleAddToCart = async () => {
    if (!user) return navigate('/login');
    await addToCart(product.id, quantity);
    alert('Added to cart');
  };

  return (
    <div className="container py-5">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-link text-decoration-none mb-4 d-inline-flex align-items-center gap-1"
        style={{ color: '#09F315' }}
      >
        <FaArrowLeft /> Back to products
      </button>

      <div className="row g-5">
        {/* Product Image */}
        <div className="col-md-6 animate-slide-right">
          <div className="card border-0 shadow rounded-4 overflow-hidden">
            <img 
              src={product.image} 
              className="img-fluid w-100" 
              alt={product.name}
              style={{ objectFit: 'cover', height: '400px' }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6 animate-slide-left">
          <div className="mb-3">
            <span 
              className="badge rounded-pill px-3 py-2 mb-2"
              style={{ backgroundColor: '#B2EC05', color: '#2C3A1F' }}
            >
              {product.category || 'Fresh'}
            </span>
            <h1 className="display-5 fw-bold" style={{ color: '#2C3A1F' }}>{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="d-flex align-items-center gap-2 mb-3">
            <div className="d-flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < product.rating ? 'text-warning' : 'text-secondary'} />
              ))}
            </div>
            <span className="text-muted">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <h2 className="mb-3" style={{ color: '#09F315', fontWeight: 700 }}>
            ${product.price} {product.currency}
          </h2>

          {/* Description */}
          <p className="lead text-muted">{product.description}</p>

          {/* Delivery & Guarantee Badges */}
          <div className="d-flex flex-wrap gap-3 my-4">
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
              <FaTruck style={{ color: '#F4E04D' }} />
              <small>Free delivery over $50</small>
            </div>
            <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
              <FaShieldAlt style={{ color: '#B2EC05' }} />
              <small>Money back guarantee</small>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="row g-3 mb-3">
            <div className="col-4">
              <label className="form-label fw-semibold" style={{ color: '#09F315' }}>Quantity</label>
              <input 
                type="number" 
                className="form-control rounded-pill border-0 shadow-sm text-center"
                style={{ backgroundColor: '#F9FAFB' }}
                value={quantity} 
                min={1} 
                onChange={e => setQuantity(parseInt(e.target.value) || 1)} 
              />
            </div>
            <div className="col-8">
              <label className="form-label fw-semibold invisible">Action</label>
              <button 
                className="btn w-100 rounded-pill fw-semibold py-2"
                style={{ 
                  background: 'linear-gradient(135deg, #B2EC05, #09F315)', 
                  color: '#2C3A1F',
                  border: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* WhatsApp Chat Button */}
          <button 
            className="btn btn-outline-success w-100 rounded-pill py-2 mb-4 d-flex align-items-center justify-content-center gap-2"
            style={{ borderColor: '#09F315', color: '#09F315' }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#09F315';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#09F315';
            }}
          >
            <FaWhatsapp /> Chat with Vendor
          </button>

          <hr style={{ borderColor: '#F4E04D' }} />

          {/* Vendor Info */}
          <div className="mt-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaLeaf style={{ color: '#B2EC05' }} />
              <strong style={{ color: '#2C3A1F' }}>Vendor:</strong>
              <span>{product.vendor_name}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaTruck style={{ color: '#F4E04D' }} />
              <strong style={{ color: '#2C3A1F' }}>Location:</strong>
              <span>{product.vendor_city}, {product.vendor_country}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inline animations */}
      <style>{`
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-right { animation: slideRight 0.5s ease-out forwards; }
        .animate-slide-left { animation: slideLeft 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ProductDetail;