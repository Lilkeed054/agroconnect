import { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [country, setCountry] = useState('Zimbabwe');
  const [city, setCity] = useState('Harare');
  const [coordinates, setCoordinates] = useState({ lat: -17.825, lng: 31.033 });

  useEffect(() => {
    const saved = localStorage.getItem('userLocation');
    if (saved) {
      const { country, city, coordinates } = JSON.parse(saved);
      setCountry(country);
      setCity(city);
      setCoordinates(coordinates);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const newCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoordinates(newCoords);
        // Reverse geocode here (optional: use OpenStreetMap Nominatim)
      });
    }
  }, []);

  const updateLocation = (newCountry, newCity, newCoords) => {
    setCountry(newCountry);
    setCity(newCity);
    setCoordinates(newCoords);
    localStorage.setItem('userLocation', JSON.stringify({ country: newCountry, city: newCity, coordinates: newCoords }));
  };

  return (
    <LocationContext.Provider value={{ country, city, coordinates, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);