import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App'; // Assuming AuthContext provides authentication state

const ValidationPage = () => {
  const { event_name } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); // Get authentication state

  const handleValidatePayment = () => {
    // Perform validation logic here (e.g., API call)
    alert('Payment validated successfully!'); // Example alert

    // Redirect based on authentication state
    if (isAuthenticated) {
      navigate('/profile'); // Redirect to profile if authenticated
    } else {
      navigate('/'); // Redirect to home/landing if not authenticated
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center p-4 my-3">
        <h1 className="text-3xl font-bold mb-8">Validation Page for Concert {event_name}</h1>
        <p>Your transaction has been successfully submitted.</p>
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
