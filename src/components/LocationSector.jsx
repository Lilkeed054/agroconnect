import { useState } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationSelector = () => {
  const { country, city, updateLocation } = useLocation();
  const [show, setShow] = useState(false);
  const [tempCountry, setTempCountry] = useState(country);
  const [tempCity, setTempCity] = useState(city);

  const countries = ['Zimbabwe', 'South Africa', 'Nigeria', 'Kenya', 'Ghana', 'Zambia', 'Botswana'];
  const citiesMap = {
    Zimbabwe: ['Harare', 'Bulawayo', 'Mutare', 'Gweru'],
    'South Africa': ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'],
    Nigeria: ['Lagos', 'Abuja', 'Kano', 'Ibadan'],
    Kenya: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
    Ghana: ['Accra', 'Kumasi', 'Tamale'],
    Zambia: ['Lusaka', 'Kitwe', 'Ndola'],
    Botswana: ['Gaborone', 'Francistown', 'Molepolole'],
  };

  const handleSave = () => {
    updateLocation(tempCountry, tempCity, { lat: 0, lng: 0 });
    setShow(false);
  };

  return (
    <>
      {/* Location button – brand green background */}
      <button 
        className="btn btn-sm d-flex align-items-center gap-1 rounded-pill"
        style={{ 
          backgroundColor: '#09F315', 
          color: '#2C3A1F',
          border: 'none',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#B2EC05'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#09F315'; e.currentTarget.style.transform = 'translateY(0)'; }}
        onClick={() => setShow(true)}
      >
        <FaMapMarkerAlt /> {city}, {country}
      </button>

      {/* Modal */}
      {show && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header" style={{ background: 'linear-gradient(135deg, #F4E04D, #B2EC05)', borderBottom: 'none' }}>
                <h5 className="modal-title fw-bold" style={{ color: '#2C3A1F' }}>Set your location</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)} style={{ filter: 'brightness(0) invert(1)' }}></button>
              </div>
              <div className="modal-body p-4" style={{ backgroundColor: '#FFFFFF' }}>
                <label className="form-label fw-semibold" style={{ color: '#09F315' }}>Country</label>
                <select 
                  className="form-select rounded-pill border-0 shadow-sm mb-3" 
                  style={{ backgroundColor: '#F9FAFB' }}
                  value={tempCountry} 
                  onChange={e => { setTempCountry(e.target.value); setTempCity(citiesMap[e.target.value][0]); }}
                >
                  {countries.map(c => <option key={c}>{c}</option>)}
                </select>
                <label className="form-label fw-semibold" style={{ color: '#09F315' }}>City</label>
                <select 
                  className="form-select rounded-pill border-0 shadow-sm" 
                  style={{ backgroundColor: '#F9FAFB' }}
                  value={tempCity} 
                  onChange={e => setTempCity(e.target.value)}
                >
                  {citiesMap[tempCountry]?.map(c => <option key={c}>{c}</option>)}
                </select>
                <div className="mt-3 text-muted small d-flex align-items-center gap-2">
                  <FaMapMarkerAlt style={{ color: '#B2EC05' }} />
                  <span>📍 Products near this area will be shown</span>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTopColor: '#F4E04D' }}>
                <button 
                  className="btn rounded-pill px-3" 
                  onClick={() => setShow(false)}
                  style={{ backgroundColor: '#F9FAFB', color: '#6C757D', border: '1px solid #E5E7EB' }}
                >
                  Cancel
                </button>
                <button 
                  className="btn rounded-pill px-3 fw-semibold" 
                  onClick={handleSave}
                  style={{ backgroundColor: '#09F315', color: '#2C3A1F', border: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B2EC05'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#09F315'}
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationSelector;