// src/pages/GetStarted.js
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import './GetStarted.css';

// ✅ Import icons correctly from src/assets
import userIconImg from '../assets/user-icon.png';
import destIconImg from '../assets/dest-icon.png';

// Custom icons
const userIcon = new L.icon({
  iconUrl: userIconImg,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -45],
});

const destIcon = new L.icon({
  iconUrl: destIconImg,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -45],
});

// Routing component
function Routing({ start, end }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    // Remove old route safely
    if (routingControlRef.current) {
      routingControlRef.current.remove();
      routingControlRef.current = null;
    }

    if (start && end) {
      const control = L.Routing.control({
        waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
        lineOptions: { styles: [{ color: '#5e4b8b', weight: 5 }] },
        createMarker: (i, wp, nWps) => {
          if (i === 0) return L.marker(wp.latLng, { icon: userIcon }).bindPopup("You are here");
          if (i === nWps - 1) return L.marker(wp.latLng, { icon: destIcon }).bindPopup("Destination");
          return null;
        },
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        show: false,
      }).addTo(map);

      routingControlRef.current = control;
    }

    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.remove();
        routingControlRef.current = null;
      }
    };
  }, [map, start, end]);

  return null;
}

// Main page
const GetStarted = () => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [search, setSearch] = useState('');

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert('Unable to retrieve your location')
    );
  }, []);

  // Handle destination search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const place = data[0];
        setDestination({
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
        });
      } else {
        alert('Location not found. Try another search.');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      alert('Error fetching location.');
    }
  };

  return (
    <div className="get-started-page">
      <section className="intro-section">
        <h1>Get Started with NAVI</h1>
        <p>Track your bus from your location and reach your destination quickly!</p>
      </section>

      {/* Destination search bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter your destination"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Map */}
      {location ? (
        <section className="map-section">
          <MapContainer center={location} zoom={15} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location} icon={userIcon} />
            {destination && <Routing start={location} end={destination} />}
          </MapContainer>
        </section>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default GetStarted;
