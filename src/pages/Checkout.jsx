import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useLocation } from '../contexts/LocationContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { FaMapMarkerAlt, FaCreditCard, FaShoppingBag, FaLeaf } from 'react-icons/fa';

const Checkout = () => {
  // Safely use cart context
  const cartContext = useCart();
  if (!cartContext) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: '#D4A837' }} role="status">
          <span className="visually-hidden">Loading cart...</span>
        </div>
      </div>
    );
  }

  const { cart, clearCart } = cartContext;
  const { country, city } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  // Fetch vendor details when manual payment is selected
  useEffect(() => {
    if (paymentMethod === 'EcoCash' || paymentMethod === 'Bank Transfer') {
      setFetchingDetails(true);
      api.getVendorDetails()
        .then(data => {
          setVendorDetails(data);
        })
        .catch(err => {
          console.error('Failed to fetch vendor details:', err);
          setVendorDetails([]);
        })
        .finally(() => setFetchingDetails(false));
    } else {
      setVendorDetails([]);
    }
  }, [paymentMethod]);

  const getGateways = () => {
    if (country === 'Zimbabwe') {
      return ['Cash on Delivery', 'EcoCash', 'Bank Transfer', 'Paynow'];
    } else if (country === 'South Africa') {
      return ['Cash on Delivery', 'Bank Transfer', 'Payfast', 'Paypal'];
    } else if (country === 'Nigeria') {
      return ['Cash on Delivery', 'Bank Transfer', 'Flutterwave'];
    }
    return ['Cash on Delivery', 'Bank Transfer', 'Stripe'];
  };

  const gatewayMap = {
    'Cash on Delivery': 'cash_on_delivery',
    'EcoCash': 'ecocash',
    'Bank Transfer': 'bank_transfer',
    'Paynow': 'paynow',
    'Payfast': 'payfast',
    'Paypal': 'paypal',
    'Flutterwave': 'flutterwave',
    'Stripe': 'stripe',
  };

  const handleOrder = async () => {
    if (!address || !paymentMethod) {
      alert('Please fill in address and select a payment method.');
      return;
    }

    if (!cart.items || cart.items.length === 0) {
      alert('Your cart is empty. Please add products.');
      return;
    }

    // 🛑 NEW: Block order if manual payment and vendor details are missing
    if ((paymentMethod === 'EcoCash' || paymentMethod === 'Bank Transfer') && vendorDetails.length === 0) {
      alert('The vendor has not set up payment details yet. Please contact them directly or choose another payment method.');
      return;
    }

    setLoading(true);

    try {
      const syncItems = cart.items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }));
      await api.syncCart(syncItems);
      console.log('Cart synced successfully');

      const mappedGateway = gatewayMap[paymentMethod] || paymentMethod;
      const orderData = {
        address,
        country,
        city,
        payment_gateway: mappedGateway,
      };
      const order = await api.createOrder(orderData);

      const paymentResult = await api.initiatePayment(order.id, mappedGateway);

      if (paymentResult.vendor_details) {
        setVendorDetails(paymentResult.vendor_details);
        clearCart();
        setLoading(false);
        alert('Order placed! Please transfer the amount to the vendor.');
        navigate('/customer/dashboard');
      } else if (paymentResult.redirect_url) {
        window.location.href = paymentResult.redirect_url;
      } else {
        clearCart();
        navigate('/customer/dashboard');
      }
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order: ' + (error.message || 'Please try again.'));
      setLoading(false);
    }
  };

  const deliveryFee = cart.total > 50 ? 0 : 5;
  const orderTotal = cart.total + deliveryFee;

  return (
    <>
      <style>{`
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
        .order-item-divider {
          border-bottom: 1px dashed rgba(212, 168, 55, 0.08);
        }
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
        .animate-slide-left { animation: slideLeft 0.5s ease-out forwards; }
        .animate-slide-right { animation: slideRight 0.5s ease-out forwards; }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
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
                {getGateways().map((g) => (
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
                      onChange={(e) => setPaymentMethod(e.target.value)} 
                      style={{ borderColor: '#D4A837' }}
                    />
                    <label className="form-check-label ms-2" htmlFor={g}>{g}</label>
                    {g === 'EcoCash' && <span className="badge ms-2 badge-gold">Popular in {country}</span>}
                  </div>
                ))}

                {/* Show vendor details if manual payment is selected */}
                {(paymentMethod === 'EcoCash' || paymentMethod === 'Bank Transfer') && (
                  <div className="mt-3 p-3 rounded-3" style={{ background: '#1A2A1A', border: '1px solid rgba(212,168,55,0.15)' }}>
                    <h6 className="fw-bold" style={{ color: '#D4A837' }}>
                      {paymentMethod === 'EcoCash' ? 'Pay via EcoCash' : 'Pay via Bank Transfer'}
                    </h6>
                    <p className="small" style={{ color: '#B0C0A8' }}>
                      Please transfer the total amount to the vendor's account below.
                    </p>
                    {fetchingDetails ? (
                      <div className="text-center py-2">
                        <div className="spinner-border spinner-border-sm text-gold" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="ms-2" style={{ color: '#B0C0A8' }}>Loading vendor details...</span>
                      </div>
                    ) : vendorDetails.length > 0 ? (
                      vendorDetails.map((vendor, idx) => (
                        <div key={idx} className="mb-2 p-2 rounded" style={{ background: '#0A120A' }}>
                          <strong style={{ color: '#D0D8C8' }}>{vendor.name}</strong>
                          <div style={{ color: '#B0C0A8', fontSize: '0.9rem' }}>
                            {vendor.payout_method === 'ecocash' && (
                              <span>EcoCash: {vendor.payout_account}</span>
                            )}
                            {vendor.payout_method === 'bank' && (
                              <>
                                <div>Bank: {vendor.bank_name}</div>
                                <div>Account: {vendor.payout_account}</div>
                                <div>Holder: {vendor.payout_name}</div>
                              </>
                            )}
                            {!vendor.payout_method && (
                              <span>Please contact vendor for payment details.</span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      // 🆕 Updated message when no details
                      <p style={{ color: '#E87A7A' }}>⚠️ The vendor has not set up payment details yet. Please contact the vendor or choose another payment method.</p>
                    )}
                  </div>
                )}
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

                {/* 🆕 Warning below button if manual method and no details */}
                {(paymentMethod === 'EcoCash' || paymentMethod === 'Bank Transfer') && vendorDetails.length === 0 && !fetchingDetails && (
                  <div className="mt-2 text-center" style={{ color: '#E87A7A', fontSize: '0.85rem' }}>
                    ⚠️ Cannot place order – vendor payment details are missing. Please contact the vendor.
                  </div>
                )}

                <button 
                  className="btn w-100 rounded-pill py-3 fw-semibold btn-gold-checkout"
                  onClick={handleOrder}
                  disabled={!address || !paymentMethod || loading || ((paymentMethod === 'EcoCash' || paymentMethod === 'Bank Transfer') && vendorDetails.length === 0)}
                >
                  {loading ? 'Processing...' : 'Place Order ›'}
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