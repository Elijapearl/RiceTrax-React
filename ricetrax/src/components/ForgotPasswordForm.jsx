import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';
import logo from '../assets/Logo.png';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  }; 

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log('Password changed:', { email, ...formData });
    navigate('/');
  };

  return (
    <div className="auth-container">
      <img src={logo} alt="RiceTrax Logo" className="auth-logo" />
      <h2 className="auth-title">Change Password</h2>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Next</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Old Password"
            className="auth-input"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="auth-input"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="auth-input"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
          <button type="submit" className="auth-button">Change Password</button>
        </form>
      )}

      <p className="text-sm mt-4 text-center text-gray-600">
        Back to <Link to="/" className="underline">Login</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
