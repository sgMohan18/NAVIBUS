import React, { useState, useEffect } from 'react';
import './BusRoute.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaBus, FaSearchLocation, FaMapMarkedAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BusRoute = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch buses from Firestore
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const busesRef = collection(db, 'buses');
        const snapshot = await getDocs(busesRef);
        const busList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBuses(busList);
        setFilteredBuses(busList);
      } catch (error) {
        console.error('Error fetching buses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!source || !destination) {
      alert('Please enter both source and destination.');
      return;
    }

    const normalizedSource = source.trim().toLowerCase();
    const normalizedDestination = destination.trim().toLowerCase();

    const results = buses.filter((bus) => {
      if (!bus.stops || bus.stops.length < 2) return false;

      const stops = bus.stops.map((stop) => stop.trim().toLowerCase());
      const sourceIndex = stops.indexOf(normalizedSource);
      const destIndex = stops.indexOf(normalizedDestination);

      return sourceIndex !== -1 && destIndex !== -1 && sourceIndex < destIndex;
    });

    setFilteredBuses(results);
  };

  return (
    <div className="bus-route-container">
      <div className="route-planner-card">
        <h3>
          <FaSearchLocation className="icon" /> Route Planner
        </h3>
        <form className="route-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="bus-results">
        <h3>
          <FaBus className="icon" /> Matching Bus Details
        </h3>
        {loading ? (
          <p>Loading buses...</p>
        ) : filteredBuses.length === 0 ? (
          <p className="no-results">No buses found for this route.</p>
        ) : (
          filteredBuses.map((bus) => (
            <div key={bus.id} className="bus-card">
              <h4>Bus {bus.busId}</h4>
              <p>
                <strong>Route:</strong> {bus.stops.join(' → ')}
              </p>
              <p>
                <strong>Timing:</strong> {bus.startTime} - {bus.endTime}
              </p>
              <button
                className="map-btn"
                onClick={() =>
                  navigate(`/bus-map/${bus.id}`, {
                    state: {
                      bus,
                      // ✅ TEMP: Fake user destination (Bangalore coords)
                      userDestination: { lat: 12.9716, lng: 77.5946 },
                    },
                  })
                }
              >
                <FaMapMarkedAlt /> View in Map
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BusRoute;
