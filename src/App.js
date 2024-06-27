import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './components/LandingPage';
import ProfilePage from './components/ProfilePage';
import AvailablePage from './components/AvailablePage';
import AddEventPage from './components/AddEventPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import TransactionFormPage from './components/TransactionForm';
import ValidationPage from './components/ValidatonPage';

export const AuthContext = createContext();

const App = () => {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
          <Route path="/available" element={<AvailablePage />} />
          <Route path="/add-event" element={<ProtectedRoute component={AddEventPage} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/transaction/:event_name" element={<TransactionFormPage />} />
          <Route path="/validate/:event_name" element={<ValidationPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ component: Component }) => {
  const { auth } = useContext(AuthContext);
  return auth.isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default App;
