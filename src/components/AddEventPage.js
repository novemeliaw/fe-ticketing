import React, { useState } from 'react';

const AddEventPage = () => {
  const [eventName, setEventName] = useState('');
  const [artist, setArtist] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('');

  const handleAddEvent = () => {
    // Replace with actual event creation logic
    console.log({ eventName, artist, date, seats });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-8">Add Event</h1>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className="mb-4 p-2 border"
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="mb-4 p-2 border"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mb-4 p-2 border"
      />
      <input
        type="number"
        placeholder="Seats"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
        className="mb-4 p-2 border"
      />
      <button onClick={handleAddEvent} className="p-2 bg-blue-500 text-white rounded">
        Add Event
      </button>
    </div>
  );
};

export default AddEventPage;
