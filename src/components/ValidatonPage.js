import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App'; // Assuming AuthContext provides authentication state

const ValidationPage = () => {
  const { event_name } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); // Get authentication state

  const handleValidatePayment = async () => {
    try {
      const transactionId = 'your_transaction_id'; // Replace with actual transaction ID
      const buttonPressed = true; // Simulate button press

      // Make API call to validate payment
      const response = await fetch('your_lambda_endpoint_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId, buttonPressed }),
      });

      if (!response.ok) {
        throw new Error('Failed to validate payment');
      }

      const data = await response.json();
      alert(data.message); // Example alert

      // Redirect based on authentication state
      if (isAuthenticated) {
        navigate('/profile'); // Redirect to profile if authenticated
      } else {
        navigate('/'); // Redirect to home/landing if not authenticated
      }
    } catch (error) {
      console.error('Error validating payment:', error);
      alert(`Error validating payment: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center p-4 my-48">
        <h1 className="text-3xl font-bold mb-5">Validate Payment for Concert {event_name}</h1>
        <p>Your transaction has been successfully recorded.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          onClick={handleValidatePayment}
        >
          Validate Payment
        </button>
      </div>
    </div>
  );
};

export default ValidationPage;
