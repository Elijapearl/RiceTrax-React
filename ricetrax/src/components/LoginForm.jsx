import React from 'react';
import '../styles/auth.css';
import logo from '../assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard'); 
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="RiceTrax Logo" className="auth-logo" />
      <h2 className="auth-title">Login to RiceTrax</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" className="auth-input" required />
        <input type="password" placeholder="Password" className="auth-input" required />
        <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p className="text-sm mt-4 text-center text-gray-600">
        Don’t have an account? <Link to="/signup" className="underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
