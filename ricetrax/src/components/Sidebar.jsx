import React, { useState } from "react";
import {
  FaChartBar,
  FaBoxes,
  FaDollarSign,
  FaExclamationTriangle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../styles/sidebar.css";
import Logo from '../assets/Logo.png'

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
          <a href="/dashboard">
            <FaChartBar className="icon" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="/inventory">
            <FaBoxes className="icon" />
            Inventory
          </a>
        </li>
        <li>
          <a href="/sales">
            <FaDollarSign className="icon" />
            Sales
          </a>
        </li>
        <li>
          <a href="/alerts">
            <FaExclamationTriangle className="icon" />
            Alerts
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
