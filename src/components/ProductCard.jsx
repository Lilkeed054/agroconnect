import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div 
      className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm"
      style={{ 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 25px -12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
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
          <h5 className="card-title fw-semibold mb-0" style={{ color: '#2C3A1F' }}>{product.name}</h5>
          <span 
            className="badge rounded-pill px-2 py-1 fw-semibold"
            style={{ backgroundColor: '#B2EC05', color: '#2C3A1F' }}
          >
            {product.price} {product.currency}
          </span>
        </div>
        <p className="card-text text-muted small mb-2">
          {product.description?.slice(0, 80)}...
        </p>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex align-items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={12} className={i < product.rating ? 'text-warning' : 'text-secondary'} />
            ))}
            <span className="ms-1 text-muted small">({product.reviews})</span>
          </div>
          <div className="small text-muted d-flex align-items-center gap-1">
            <FaMapMarkerAlt style={{ color: '#09F315' }} size={10} />
            <span>{product.vendor_city}, {product.vendor_country}</span>
          </div>
        </div>
      </div>
      <div className="card-footer bg-transparent border-0 pb-3 pt-0 px-3">
        <Link 
          to={`/product/${product.id}`} 
          className="btn w-100 rounded-pill fw-semibold"
          style={{ 
            backgroundColor: '#09F315', 
            color: '#2C3A1F',
            border: 'none',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#F4E04D';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#09F315';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;