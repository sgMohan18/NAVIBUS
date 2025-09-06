// src/pages/BusMapPage.js
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// ✅ Import your icons
import busIconImg from "../assets/bus-icon.png";
import userIconImg from "../assets/user-icon.png";
import destIconImg from "../assets/dest-icon.png";

const busIcon = new L.Icon({
  iconUrl: busIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const userIcon = new L.Icon({
  iconUrl: userIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const destIcon = new L.Icon({
  iconUrl: destIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// ✅ Helper: Geocode with Bangalore fallback
async function geocode(place) {
  if (!place || typeof place !== "string") return null; // prevent crash

  const query = `${place.trim()}, Bangalore, India`;
  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
    encodeURIComponent(query);

  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (err) {
    console.error("Geocoding error:", err);
  }
  return null;
}

// ✅ Routing Component
function Routing({ start, mid, end }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    const control = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng),
        ...(mid ? [L.latLng(mid.lat, mid.lng)] : []),
        L.latLng(end.lat, end.lng),
      ],
      lineOptions: { styles: [{ color: "#5e4b8b", weight: 5 }] },
      createMarker: () => null, // we will create our own markers
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      show: false,
    }).addTo(map);

    routingRef.current = control;

    return () => {
      if (routingRef.current) {
        map.removeControl(routingRef.current);
        routingRef.current = null;
      }
    };
  }, [map, start, mid, end]);

  return null;
}

const BusMapPage = () => {
  const location = useLocation();
  const { busId } = useParams();

  const { bus, userDestination } = location.state || {};
  const [coords, setCoords] = useState({ start: null, user: null, end: null });
  const [loading, setLoading] = useState(true);

  // ✅ Load coordinates
  useEffect(() => {
    const loadCoords = async () => {
      if (!bus || !bus.stops || bus.stops.length < 2) {
        setLoading(false);
        return;
      }

      const startStop = bus.stops[0];
      const endStop = bus.stops[bus.stops.length - 1];

      const [startCoords, userCoords, endCoords] = await Promise.all([
        geocode(startStop),
        geocode(userDestination),
        geocode(endStop),
      ]);

      setCoords({ start: startCoords, user: userCoords, end: endCoords });
      setLoading(false);
    };

    loadCoords();
  }, [bus, userDestination]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading map...</p>;

  if (!coords.start || !coords.end) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Unable to load bus route.</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={coords.start}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Routing line */}
        <Routing start={coords.start} mid={coords.user} end={coords.end} />

        {/* Bus Source */}
        <Marker position={coords.start} icon={busIcon}>
          <Popup>Bus {bus?.busId} (Start)</Popup>
        </Marker>

        {/* User Destination */}
        {coords.user && (
          <Marker position={coords.user} icon={userIcon}>
            <Popup>User Destination</Popup>
          </Marker>
        )}

        {/* Bus Destination */}
        <Marker position={coords.end} icon={destIcon}>
          <Popup>Bus Destination</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default BusMapPage;
