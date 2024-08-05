import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js to work
import '../pages/css/UserDashboard.css'; // Import the CSS file
import profilePic from '../pages/C1.jpg'; // Ensure this image is present
import { logoutUser } from '../redux/actions'; // Import your logout action
import Products from './Products';
import Cart from './Cart';

const UserDashboard = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Sample data for the charts
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Orders',
        data: [15, 20, 30, 40, 25, 35, 50],
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Category A', 'Category B', 'Category C'],
    datasets: [
      {
        label: 'Categories',
        data: [30, 20, 50],
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)', 'rgba(255,206,86,0.2)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
        borderWidth: 1,
      },
    ],
  };

  // Sample data for the table
  const orders = [
    { id: '001', product: 'T-shirt', price: '$20', category: 'Clothing' },
    { id: '002', product: 'Jeans', price: '$30', category: 'Clothing' },
    { id: '003', product: 'Jacket', price: '$50', category: 'Outerwear' },
    { id: '004', product: 'Sneakers', price: '$60', category: 'Footwear' },
    { id: '005', product: 'Hat', price: '$15', category: 'Accessories' },
  ];

  // Sample data for the products
 

  const handleLogout = () => {
    
    window.location.href = '/';
  };

  return (
    <div className="user-dashboard">
      <div className="user-sidebar">
        <div className="user-profile">
          <img src={profilePic} alt="Profile" className="user-profile-pic" />
          <p>Hi, Ibu</p>
        </div>
        <nav className="user-nav">
          <button onClick={() => setActiveSection('dashboard')}>Dashboard</button>
          <button onClick={() => setActiveSection('orders')}>Orders</button>
          <button onClick={() => setActiveSection('offers')}>Offers</button>
          <button onClick={() => setActiveSection('cart')}>Cart</button>
          <button onClick={() => setActiveSection('products')}>Products</button>
          <button onClick={handleLogout} className="user-logout">Logout</button>
        </nav>
      </div>
      <div className="user-main">
        <div className="user-topbar">
          <div className="topbar-left">
            <Link to="/" className="user-home-link">Home</Link>
          </div>
          <div className="user-user-info">
            <img src={profilePic} className="user-profile-icon"></img>
            <span className="user-username">Ibu</span>
          </div>
        </div>
        <div className="user-content">
          {activeSection === 'dashboard' && (
            <div>
              <h1 className="user-dashboard-heading">Dashboard</h1>
              <div className="user-card-row">
                <div className="user-card">
                  <h2>45</h2>
                  <p>No of Orders</p>
                </div>
                <div className="user-card">
                  <h2>$75</h2>
                  <p>Avg Order Value</p>
                </div>
                <div className="user-card">
                  <h2>10</h2>
                  <p>Offers</p>
                </div>
              </div>
              <div className="user-charts-row">
                <div className="user-chart-container">
                  <Bar data={barData} />
                </div>
                <div className="user-chart-container">
                  <Pie data={pieData} />
                </div>
              </div>
              <div className="user-recent-orders">
                <h1 className="user-recent-orders-heading">Recent Orders</h1>
                <table className="user-orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.product}</td>
                        <td>{order.price}</td>
                        <td>{order.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeSection === 'orders' && <div>Orders Content</div>}
          {activeSection === 'offers' && <div>Offers Content</div>}
          {activeSection === 'products' && <Products addToCart={addToCart} />}
          {activeSection === 'cart' && <Cart cartItems={cartItems} />}
          {/* Handle other sections like 'orders' and 'offers' similarly */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
