import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaSeedling, FaArrowLeft } from 'react-icons/fa';

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart();

  if (cart.items.length === 0) {
    return (
      <>
        <style>{`
          .empty-cart-card {
            background: #162016;
            border: 1px solid rgba(212, 168, 55, 0.12);
            box-shadow: 0 15px 30px rgba(0,0,0,0.5);
            border-radius: 1.5rem;
            padding: 3rem 2rem;
          }
          .empty-cart-card h3 {
            color: #D4A837;
          }
          .empty-cart-card p {
            color: #B0C0A8;
          }
          .btn-gold-empty {
            background: #D4A837;
            color: #0A120A;
            border: none;
            font-weight: 600;
            transition: all 0.25s ease;
            padding: 0.6rem 2rem;
          }
          .btn-gold-empty:hover {
            background: #C49A2E;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
            color: #0A120A;
          }
        `}</style>
        <div className="container text-center py-5 my-5">
          <div className="empty-cart-card">
            <FaSeedling size={64} className="mx-auto mb-3" style={{ color: '#D4A837' }} />
            <h3 className="fw-bold">Your cart is empty</h3>
            <p>Looks like you haven't added any fresh goods yet.</p>
            <Link to="/products" className="btn rounded-pill mt-3 mx-auto btn-gold-empty">
              Start Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .cart-page {
          background: #0A120A;
          min-height: 90vh;
          padding: 2rem 0;
          color: #D0D8C8;
        }
        .cart-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.12);
          border-radius: 1.5rem;
          box-shadow: 0 12px 24px -8px rgba(0,0,0,0.6);
          overflow: hidden;
        }
        .cart-card .card-header {
          background: transparent;
          border-bottom: 2px solid rgba(212, 168, 55, 0.2);
          padding: 1rem 1.5rem;
        }
        .cart-card .card-header h3 {
          color: #D4A837;
          font-weight: 700;
        }
        .cart-item {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(212, 168, 55, 0.08);
        }
        .cart-item:last-child {
          border-bottom: none;
        }
        .cart-item .product-name {
          color: #D0D8C8;
          font-weight: 600;
        }
        .cart-item .product-price {
          color: #B0C0A8;
        }
        .cart-item .quantity-label {
          color: #7C9A5E;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .input-dark-cart {
          background: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
          width: 80px;
          text-align: center;
          border-radius: 2rem !important;
        }
        .input-dark-cart:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
          background: #1A2A1A !important;
          color: #D0D8C8 !important;
        }
        .btn-remove {
          background: #2A1A1A;
          color: #E87A7A;
          border: 1px solid rgba(232, 122, 122, 0.2);
          border-radius: 2rem;
          padding: 0.3rem 1rem;
          transition: all 0.2s;
        }
        .btn-remove:hover {
          background: #3A1A1A;
          color: #FF6B6B;
          transform: translateY(-1px);
        }
        .summary-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.12);
          border-radius: 1.5rem;
          box-shadow: 0 12px 24px -8px rgba(0,0,0,0.6);
          position: sticky;
          top: 100px;
        }
        .summary-card .card-header {
          background: transparent;
          border-bottom: 2px solid rgba(212, 168, 55, 0.2);
          padding: 1rem 1.5rem;
        }
        .summary-card .card-header h4 {
          color: #D4A837;
          font-weight: 700;
        }
        .summary-card .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.25rem 0;
          color: #B0C0A8;
        }
        .summary-card .summary-total {
          border-top: 1px solid rgba(212, 168, 55, 0.15);
          padding-top: 0.75rem;
          margin-top: 0.5rem;
        }
        .summary-card .summary-total .total-label {
          color: #D0D8C8;
          font-weight: 700;
        }
        .summary-card .summary-total .total-amount {
          color: #D4A837;
          font-weight: 700;
          font-size: 1.25rem;
        }
        .btn-checkout {
          background: #D4A837;
          color: #0A120A;
          border: none;
          font-weight: 600;
          padding: 0.6rem 0;
          border-radius: 2rem;
          transition: all 0.25s ease;
          width: 100%;
        }
        .btn-checkout:hover {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
        .back-link {
          color: #D4A837;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }
        .back-link:hover {
          color: #C49A2E;
          transform: translateX(-4px);
        }
        .hr-gold-light {
          border-color: rgba(212, 168, 55, 0.1);
        }
      `}</style>

      <div className="cart-page">
        <div className="container">
          <div className="d-flex align-items-center gap-3 mb-4">
            <Link to="/products" className="back-link">
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>

          <div className="row g-4">
            {/* Cart Items */}
            <div className="col-md-8">
              <div className="cart-card">
                <div className="card-header">
                  <h3 className="mb-0">Shopping Cart ({cart.items.length} items)</h3>
                </div>
                <div className="card-body p-0">
                  {cart.items.map((item, idx) => (
                    <div key={item.id} className="cart-item">
                      <div className="row g-3 align-items-center">
                        <div className="col-md-2 col-4">
                          <img 
                            src={item.product.image} 
                            className="img-fluid rounded-3 shadow-sm" 
                            alt={item.product.name}
                            style={{ width: '80px', height: '80px', objectFit: 'cover', background: '#1A2A1A' }}
                          />
                        </div>
                        <div className="col-md-5 col-8">
                          <h5 className="product-name mb-1">{item.product.name}</h5>
                          <p className="product-price mb-0">${item.product.price} each</p>
                        </div>
                        <div className="col-md-3 col-6">
                          <label className="quantity-label">Quantity</label>
                          <input 
                            type="number" 
                            className="form-control input-dark-cart"
                            value={item.quantity} 
                            min={1} 
                            onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)} 
                          />
                        </div>
                        <div className="col-md-2 col-6 text-md-end">
                          <button 
                            className="btn btn-remove"
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
              <div className="summary-card">
                <div className="card-header">
                  <h4 className="mb-0">Order Summary</h4>
                </div>
                <div className="card-body p-4">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span className="fw-semibold">${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery</span>
                    <span className="text-muted">Calculated at checkout</span>
                  </div>
                  <hr className="hr-gold-light" />
                  <div className="summary-total">
                    <div className="summary-row">
                      <span className="total-label">Total</span>
                      <span className="total-amount">${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link 
                    to="/checkout" 
                    className="btn btn-checkout mt-3"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;