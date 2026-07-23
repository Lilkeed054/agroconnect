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
      <style>{`
        .location-btn {
          background: #D4A837;
          color: #0A120A;
          border: none;
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-weight: 600;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }
        .location-btn:hover {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
        .modal-overlay {
          background-color: rgba(0, 0, 0, 0.7);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content-location {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.15);
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8);
          max-width: 440px;
          width: 100%;
          margin: 0 1rem;
        }
        .modal-header-location {
          background: #0A120A;
          border-bottom: 1px solid rgba(212, 168, 55, 0.2);
          padding: 1rem 1.5rem;
          border-radius: 1.5rem 1.5rem 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-header-location h5 {
          color: #D4A837;
          font-weight: 700;
          margin: 0;
        }
        .modal-close {
          background: transparent;
          border: none;
          color: #B0C0A8;
          font-size: 1.4rem;
          transition: all 0.2s;
          padding: 0;
          line-height: 1;
        }
        .modal-close:hover {
          color: #D4A837;
          transform: rotate(90deg);
        }
        .modal-body-location {
          padding: 1.5rem;
          background: #162016;
          border-radius: 0 0 1.5rem 1.5rem;
        }
        .modal-body-location .form-label {
          color: #7C9A5E;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }
        .input-dark-location {
          background: #1A2A1A !important;
          border: 1px solid rgba(212, 168, 55, 0.15) !important;
          color: #D0D8C8 !important;
          border-radius: 2rem !important;
          padding: 0.6rem 1.2rem;
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
        }
        .input-dark-location:focus {
          border-color: #D4A837 !important;
          box-shadow: 0 0 0 3px rgba(212, 168, 55, 0.2) !important;
          background: #1A2A1A !important;
          color: #D0D8C8 !important;
        }
        .input-dark-location option {
          background: #1A2A1A;
          color: #D0D8C8;
        }
        .input-dark-location::placeholder {
          color: #6A7A62 !important;
        }
        .location-hint {
          color: #B0C0A8;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }
        .location-hint svg {
          color: #D4A837;
        }
        .modal-footer-location {
          padding: 1rem 1.5rem 1.5rem;
          border-top: 1px solid rgba(212, 168, 55, 0.08);
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          background: transparent;
        }
        .btn-cancel-location {
          background: transparent;
          color: #B0C0A8;
          border: 1px solid rgba(212, 168, 55, 0.2);
          padding: 0.4rem 1.5rem;
          border-radius: 2rem;
          transition: all 0.2s;
        }
        .btn-cancel-location:hover {
          background: rgba(212, 168, 55, 0.1);
          color: #D4A837;
        }
        .btn-save-location {
          background: #D4A837;
          color: #0A120A;
          border: none;
          padding: 0.4rem 1.5rem;
          border-radius: 2rem;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .btn-save-location:hover {
          background: #C49A2E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 168, 55, 0.3);
          color: #0A120A;
        }
      `}</style>

      {/* Trigger Button */}
      <button className="location-btn" onClick={() => setShow(true)}>
        <FaMapMarkerAlt /> {city}, {country}
      </button>

      {/* Modal */}
      {show && (
        <div className="modal-overlay" onClick={() => setShow(false)}>
          <div className="modal-content-location" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-header-location">
              <h5>Set your location</h5>
              <button className="modal-close" onClick={() => setShow(false)}>
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="modal-body-location">
              <div className="mb-3">
                <label className="form-label">Country</label>
                <select
                  className="input-dark-location"
                  value={tempCountry}
                  onChange={(e) => {
                    setTempCountry(e.target.value);
                    setTempCity(citiesMap[e.target.value]?.[0] || '');
                  }}
                >
                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">City</label>
                <select
                  className="input-dark-location"
                  value={tempCity}
                  onChange={(e) => setTempCity(e.target.value)}
                >
                  {citiesMap[tempCountry]?.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="location-hint">
                <FaMapMarkerAlt />
                <span>📍 Products near this area will be shown</span>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer-location">
              <button className="btn-cancel-location" onClick={() => setShow(false)}>
                Cancel
              </button>
              <button className="btn-save-location" onClick={handleSave}>
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationSelector;