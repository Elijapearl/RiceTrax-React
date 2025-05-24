import React from 'react';
import '../styles/auth.css';
import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  return (
    <div className="auth-container">
      <img src={logo} alt="RiceTrax Logo" className="auth-logo" />
      <h2 className="auth-title">Create an Account</h2>
      <form>
        <input type="text" placeholder="Username" className="auth-input" />
        <input type="email" placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <p className="text-sm mt-4 text-center text-gray-600">
        Already have an account? <Link to="/" className="underline">Login</Link>
      </p>
    </div>
  );
};

export default SignupForm;
