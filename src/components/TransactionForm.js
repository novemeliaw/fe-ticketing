import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';

const TransactionFormPage = () => {
  const { event_name } = useParams();

  return (
    <div>
    <Navbar></Navbar>
    <div className="flex flex-col items-center p-4 my-3">
      <h1 className="text-3xl font-bold mb-8">Transaction Form for Concert {event_name}</h1>
      {/* Add your form fields here */}
      <form className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your name"
          />
         <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bought_seats">
            Bought Seats
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bought_seats"
            type="number"
            placeholder="Bought Seats"
                // value={boughtSeats}
                // onChange={handleBoughtSeatsChange}
            min="0"
          />
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="credit-card">
            Credit Card
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="credit-card"
            type="text"
            placeholder="Credit card number"
          />
        </div>
        {/* Add more form fields as necessary */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default TransactionFormPage;
