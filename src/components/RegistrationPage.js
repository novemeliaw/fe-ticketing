import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    // Replace with actual registration logic
    setAuth({ isAuthenticated: true, role });
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center p-4 my-48">
      <h1 className="text-3xl font-bold mb-8">Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mb-4 p-2 border"
      >
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="promotor">Promotor</option>
      </select>
      <button onClick={handleRegister} className="p-2 bg-blue-500 text-white rounded">
        Register
      </button>
    </div>
  );
};

export default RegistrationPage;
