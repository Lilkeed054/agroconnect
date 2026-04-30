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
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={12} style={{ height: '400px', width: '100%', borderRadius: '16px' }} className="shadow-sm">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {products.map(product => (
        <Marker key={product.id} position={[product.vendor_lat || center.lat + (Math.random() - 0.5) * 0.05, product.vendor_lng || center.lng + (Math.random() - 0.5) * 0.05]}>
          <Popup>
            <strong>{product.name}</strong><br />
            {product.vendor_name}<br />
            <a href={`/product/${product.id}`}>View</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;