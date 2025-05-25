import React, { useEffect, useState } from "react";
import "../styles/DateTimeDisplay.css"; 

const DateTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentTime.toLocaleDateString(undefined, options);
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className="date-time-container">
      <span className="date">{formattedDate}</span>
      <span className="time">{formattedTime}</span>
    </div>
  );
};

export default DateTimeDisplay;
