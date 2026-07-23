import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div 
      className="card h-100 border-0 rounded-4 overflow-hidden shadow-lg"
      style={{ 
        background: '#162016',
        border: '1px solid rgba(212, 168, 55, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'pointer',
        boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 30px -8px rgba(0,0,0,0.7)';
        e.currentTarget.style.borderColor = 'rgba(212, 168, 55, 0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
        e.currentTarget.style.borderColor = 'rgba(212, 168, 55, 0.08)';
      }}
    >
      <img 
        src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'} 
        className="card-img-top" 
        alt={product.name} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-semibold mb-0" style={{ color: '#D0D8C8' }}>{product.name}</h5>
          <span 
            className="badge rounded-pill px-2 py-1 fw-semibold"
            style={{ backgroundColor: '#D4A837', color: '#0A120A' }}
          >
            {product.price} {product.currency}
          </span>
        </div>
        <p className="card-text small mb-2" style={{ color: '#B0C0A8' }}>
          {product.description?.slice(0, 80)}...
        </p>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex align-items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={12} className={i < product.rating ? 'text-warning' : 'text-secondary'} />
            ))}
            <span className="ms-1 small" style={{ color: '#B0C0A8' }}>({product.reviews})</span>
          </div>
          <div className="small d-flex align-items-center gap-1" style={{ color: '#B0C0A8' }}>
            <FaMapMarkerAlt style={{ color: '#D4A837' }} size={10} />
            <span>{product.vendor_city}, {product.vendor_country}</span>
          </div>
        </div>
      </div>
      <div className="card-footer bg-transparent border-0 pb-3 pt-0 px-3" style={{ borderTop: '1px solid rgba(212,168,55,0.05)' }}>
        <Link 
          to={`/product/${product.id}`} 
          className="btn w-100 rounded-pill fw-semibold"
          style={{ 
            backgroundColor: '#D4A837', 
            color: '#0A120A',
            border: 'none',
            transition: 'all 0.25s ease',
            padding: '0.5rem 0'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#C49A2E';
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 168, 55, 0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#D4A837';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;