import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Starting login process');
      console.log(JSON.stringify({ username, password }))
      const response = await fetch('https://n9rqqp2jak.execute-api.us-east-1.amazonaws.com/prod/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data) // Parse response as JSON
      console.log('Parsed response data:', data);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      if (data.message === 'Login successful') {
        // Update authentication state based on response
        setAuth({
          isAuthenticated: true,
          user: {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            // Add other properties as needed
          },
        });

        // Redirect to home or profile page after successful login
        navigate('/profile');
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, e.g., display error message to user
    }
  };

  return (
    <div className="flex flex-col items-center p-4 my-48">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border"
      />
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
