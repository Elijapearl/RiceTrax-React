import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, ShoppingCart, Bell, Settings, LogOut } from 'lucide-react';
import '../styles/sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { label: 'Inventory', icon: <Layers size={20} />, path: '/inventory' },
    { label: 'POS', icon: <ShoppingCart size={20} />, path: '/pos' },
    { label: 'Notification', icon: <Bell size={20} />, path: '/notifications' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <aside className="rtx-sidebar">
      <div className="rtx-sidebar-top">
        <img src="/logo.png" alt="RiceTrax" className="rtx-logo" />
        <h2 className="rtx-brand">RiceTrax</h2>
        <nav className="rtx-nav">
          {navItems.map(({ label, icon, path }) => (
            <Link
              key={path}
              to={path}
              className={`rtx-nav-item ${location.pathname === path ? 'rtx-active' : ''}`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <button className="rtx-logout">
        <LogOut size={20} />
        <span>Log out</span>
      </button>
    </aside>
  );
};

export default Sidebar;
