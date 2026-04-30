import { Link } from 'react-router-dom';
import { FaStore, FaCheckCircle } from 'react-icons/fa';

const VendorCard = ({ vendor }) => {
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
      <div className="card-body p-3">
        <div className="d-flex align-items-center gap-3 mb-2">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{ 
              width: '56px', 
              height: '56px', 
              backgroundColor: '#B2EC05'
            }}
          >
            <FaStore size={28} style={{ color: '#2C3A1F' }} />
          </div>
          <div>
            <h5 className="fw-semibold mb-0" style={{ color: '#2C3A1F' }}>
              {vendor.store_name} 
              {vendor.verified && (
                <FaCheckCircle className="ms-1" style={{ color: '#09F315' }} />
              )}
            </h5>
            <p className="text-muted small mb-0">{vendor.product_count} products</p>
          </div>
        </div>
        <p className="mt-2 text-muted small" style={{ lineHeight: '1.4' }}>
          {vendor.description?.slice(0, 100)}
          {vendor.description?.length > 100 && '...'}
        </p>
      </div>
      <div className="card-footer bg-transparent border-0 pb-3 pt-0 px-3">
        <Link 
          to={`/vendor/${vendor.id}`} 
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
          Visit Store →
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;