import React, { useState } from 'react';
import './BusDetailsPage.css';
import { FaBus, FaRoute, FaClock, FaTrash, FaPlus } from 'react-icons/fa';
import { db } from '../firebase'; // Adjust this path if your firebase.js is elsewhere
import { doc, setDoc } from 'firebase/firestore';

const BusDetailsPage = ({ trackerName }) => {
  const [busId, setBusId] = useState('');
  const [stops, setStops] = useState(['']);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStopChange = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const handleAddStop = () => {
    setStops([...stops, '']);
  };

  const handleRemoveStop = (index) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const busData = {
      busId,
      stops,
      startTime,
      endTime,
      createdAt: new Date(),
    };

    try {
      await setDoc(doc(db, 'buses', busId), busData);
      alert('Bus data submitted successfully!');
      setBusId('');
      setStops(['']);
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error('Error saving bus data:', error);
      alert('Error saving bus data. Check console for details.');
    }
  };

  return (
    <div className="bus-details-container">
      <h2>
        Welcome, <span className="tracker-name">{trackerName || 'Tracker'}!</span>
      </h2>
      <p className="bus-instructions">
        Enter the Bus ID, list of stops in between, and timing (start and end).
      </p>
      <form className="bus-form" onSubmit={handleSubmit}>
        <label>
          <FaBus className="icon" /> Bus ID
        </label>
        <input
          type="text"
          placeholder="Enter the Bus ID"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
          required
        />

        <label>
          <FaRoute className="icon" /> Stops in Between
        </label>
        {stops.map((stop, index) => (
          <div key={index} className="stop-input-row">
            <input
              type="text"
              placeholder="Enter the stop"
              value={stop}
              onChange={(e) => handleStopChange(index, e.target.value)}
              required
            />
            {stops.length > 1 && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleRemoveStop(index)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-stop-btn" onClick={handleAddStop}>
          <FaPlus /> Add Stop
        </button>

        <label>
          <FaClock className="icon" /> Timing
        </label>
        <div className="timing-inputs">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Bus Data
        </button>
      </form>
    </div>
  );
};

export default BusDetailsPage;
