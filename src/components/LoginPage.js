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
      const response = await fetch('https://n9rqqp2jak.execute-api.us-east-1.amazonaws.com/prod/users', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // Log the raw response to debug the issue
      console.log('Raw response:', response);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const text = await response.text(); // Get response as text
      console.log('Response text:', text);

      const data = JSON.parse(text); // Parse text to JSON
      console.log('Parsed response data:', data);

      // Check if the response contains an error message
      if (data.message === "Error Logging In") {
        alert('Error Logging In');
        return; // Do not proceed further if there's an error
      }

      // Check if data.user exists before accessing its properties
      if (data.user) {
        // Update authentication state based on response
        setAuth({
          isAuthenticated: true,
          user: {
            username: data.user.username,
            email: data.user.email,
            // add other properties if needed
          },
        });

        // Redirect to home or profile page after successful login
        navigate('/');
      } else {
        throw new Error('User data not found in response');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, e.g., display error message to user
      alert('Login failed. Please try again.');
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
