// components/CustomDropdown.js
import React, { useState, useRef, useEffect } from "react";
import "../styles/customDropdown.css";

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleOptionClick = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
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
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {options.find((opt) => opt.value === value)?.label || "Select"}
        <span className="arrow">&#9662;</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={value === opt.value ? "active" : ""}
              onClick={() => handleOptionClick(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
