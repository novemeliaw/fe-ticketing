import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';

const TransactionFormPage = () => {
  const { event_id, event_name } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [boughtSeats, setBoughtSeats] = useState(0);
  const [email, setEmail] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]); // State to hold selected seats
  const [error, setError] = useState(null);

  // Dummy data for available seats
  const availableSeats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if selected seats exceed boughtSeats
    if (selectedSeats.length > boughtSeats) {
      setError(`Selected seats cannot exceed bought seats (${boughtSeats})`);
      return;
    }

    // Prepare data for API call
    const formData = {
      name,
      boughtSeats: parseInt(boughtSeats), // Ensure boughtSeats is converted to integer if necessary
      email,
    };

    try {
      // Example API endpoint URL
      // const apiUrl = 'https://example.com/api/payment'; // Replace with your API endpoint

      // // Perform POST request to API
      // const response = await fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to submit transaction');
      // }

      // Reset form fields after successful submission
      setName('');
      setBoughtSeats(0);
      setEmail('');
      setSelectedSeats([]); // Clear selected seats
      setError(null); // Clear any previous errors

      // Redirect to validation page after successful form submission
      navigate(`/validate/${event_name}`);
    } catch (error) {
      setError(error.message || 'Failed to submit transaction');
      console.error('Transaction submission error:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center p-4 my-3">
        <h1 className="text-3xl font-bold mb-8">Transaction Form for Concert {event_name}</h1>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Bought Seats"
              type="number"
              value={boughtSeats}
              onChange={(e) => setBoughtSeats(parseInt(e.target.value))}
              min="0"
              required
            />
          </div>
          
          {/* <div className="mb-4">
            <FormControl fullWidth required error={selectedSeats.length > boughtSeats}>
              <InputLabel id="selected-seats-label">Select Seats (Max {boughtSeats})</InputLabel>
              <Select
                labelId="selected-seats-label"
                multiple
                value={selectedSeats}
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  setSelectedSeats(typeof value === 'string' ? value.split(',') : value);
                }}
                renderValue={(selected) => selected.join(', ')}
              >
                {availableSeats.map((seat) => (
                  <MenuItem key={seat} value={seat}>
                    Seat {seat}
                  </MenuItem>
                ))}
              </Select>
              {selectedSeats.length > boughtSeats && (
                <FormHelperText>Selected seats cannot exceed bought seats</FormHelperText>
              )}
            </FormControl>
          </div> */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionFormPage;
