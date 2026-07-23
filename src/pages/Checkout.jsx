import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useLocation } from '../contexts/LocationContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { FaMapMarkerAlt, FaCreditCard, FaShoppingBag, FaLeaf } from 'react-icons/fa';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { country, city } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const getGateways = () => {
    if (country === 'Zimbabwe') return ['Ecocash', 'Paynow', 'ZIPIT'];
    if (country === 'South Africa') return ['Payfast', 'Paypal'];
    if (country === 'Nigeria') return ['Flutterwave'];
    return ['Stripe', 'Crypto (USDC)'];
  };

  const handleOrder = async () => {
    const orderData = { items: cart.items, total: cart.total, address, payment_gateway: paymentMethod, country, city };
    const order = await api.createOrder(orderData);
    const payment = await api.initiatePayment(order.id, paymentMethod);
    if (payment.redirect_url) window.location.href = payment.redirect_url;
    else {
      clearCart();
      navigate('/customer/dashboard');
    }
  };

  // Calculate delivery fee estimate (optional)
  const deliveryFee = cart.total > 50 ? 0 : 5;
  const orderTotal = cart.total + deliveryFee;

  return (
    <>
      <style>{`
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-left { animation: slideLeft 0.5s ease-out forwards; }
        .animate-slide-right { animation: slideRight 0.5s ease-out forwards; }
        
        .checkout-card {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.12);
          box-shadow: 0 12px 24px -8px rgba(0,0,0,0.6);
          border-radius: 1.5rem;
        }
        .checkout-card:hover {
          border-color: rgba(212, 168, 55, 0.25);
        }
        .checkout-header {
          background: transparent;
          border-bottom: 2px solid rgba(212, 168, 55, 0.2);
          padding: 1rem 1.5rem;
        }
        .input-dark-checkout {
          background-color: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
        }
        .input-dark-checkout:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
          background-color: #1A2A1A !important;
          color: #D0D8C8 !important;
        }
        .input-dark-checkout::placeholder {
          color: #6A7A62 !important;
        }
        .payment-option {
          background: #1A2A1A;
          border: 1px solid rgba(212, 168, 55, 0.08);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .payment-option:hover {
          border-color: rgba(212, 168, 55, 0.3);
        }
        .payment-option.selected {
          border-left: 4px solid #D4A837;
          background: #1F2F1F;
          border-color: #D4A837;
        }
        .payment-option input[type="radio"] {
          accent-color: #D4A837;
        }
        .payment-option label {
          color: #D0D8C8;
          font-weight: 600;
        }
        .badge-gold {
          background: #1A2A1A;
          color: #D4A837;
          border: 1px solid rgba(212, 168, 55, 0.2);
        }
        .btn-gold-checkout {
          background: #D4A837;
          color: #0A120A;
          border: none;
          font-weight: 600;
          transition: all 0.25s ease;
          padding: 0.75rem 1.5rem;
        }
        .btn-gold-checkout:hover:not(:disabled) {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
        .btn-gold-checkout:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
        .text-gold { color: #D4A837; }
        .text-moss { color: #7C9A5E; }
        .text-sage { color: #B0C0A8; }
        .text-light-sage { color: #D0D8C8; }
        .hr-gold { border-color: rgba(212, 168, 55, 0.15); }
        .delivery-free { color: #7C9A5E; }
        .progress-step {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .progress-step .circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .progress-step .circle.active {
          background: #D4A837;
          color: #0A120A;
        }
        .progress-step .circle.inactive {
          background: #1A2A1A;
          border: 2px solid rgba(212, 168, 55, 0.3);
          color: #B0C0A8;
        }
        .progress-step .label {
          font-weight: 600;
        }
        .progress-step .label.active-label { color: #D4A837; }
        .progress-step .label.inactive-label { color: #6A7A62; }
        .progress-line {
          flex: 1;
          height: 2px;
          background: rgba(212, 168, 55, 0.2);
          margin: 0 0.5rem;
        }
        .progress-line.filled {
          background: #D4A837;
        }
        .order-item-divider {
          border-bottom: 1px dashed rgba(212, 168, 55, 0.08);
        }
      `}</style>

      <div className="container py-5" style={{ color: '#D0D8C8' }}>
        <div className="row g-4">
          {/* Left Column - Shipping & Payment */}
          <div className="col-md-7 animate-slide-left">
            {/* Progress indicator */}
            <div className="d-flex align-items-center mb-4">
              <div className="progress-step">
                <div className="circle active">1</div>
                <span className="label active-label">Shipping</span>
              </div>
              <div className="progress-line filled"></div>
              <div className="progress-step">
                <div className="circle inactive">2</div>
                <span className="label inactive-label">Payment</span>
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="card border-0 shadow-lg checkout-card mb-4 overflow-hidden">
              <div className="checkout-header">
                <h5 className="fw-bold mb-0 text-gold"><FaMapMarkerAlt className="me-2" style={{ color: '#D4A837' }} /> Shipping Address</h5>
              </div>
              <div className="card-body p-4">
                <textarea 
                  className="form-control rounded-3 border-0 shadow-sm input-dark-checkout" 
                  rows="3" 
                  placeholder="Enter your full delivery address (street, building, landmark, etc.)"
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                />
                <div className="mt-3 small d-flex align-items-center gap-2" style={{ color: '#B0C0A8' }}>
                  <FaLeaf style={{ color: '#7C9A5E' }} />
                  <span>We deliver fresh products straight from local farms.</span>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="card border-0 shadow-lg checkout-card overflow-hidden">
              <div className="checkout-header">
                <h5 className="fw-bold mb-0 text-gold"><FaCreditCard className="me-2" style={{ color: '#D4A837' }} /> Payment Method</h5>
              </div>
              <div className="card-body p-4">
                {getGateways().map((g, idx) => (
                  <div 
                    key={g} 
                    className={`payment-option ${paymentMethod === g ? 'selected' : ''} mb-3`}
                    onClick={() => setPaymentMethod(g)}
                  >
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="payment" 
                      id={g}
                      value={g} 
                      checked={paymentMethod === g}
                      onChange={e => setPaymentMethod(e.target.value)} 
                      style={{ borderColor: '#D4A837' }}
                    />
                    <label className="form-check-label ms-2" htmlFor={g}>{g}</label>
                    {g === 'Ecocash' && <span className="badge ms-2 badge-gold">Popular in {country}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="col-md-5 animate-slide-right">
            <div className="card border-0 shadow-lg checkout-card sticky-top" style={{ top: '100px' }}>
              <div className="checkout-header">
                <h5 className="fw-bold mb-0 text-gold"><FaShoppingBag className="me-2" style={{ color: '#D4A837' }} /> Your Order</h5>
              </div>
              <div className="card-body p-4">
                {cart.items.map(item => (
                  <div key={item.id} className="d-flex justify-content-between align-items-start mb-3 pb-2 order-item-divider">
                    <div>
                      <span className="fw-semibold text-light-sage">{item.product.name}</span>
                      <br />
                      <small className="text-sage">x{item.quantity}</small>
                    </div>
                    <span className="fw-semibold text-gold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-sage">Subtotal</span>
                  <span className="text-light-sage">${cart.total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-sage">Delivery</span>
                  <span className="text-light-sage">{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                {deliveryFee === 0 && cart.total > 0 && (
                  <div className="small delivery-free mb-2">
                    ✨ Free delivery on orders over $50
                  </div>
                )}
                <hr className="hr-gold" />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5 text-light-sage">Total</span>
                  <span className="fw-bold fs-5 text-gold">${orderTotal.toFixed(2)}</span>
                </div>
                <button 
                  className="btn w-100 rounded-pill py-3 fw-semibold btn-gold-checkout"
                  onClick={handleOrder}
                  disabled={!address || !paymentMethod}
                >
                  Place Order ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;