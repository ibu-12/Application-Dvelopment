import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../pages/css/AdminDashboard.css';
import profilePic from '../pages/C1.jpg'; // Ensure this image is present
import { logoutUser } from '../redux/actions'; // Import your logout action

const AdminDashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Sample data for the charts
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Views',
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Earnings',
        data: [150, 200, 250, 300, 350, 400, 450],
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  // Sample data for the table
  const rentals = [
    { name: 'John Doe', price: '$100', profit: '$20', date: '2024-07-01' },
    { name: 'Jane Smith', price: '$150', profit: '$30', date: '2024-07-02' },
    { name: 'Mike Johnson', price: '$200', profit: '$40', date: '2024-07-03' },
    { name: 'Emily Davis', price: '$250', profit: '$50', date: '2024-07-04' },
    { name: 'Chris Brown', price: '$300', profit: '$60', date: '2024-07-05' },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-profile">
          <img src={profilePic} alt="Profile" className="admin-profile-pic" />
          <p>Hi, {user.username}</p>
        </div>
        <nav className="admin-nav">
          <Link to="#" onClick={() => setActiveSection('dashboard')}>Dashboard</Link>
          <Link to="#" onClick={() => setActiveSection('rentals')}>Rentals</Link>
          <Link to="#" onClick={() => setActiveSection('swappings')}>Swappings</Link>
          <Link to="#" onClick={handleLogout} className="admin-logout">Logout</Link>
        </nav>
      </div>
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-left">
            <Link to="/" className="admin-home-link">Home</Link>
          </div>
          <div className="admin-user-info">
            <i className="admin-profile-icon"></i>
            <span className="admin-username">{user.username}</span>
          </div>
        </div>
        <div className="admin-content">
          {activeSection === 'dashboard' && (
            <div>
              <h1 className="admin-dashboard-heading">Dashboard</h1>
              <div className="admin-card-row">
                <div className="admin-card">
                  <h2>1234</h2>
                  <p>Daily Views</p>
                </div>
                <div className="admin-card">
                  <h2>567</h2>
                  <p>Rentals</p>
                </div>
                <div className="admin-card">
                  <h2>89</h2>
                  <p>Swappings</p>
                </div>
                <div className="admin-card">
                  <h2>₹12345</h2>
                  <p>Earnings</p>
                </div>
              </div>
              <div className="admin-charts-row">
                <div className="admin-chart-container">
                  <Line data={lineData} />
                </div>
                <div className="admin-chart-container">
                  <Bar data={barData} />
                </div>
              </div>
            </div>
          )}
          {activeSection === 'rentals' && (
            <div className="admin-recent-rentals">
              <h1 className="admin-recent-rentals-heading">Recent Rentals</h1>
              <table className="admin-rentals-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Profit</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.map((rental, index) => (
                    <tr key={index}>
                      <td>{rental.name}</td>
                      <td>{rental.price}</td>
                      <td>{rental.profit}</td>
                      <td>{rental.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Handle other sections like 'swappings' similarly */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
