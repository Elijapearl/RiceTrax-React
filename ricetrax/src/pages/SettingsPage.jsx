import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DateTimeDisplay from "../components/DateTimeDisplay";
import "../styles/settings.css";

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleOptionClick = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {options.find((opt) => opt.value === value)?.label || "Select"}
        <span className="arrow">&#9662;</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu" role="listbox" tabIndex={-1}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={value === opt.value ? "active" : ""}
              onClick={() => handleOptionClick(opt.value)}
              role="option"
              aria-selected={value === opt.value}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleOptionClick(opt.value);
                }
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile tab states
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    contactNumber: "",
  });

  // Password tab states
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Theme tab state
  const [theme, setTheme] = useState("light");

  // Language tab state
  const [language, setLanguage] = useState("english");

  // Notifications tab state
  const [notifications, setNotifications] = useState({
    emailNotifications: false,
    smsNotifications: false,
  });

  // Handlers for profile inputs
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for password inputs
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for theme select
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  // Handler for language select
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Handlers for notifications checkboxes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  // Handlers for saving or submitting (just placeholder alerts here)
  const handleSaveProfile = () => {
    alert(`Profile saved: ${JSON.stringify(profile)}`);
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }
    alert("Password changed!");
  };

  const handleSaveTheme = () => {
    alert(`Theme set to ${theme}`);
  };

  const handleSaveLanguage = () => {
    alert(`Language set to ${language}`);
  };

  const handleSaveNotifications = () => {
    alert(`Notifications settings saved: ${JSON.stringify(notifications)}`);
  };

  return (
    <div className="settings-page">
      <Sidebar />
      <DateTimeDisplay />
      <main className="settings-container">
        <h2 className="settings-header2">User Settings</h2>

        <div className="settings-tabs">
          {/* Desktop tab buttons (visible on desktop only) */}
          <div className="tab-buttons">
            {["profile", "password", "theme", "language", "notifications"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile custom dropdown (visible on mobile only) */}
          <div className="tab-dropdown">
            <CustomDropdown
              options={[
                { value: "profile", label: "Profile" },
                { value: "password", label: "Password" },
                { value: "theme", label: "Theme" },
                { value: "language", label: "Language" },
                { value: "notifications", label: "Notifications" },
              ]}
              value={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "profile" && (
          <section className="settings-content">
            <h3>Profile</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProfile();
              }}
              className="settings-form"
            >
              <label htmlFor="fullname">Full Name</label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                value={profile.fullname}
                onChange={handleProfileChange}
              />

              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
              />

              <label htmlFor="contactNumber">Contact Number</label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={profile.contactNumber}
                onChange={handleProfileChange}
              />

              <button type="submit" className="save-button">
                Save Profile
              </button>
            </form>
          </section>
        )}

        {activeTab === "password" && (
          <section className="settings-content">
            <h3>Change Password</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
              className="settings-form"
            >
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
              />

              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />

              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
              />

              <button type="submit" className="save-button">
                Change Password
              </button>
            </form>
          </section>
        )}

        {activeTab === "theme" && (
          <section className="settings-content">
            <h3>Theme</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveTheme();
              }}
              className="settings-form"
            >
              <label htmlFor="themeSelect">Choose Theme</label>
              <select
                id="themeSelect"
                value={theme}
                onChange={handleThemeChange}
                aria-label="Select theme"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>

              <button type="submit" className="save-button">
                Save Theme
              </button>
            </form>
          </section>
        )}

        {activeTab === "language" && (
          <section className="settings-content">
            <h3>Language</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveLanguage();
              }}
              className="settings-form"
            >
              <label htmlFor="languageSelect">Select Language</label>
              <select
                id="languageSelect"
                value={language}
                onChange={handleLanguageChange}
                aria-label="Select language"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
              </select>

              <button type="submit" className="save-button">
                Save Language
              </button>
            </form>
          </section>
        )}

        {activeTab === "notifications" && (
          <section className="settings-content">
            <h3>Notifications</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveNotifications();
              }}
              className="settings-form"
            >
              <label>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationChange}
                />
                Email Notifications
              </label>

              <label>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={notifications.smsNotifications}
                  onChange={handleNotificationChange}
                />
                SMS Notifications
              </label>

              <button type="submit" className="save-button">
                Save Notifications
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
};

export default SettingsPage;
