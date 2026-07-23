import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ products, center }) => {
  // Dark tile layer from CartoDB
  const tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  const tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; CartoDB';

  return (
    <>
      <style>{`
        .dark-popup .leaflet-popup-content-wrapper {
          background: #162016;
          color: #D0D8C8;
          border-radius: 12px;
          border: 1px solid rgba(212, 168, 55, 0.2);
          box-shadow: 0 8px 20px rgba(0,0,0,0.6);
        }
        .dark-popup .leaflet-popup-tip {
          background: #162016;
          border: 1px solid rgba(212, 168, 55, 0.2);
        }
        .dark-popup .leaflet-popup-close-button {
          color: #B0C0A8 !important;
        }
        .dark-popup .leaflet-popup-close-button:hover {
          color: #D4A837 !important;
        }
        .map-wrapper {
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(212, 168, 55, 0.15);
          box-shadow: 0 12px 24px -8px rgba(0,0,0,0.6);
        }
      `}</style>
      <div className="map-wrapper">
        <MapContainer 
          center={[center.lat, center.lng]} 
          zoom={12} 
          style={{ height: '400px', width: '100%', background: '#0A120A' }}
        >
          <TileLayer url={tileLayerUrl} attribution={tileLayerAttribution} />
          {products.map((product) => (
            <Marker 
              key={product.id} 
              position={[
                product.vendor_lat || center.lat + (Math.random() - 0.5) * 0.05,
                product.vendor_lng || center.lng + (Math.random() - 0.5) * 0.05,
              ]}
            >
              <Popup className="dark-popup">
                <div>
                  <strong style={{ color: '#D4A837' }}>{product.name}</strong>
                  <br />
                  {product.vendor_name}
                  <br />
                  <a 
                    href={`/product/${product.id}`} 
                    style={{ color: '#D4A837', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    View
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default MapView;