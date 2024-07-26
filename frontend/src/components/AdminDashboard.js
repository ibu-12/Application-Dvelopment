import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../pages/css/AdminDashboard.css'; // Import the CSS file
import profilePic from '../pages/C1.jpg'; // Ensure this image is present

const AdminDashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-profile">
          <img src={profilePic} alt="Profile" className="admin-profile-pic" />
          <p>Hi, {user.username}</p>
        </div>
        <nav className="admin-nav">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/rentals">Rentals</Link>
          <Link to="/admin/swappings">Swappings</Link>
        </nav>
      </div>
      <div className="admin-main">
        <div className="admin-topbar">
        <div className="topbar-left">
          <Link to="/" className="home-link">Home</Link>
        </div>
          <div className="admin-user-info">
            <i className="admin-profile-icon"></i>
            <span className="admin-username">{user.username}</span>
          </div>
        </div>
        <div className="admin-content">
          <h1>Welcome to the Admin Dashboard</h1>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
