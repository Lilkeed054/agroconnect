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
      <div className="spinner-border" style={{ color: '#D4A837' }} role="status">
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
    <>
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
        
        .detail-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.12);
          border-radius: 1.5rem;
          box-shadow: 0 15px 30px rgba(0,0,0,0.5);
        }
        .detail-card:hover {
          border-color: rgba(212, 168, 55, 0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.7);
        }
        .badge-dark {
          background: #1A2A1A;
          color: #D4A837;
          border: 1px solid rgba(212, 168, 55, 0.15);
        }
        .chip-dark {
          background: #1A2A1A;
          border: 1px solid rgba(212, 168, 55, 0.1);
          color: #B0C0A8;
        }
        .btn-back {
          color: #D4A837;
          transition: all 0.2s;
        }
        .btn-back:hover {
          color: #C49A2E;
          transform: translateX(-4px);
        }
        .btn-gold {
          background: #D4A837;
          color: #0A120A;
          border: none;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .btn-gold:hover {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
        .btn-outline-gold {
          background: transparent;
          border: 2px solid #D4A837;
          color: #D4A837;
          transition: all 0.25s ease;
        }
        .btn-outline-gold:hover {
          background: #D4A837;
          color: #0A120A;
          transform: translateY(-2px);
        }
        .input-dark-detail {
          background-color: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
        }
        .input-dark-detail:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
          background-color: #1A2A1A !important;
          color: #D0D8C8 !important;
        }
        .input-dark-detail::placeholder {
          color: #6A7A62 !important;
        }
        .text-gold { color: #D4A837; }
        .text-moss { color: #7C9A5E; }
        .text-sage { color: #B0C0A8; }
        .text-light-sage { color: #D0D8C8; }
        .bg-dark-card { background: #0A120A; }
        .hr-gold { border-color: rgba(212, 168, 55, 0.15); }
      `}</style>

      <div className="container py-5" style={{ color: '#D0D8C8' }}>
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-link text-decoration-none mb-4 d-inline-flex align-items-center gap-1 btn-back"
        >
          <FaArrowLeft /> Back to products
        </button>

        <div className="row g-5">
          {/* Product Image */}
          <div className="col-md-6 animate-slide-right">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden detail-card">
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
                className="badge rounded-pill px-3 py-2 mb-2 badge-dark"
              >
                {product.category || 'Fresh'}
              </span>
              <h1 className="display-5 fw-bold text-gold">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < product.rating ? 'text-warning' : 'text-secondary'} />
                ))}
              </div>
              <span className="text-sage">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <h2 className="mb-3 text-gold" style={{ fontWeight: 700 }}>
              ${product.price} {product.currency}
            </h2>

            {/* Description */}
            <p className="lead text-sage">{product.description}</p>

            {/* Delivery & Guarantee Badges */}
            <div className="d-flex flex-wrap gap-3 my-4">
              <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill chip-dark">
                <FaTruck style={{ color: '#D4A837' }} />
                <small>Free delivery over $50</small>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill chip-dark">
                <FaShieldAlt style={{ color: '#7C9A5E' }} />
                <small>Money back guarantee</small>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="row g-3 mb-3">
              <div className="col-4">
                <label className="form-label fw-semibold text-moss">Quantity</label>
                <input 
                  type="number" 
                  className="form-control rounded-pill input-dark-detail text-center"
                  value={quantity} 
                  min={1} 
                  onChange={e => setQuantity(parseInt(e.target.value) || 1)} 
                />
              </div>
              <div className="col-8">
                <label className="form-label fw-semibold invisible">Action</label>
                <button 
                  className="btn w-100 rounded-pill fw-semibold py-2 btn-gold"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* WhatsApp Chat Button */}
            <button 
              className="btn w-100 rounded-pill py-2 mb-4 d-flex align-items-center justify-content-center gap-2 btn-outline-gold"
            >
              <FaWhatsapp /> Chat with Vendor
            </button>

            <hr className="hr-gold" />

            {/* Vendor Info */}
            <div className="mt-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FaLeaf style={{ color: '#7C9A5E' }} />
                <strong className="text-light-sage">Vendor:</strong>
                <span className="text-sage">{product.vendor_name}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaTruck style={{ color: '#D4A837' }} />
                <strong className="text-light-sage">Location:</strong>
                <span className="text-sage">{product.vendor_city}, {product.vendor_country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;