import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js to work
import '../pages/css/UserDashboard.css'; // Import the CSS file
import profilePic from '../pages/C1.jpg'; // Ensure this image is present
import { logoutUser } from '../redux/actions'; // Import your logout action
import Products from './Products';
import Cart from './Cart';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you have toast for notifications
import PaymentList from './AllPayments';

const UserDashboard = () => {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert("Item Added to cart");
  };
  const [userProfile, setUserProfile] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    window.history.pushState(null, "", window.location.origin);
    window.addEventListener("popstate", function(event) {
      window.history.pushState(null, "", window.location.origin);
    });
    dispatch(logoutUser());
    window.location.href = '/login';
  };

  const fetchUserProfile = async () => {
    try {
      const email = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (email && token) {
        const response = await axios.get('http://localhost:8080/api/users/getAllUsers', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.find(user => user.email === email);
        if (user) {
          const userProfileResponse = await axios.get(`http://localhost:8080/api/users/getUserById/${user.id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          setUserProfile(userProfileResponse.data);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (activeSection === 'user-profile') {
      fetchUserProfile();
    }
  }, [activeSection]);

  const handleEdit = (admin) => {
    const confirmUpdate = window.confirm('Do you want to update the details?');

    if (confirmUpdate) {
      const password = prompt('Please enter the password to confirm the update:');

      if (password === "USERDETAILUPDATE") {
        setEditingUser(admin);
        setFormData({
          name: admin.name,
          email: admin.email,
          mobile: admin.mobile,
          password: admin.password
        });
      } else {
        alert('Incorrect password. Update canceled.');
      }
    } else {
      alert('Update canceled.');
    }
  };

  const handleUpdate = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://localhost:8080/api/users/updateUserById/${userId}`, formData, config);
      setUserProfile({ ...userProfile, ...formData });
      setEditingUser(null);
      toast.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user.');
    }
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
          {/* <button onClick={() => setActiveSection('orders')}>Payments</button> */}
          <button onClick={() => setActiveSection('cart')}>Cart</button>
          <button onClick={() => setActiveSection('products')}>Products</button>
          <button onClick={() => setActiveSection('user-profile')}>User Profile</button>
          <button onClick={handleLogout} className="user-logout">Logout</button>
        </nav>
      </div>
      <div className="user-main">
        <div className="user-topbar">
          <div className="topbar-left">
            {/* <Link to="/" className="user-home-link">Home</Link> */}
          </div>
          <div className="user-user-info">
            <img src={profilePic} className="user-profile-icon" alt="User Icon" />
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
          {activeSection === 'orders' && <PaymentList/>}
          {activeSection === 'cart' && <Cart cartItems={cartItems} />}
          {activeSection === 'products' && <Products addToCart={addToCart} />}
          {activeSection === 'user-profile' && userProfile && (
            <div className="user-profile-section">
              <h1 className="user-profile-heading">User Profile</h1>
              <div className="user-profile-details">
                {editingUser ? (
                  <div>
                    <label>Name: 
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </label>
                    <label>Email: 
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </label>
                    <label>Mobile: 
                      <input
                        type="text"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </label>
                    <label>Password: 
                      <input
                        type="text"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </label>
                    <button onClick={() => handleUpdate(userProfile.id)}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <p><strong>Name:</strong> {userProfile.name}</p>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>Mobile:</strong> {userProfile.mobile}</p>
                    <p><strong>Password:</strong> {userProfile.password || 'N/A'}</p>
                    <button onClick={() => handleEdit(userProfile)}>Edit</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
