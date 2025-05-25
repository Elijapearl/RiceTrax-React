import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirecting
import {
  FaChartBar,
  FaBoxes,
  FaDollarSign,
  FaExclamationTriangle,
  FaBars,
  FaTimes,
  FaCog,
  FaTruck,
  FaSignOutAlt
} from "react-icons/fa";
import "../styles/sidebar.css";
import Logo from '../assets/Logo.png';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    // Optional: Clear localStorage/session
    localStorage.clear(); 
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={Logo} alt="RiceTrax Logo" className="logo-img" />
        <span className="logo-text">RiceTrax</span>
      </div>

      <button className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <ul className={`sidebar-nav ${menuOpen ? "open" : ""}`}>
        <li>
          <a href="/dashboard"><FaChartBar className="icon" />Dashboard</a>
        </li>
        <li>
          <a href="/inventory"><FaBoxes className="icon" />Inventory</a>
        </li>
        <li>
          <a href="/sales"><FaDollarSign className="icon" />Sales</a>
        </li>
        <li>
          <a href="/alerts"><FaExclamationTriangle className="icon" />Notifications</a>
        </li>
        <li>
          <a href="/supplier"><FaTruck className="icon" />Supplier</a>
        </li>
        <li>
          <a href="/settings"><FaCog className="icon" />Settings</a>
        </li>

        {/* Mobile Logout */}
        <li className="mobile-logout">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt className="icon" />
            Logout
          </button>
        </li>
      </ul>

      {/* Desktop Logout */}
      <div className="desktop-logout">
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt className="icon" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
