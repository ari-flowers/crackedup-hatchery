import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../Dashboard.css'

function Dashboard() {
  const { theme } = useContext(ThemeContext);

  const cardStyle = {
    backgroundColor: theme === 'dark' ? '#343a40' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#343a40',
    borderColor: theme === 'dark' ? '#ffffff' : '#343a40',
  };

  return (
    <div className="dashboard-container">
      <h1 style={{ color: cardStyle.color }}>Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card" style={cardStyle}>
          <h2>Total Clicks</h2>
          <p>0</p>
        </div>
        <div className="dashboard-card" style={cardStyle}>
          <h2>Total Dragons</h2>
          <p>0</p>
        </div>
        <div className="dashboard-card" style={cardStyle}>
          <h2>User Rank</h2>
          <p>N/A</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
