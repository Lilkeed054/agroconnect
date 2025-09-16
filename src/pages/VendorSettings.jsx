import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { FaSave } from 'react-icons/fa';

const VendorSettings = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    payout_method: '',
    payout_account: '',
    payout_name: '',
    bank_name: '',
    bank_branch: '',
    paynow_email: '',
    paypal_email: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        payout_method: user.payout_method || '',
        payout_account: user.payout_account || '',
        payout_name: user.payout_name || '',
        bank_name: user.bank_name || '',
        bank_branch: user.bank_branch || '',
        paynow_email: user.paynow_email || '',
        paypal_email: user.paypal_email || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      console.log('Sending data:', form); // 👈 debug
      const updated = await api.updateVendorProfile(form);
      setUser(updated);
      setMessage('✅ Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err); // 👈 log full error
      let errorMsg = 'Failed to save settings.';
      if (err.message) {
        errorMsg = err.message;
      }
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ color: '#D0D8C8' }}>
      <h2 className="fw-bold" style={{ color: '#D4A837' }}>Payment Settings</h2>
      <p style={{ color: '#B0C0A8' }}>Set how you want to receive money from customers.</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label" style={{ color: '#B0C0A8' }}>Payout Method</label>
          <select
            className="form-select input-dark-dash"
            value={form.payout_method}
            onChange={e => setForm({...form, payout_method: e.target.value})}
          >
            <option value="">Select method</option>
            <option value="bank">Bank Transfer</option>
            <option value="ecocash">EcoCash</option>
            <option value="paypal">PayPal</option>
            <option value="paynow">Paynow</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: '#B0C0A8' }}>Account / Mobile / Email</label>
          <input
            type="text"
            className="form-control input-dark-dash"
            placeholder="e.g., 0771234567 or bank account"
            value={form.payout_account}
            onChange={e => setForm({...form, payout_account: e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: '#B0C0A8' }}>Account Holder Name</label>
          <input
            type="text"
            className="form-control input-dark-dash"
            placeholder="Full name on account"
            value={form.payout_name}
            onChange={e => setForm({...form, payout_name: e.target.value})}
          />
        </div>

        {form.payout_method === 'bank' && (
          <>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#B0C0A8' }}>Bank Name</label>
              <input
                type="text"
                className="form-control input-dark-dash"
                placeholder="e.g., CBZ, Stanbic"
                value={form.bank_name}
                onChange={e => setForm({...form, bank_name: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#B0C0A8' }}>Branch</label>
              <input
                type="text"
                className="form-control input-dark-dash"
                placeholder="Branch name"
                value={form.bank_branch}
                onChange={e => setForm({...form, bank_branch: e.target.value})}
              />
            </div>
          </>
        )}

        {form.payout_method === 'paynow' && (
          <div className="mb-3">
            <label className="form-label" style={{ color: '#B0C0A8' }}>Paynow Email</label>
            <input
              type="email"
              className="form-control input-dark-dash"
              placeholder="email used in Paynow"
              value={form.paynow_email}
              onChange={e => setForm({...form, paynow_email: e.target.value})}
            />
          </div>
        )}

        {form.payout_method === 'paypal' && (
          <div className="mb-3">
            <label className="form-label" style={{ color: '#B0C0A8' }}>PayPal Email</label>
            <input
              type="email"
              className="form-control input-dark-dash"
              placeholder="your-paypal@email.com"
              value={form.paypal_email}
              onChange={e => setForm({...form, paypal_email: e.target.value})}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-gold-dash"
          disabled={loading}
        >
          <FaSave className="me-2" /> {loading ? 'Saving...' : 'Save Settings'}
        </button>

        {message && <p className="mt-3 text-success">{message}</p>}
      </form>
    </div>
  );
};

export default VendorSettings;