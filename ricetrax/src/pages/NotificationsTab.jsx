import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DateTimeDisplay from "../components/DateTimeDisplay";
import "../styles/notifications.css";

const products = [
  { id: 1, name: "Dinorado", stock: 50 },
  { id: 2, name: "Sinandomeng", stock: 30 },
  { id: 3, name: "Jasmine", stock: 9 },
  { id: 4, name: "Well-Milled", stock: 0 },
  { id: 5, name: "Premium", stock: 60 },
  { id: 6, name: "Brown Rice", stock: 7 },
  { id: 7, name: "Red Rice", stock: 15 },
  { id: 8, name: "Glutinous", stock: 10 },
  { id: 9, name: "Extra Brand", stock: 0 },
];

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const now = new Date();
    const timestamp = now.toLocaleString();

    const generatedNotifications = products
      .filter((p) => p.stock <= 10)
      .map((p) => ({
        id: p.id,
        name: p.name,
        status: p.stock === 0 ? "Out of Stock" : "Low Stock",
        timestamp,
      }));

    setNotifications(generatedNotifications);
  }, []);

  return (
    <div className="notifications-page">
      <Sidebar />
      <DateTimeDisplay />
      <main className="notifications-container">
        
        <h2 className="notif-header2">Product Notifications</h2>

        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications at this time.</p>
        ) : (
          <ul className="notifications-list">
            {notifications.map(({ id, name, status, timestamp }) => (
              <li
                key={id}
                className={`notification ${
                  status === "Out of Stock" ? "out-of-stock" : "low-stock"
                }`}
              >
                <div className="notification-info">
                  <strong>{name}</strong> is <em>{status}</em>
                </div>
                <div className="notification-timestamp">{timestamp}</div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default NotificationsTab;
