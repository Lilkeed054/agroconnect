import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaSeedling, FaArrowLeft } from 'react-icons/fa';

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container text-center py-5 my-5">
        <div className="card border-0 shadow-sm rounded-4 p-5" style={{ backgroundColor: '#F9FAFB' }}>
          <FaSeedling size={64} className="mx-auto mb-3" style={{ color: '#B2EC05' }} />
          <h3 className="fw-bold" style={{ color: '#2C3A1F' }}>Your cart is empty</h3>
          <p className="text-muted">Looks like you haven't added any fresh goods yet.</p>
          <Link to="/products" className="btn rounded-pill mt-3 mx-auto" style={{ backgroundColor: '#09F315', color: '#2C3A1F', padding: '10px 30px', border: 'none', fontWeight: 500 }}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/products" className="text-decoration-none" style={{ color: '#09F315' }}>
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>

      <div className="row g-4">
        {/* Cart Items */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3 border-0" style={{ borderBottom: '2px solid #F4E04D' }}>
              <h3 className="fw-bold mb-0" style={{ color: '#2C3A1F' }}>Shopping Cart ({cart.items.length} items)</h3>
            </div>
            <div className="card-body p-0">
              {cart.items.map((item, idx) => (
                <div key={item.id} className={`p-3 ${idx !== cart.items.length - 1 ? 'border-bottom' : ''}`} style={{ borderColor: '#E5E7EB' }}>
                  <div className="row g-3 align-items-center">
                    <div className="col-md-2 col-4">
                      <img 
                        src={item.product.image} 
                        className="img-fluid rounded-3 shadow-sm" 
                        alt={item.product.name}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-5 col-8">
                      <h5 className="fw-semibold mb-1">{item.product.name}</h5>
                      <p className="text-muted mb-0">${item.product.price} each</p>
                    </div>
                    <div className="col-md-3 col-6">
                      <label className="form-label small fw-semibold" style={{ color: '#09F315' }}>Quantity</label>
                      <input 
                        type="number" 
                        className="form-control rounded-pill border-0 shadow-sm text-center"
                        style={{ backgroundColor: '#F9FAFB', width: '100px' }}
                        value={item.quantity} 
                        min={1} 
                        onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)} 
                      />
                    </div>
                    <div className="col-md-2 col-6 text-md-end">
                      <button 
                        className="btn btn-sm rounded-pill px-3"
                        style={{ backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none' }}
                        onClick={() => removeItem(item.id)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
            <div className="card-header bg-white py-3 border-0" style={{ borderBottom: '2px solid #F4E04D' }}>
              <h4 className="fw-bold mb-0" style={{ color: '#2C3A1F' }}>Order Summary</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-semibold">${cart.total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Delivery</span>
                <span className="text-muted">Calculated at checkout</span>
              </div>
              <hr style={{ borderColor: '#F4E04D' }} />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold" style={{ color: '#2C3A1F' }}>Total</span>
                <span className="fw-bold fs-5" style={{ color: '#09F315' }}>${cart.total.toFixed(2)}</span>
              </div>
              <Link 
                to="/checkout" 
                className="btn w-100 rounded-pill py-2 fw-semibold"
                style={{ 
                  background: 'linear-gradient(135deg, #B2EC05, #09F315)', 
                  color: '#2C3A1F',
                  border: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;