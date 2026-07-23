import { Link } from 'react-router-dom';
import { FaStore, FaCheckCircle } from 'react-icons/fa';

const VendorCard = ({ vendor }) => {
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
      <div className="card-body p-3">
        <div className="d-flex align-items-center gap-3 mb-2">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{ 
              width: '56px', 
              height: '56px', 
              backgroundColor: '#1A2A1A',
              border: '1px solid rgba(212, 168, 55, 0.15)'
            }}
          >
            <FaStore size={28} style={{ color: '#D4A837' }} />
          </div>
          <div>
            <h5 className="fw-semibold mb-0" style={{ color: '#D0D8C8' }}>
              {vendor.store_name} 
              {vendor.verified && (
                <FaCheckCircle className="ms-1" style={{ color: '#7C9A5E' }} />
              )}
            </h5>
            <p className="small mb-0" style={{ color: '#B0C0A8' }}>{vendor.product_count} products</p>
          </div>
        </div>
        <p className="mt-2 small" style={{ color: '#B0C0A8', lineHeight: '1.4' }}>
          {vendor.description?.slice(0, 100)}
          {vendor.description?.length > 100 && '...'}
        </p>
      </div>
      <div className="card-footer bg-transparent border-0 pb-3 pt-0 px-3" style={{ borderTop: '1px solid rgba(212,168,55,0.05)' }}>
        <Link 
          to={`/vendor/${vendor.id}`} 
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
          Visit Store →
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;