import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import BrandDetails from "./pages/BrandDetails";
import SalesScreen from './pages/SalesScreen';
import NotificationsTab from './pages/NotificationsTab';
import SettingsPage from './pages/SettingsPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/inventory/:brandId" element={<BrandDetails />} />
      <Route path="/sales" element={<SalesScreen />} />
      <Route path="/alerts" element={<NotificationsTab />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  </Router>
);

export default App;
