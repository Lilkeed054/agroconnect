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
    <div className="container py-5">
      <div className="row g-4">
        {/* Left Column - Shipping & Payment */}
        <div className="col-md-7 animate-slide-left">
          {/* Progress indicator */}
          <div className="d-flex align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle bg-success d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', backgroundColor: '#09F315 !important' }}>
                <span className="text-dark fw-bold">1</span>
              </div>
              <span className="fw-semibold">Shipping</span>
            </div>
            <div className="flex-grow-1 mx-3" style={{ height: '2px', backgroundColor: '#E5E7EB' }}></div>
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle border d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', borderColor: '#B2EC05 !important', color: '#B2EC05' }}>
                <span>2</span>
              </div>
              <span className="text-muted">Payment</span>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
            <div className="card-header bg-white py-3 border-0" style={{ borderBottom: '2px solid #F4E04D' }}>
              <h5 className="fw-bold mb-0"><FaMapMarkerAlt className="me-2" style={{ color: '#09F315' }} /> Shipping Address</h5>
            </div>
            <div className="card-body p-4">
              <textarea 
                className="form-control rounded-3 border-0 shadow-sm" 
                rows="3" 
                style={{ backgroundColor: '#F9FAFB' }}
                placeholder="Enter your full delivery address (street, building, landmark, etc.)"
                value={address} 
                onChange={e => setAddress(e.target.value)} 
              />
              <div className="mt-3 small text-muted d-flex align-items-center gap-2">
                <FaLeaf style={{ color: '#B2EC05' }} />
                <span>We deliver fresh products straight from local farms.</span>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3 border-0" style={{ borderBottom: '2px solid #F4E04D' }}>
              <h5 className="fw-bold mb-0"><FaCreditCard className="me-2" style={{ color: '#09F315' }} /> Payment Method</h5>
            </div>
            <div className="card-body p-4">
              {getGateways().map((g, idx) => (
                <div key={g} className={`form-check mb-3 p-3 rounded-3 ${paymentMethod === g ? 'payment-selected' : ''}`} style={{ backgroundColor: paymentMethod === g ? '#F0FBD8' : '#F9FAFB', transition: 'all 0.2s', cursor: 'pointer' }} onClick={() => setPaymentMethod(g)}>
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="payment" 
                    id={g}
                    value={g} 
                    checked={paymentMethod === g}
                    onChange={e => setPaymentMethod(e.target.value)} 
                    style={{ borderColor: '#09F315' }}
                  />
                  <label className="form-check-label ms-2 fw-semibold" htmlFor={g} style={{ color: '#2C3A1F' }}>{g}</label>
                  {g === 'Ecocash' && <span className="badge bg-success ms-2">Popular in {country}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="col-md-5 animate-slide-right">
          <div className="card border-0 shadow rounded-4 sticky-top" style={{ top: '100px' }}>
            <div className="card-header bg-white py-3 border-0" style={{ borderBottom: '2px solid #F4E04D' }}>
              <h5 className="fw-bold mb-0"><FaShoppingBag className="me-2" style={{ color: '#09F315' }} /> Your Order</h5>
            </div>
            <div className="card-body p-4">
              {cart.items.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-start mb-3 pb-2" style={{ borderBottom: '1px dashed #E5E7EB' }}>
                  <div>
                    <span className="fw-semibold">{item.product.name}</span>
                    <br />
                    <small className="text-muted">x{item.quantity}</small>
                  </div>
                  <span className="fw-semibold" style={{ color: '#09F315' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              {deliveryFee === 0 && cart.total > 0 && (
                <div className="small text-success mb-2">
                  ✨ Free delivery on orders over $50
                </div>
              )}
              <hr style={{ borderColor: '#F4E04D' }} />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-5" style={{ color: '#09F315' }}>${orderTotal.toFixed(2)}</span>
              </div>
              <button 
                className="btn w-100 rounded-pill py-3 fw-semibold"
                style={{ 
                  background: 'linear-gradient(135deg, #B2EC05, #09F315)', 
                  color: '#2C3A1F',
                  border: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.background = 'linear-gradient(135deg, #09F315, #F4E04D)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'linear-gradient(135deg, #B2EC05, #09F315)'; }}
                onClick={handleOrder}
                disabled={!address || !paymentMethod}
              >
                Place Order ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline animations */}
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
        .payment-selected {
          border-left: 4px solid #09F315;
        }
      `}</style>
    </div>
  );
};

export default Checkout;