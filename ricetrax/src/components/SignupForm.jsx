import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';
import logo from '../assets/Logo.png';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === 'text' ? 'username' : e.target.type]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup successful:', formData);

    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="RiceTrax Logo" className="auth-logo" />
      <h2 className="auth-title">Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="auth-input"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <p className="text-sm mt-4 text-center text-gray-600">
        Already have an account? <Link to="/" className="underline">Login</Link>
      </p>
    </div>
  );
};

export default SignupForm;
