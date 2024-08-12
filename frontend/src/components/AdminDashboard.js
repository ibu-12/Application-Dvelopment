import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../pages/css/AdminDashboard.css';
import profilePic from '../pages/C1.jpg'; // Ensure this image is present
import { logoutUser } from '../redux/actions'; // Import your logout action
import AddProductForm from './AddProductForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentList from './AllPayments';

const AdminDashboard = () => {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', age: '' ,password: ''});
  const [editingUser, setEditingUser] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); // State for editing products
  const [productFormData, setProductFormData] = useState({ productName: '', description: '', price: '', size: '' });
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('userInfo')) || []
  );
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  const navigate = useNavigate();
  const apiUrl = "http://localhost:8080/api/users";

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
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('productInfo');
    navigate('/login', { replace: true });
    window.history.pushState(null, '', window.location.origin);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, '', window.location.origin);
    });
    dispatch(logoutUser());
    navigate('/login');
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        'http://127.0.0.1:8080/api/users/getAllUsers',
        config
      );
      setUserData(response.data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        'http://127.0.0.1:8080/api/product/getAllProducts',
        config
      );
      setProductData(response.data);
      localStorage.setItem('productInfo', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Do you want to delete this user?");
    if (confirmDelete) {
      const password = prompt("Please enter the password to confirm deletion:");
      if (password === "DELETEADMIN") {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          // Delete user from backend
          await axios.delete(`http://127.0.0.1:8080/api/users/deleteUserById/${userId}`, config);

          // Remove user from local state and storage
          const updatedUserData = userData.filter(user => user.id !== userId);
          setUserData(updatedUserData);
          localStorage.setItem('userInfo', JSON.stringify(updatedUserData));
          
          // Notify user
          toast.success('User deleted successfully!');
        } catch (error) {
          console.error('Error deleting user:', error);
          toast.error('Error deleting user.');
        }
      } else {
        alert("Incorrect password. User not deleted.");
      }
    }
  };

  const handleEdit = (admin) => {
    // Show confirmation alert
    const confirmUpdate = window.confirm('Do you want to update the details?');

    if (confirmUpdate) {
      // Prompt for password
      const password = prompt('Please enter the password to confirm the update:');

      if (password === "USERDETAILUPDATE") {
        // If password is correct, set the user for editing
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
      await axios.put(`${apiUrl}/updateUserById/${userId}`, formData, config);
      setUserData(userData.map(user => (user.id === userId ? { ...user, ...formData } : user)));
      setEditingUser(null);
      toast.success('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user.');
    }
  };
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductFormData({
      productName: product.productName,
      description: product.description,
      price: product.price,
      size: product.size,
      productimage: product.productimage
    });
  };
  const handleUpdateProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://127.0.0.1:8080/api/product/updateProduct/${productId}`, productFormData, config);
      setProductData(productData.map(product => (product.productId === productId ? { ...product, ...productFormData } : product)));
      setEditingProduct(null);
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product.');
    }
  };
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Do you want to delete this product?");
    if (confirmDelete) {
      const password = prompt("Please enter the password to confirm deletion:");
      if (password === "DELETEPRODUCT") {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          // Delete product from backend
          await axios.delete(`http://127.0.0.1:8080/api/product/deleteProductById/${productId}`, config);

          // Remove product from local state
          const updatedProductData = productData.filter(product => product.productId !== productId);
          setProductData(updatedProductData);
          
          // Notify user
          toast.success('Product deleted successfully!');
        } catch (error) {
          console.error('Error deleting product:', error);
          toast.error('Error deleting product.');
        }
      } else {
        alert("Incorrect password. Product not deleted.");
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (activeSection === 'user-info' && userData.length === 0) {
      fetchData();
    }

    if (activeSection === 'products') {
      fetchProductData();
    }
  }, [activeSection, userData.length]);

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-profile">
          <img src={profilePic} alt="Profile" className="admin-profile-pic" />
          <p>Hi, Ibu</p>
        </div>
        <nav className="admin-nav">
          <Link to="#" onClick={() => setActiveSection('dashboard')}>
            Dashboard
          </Link>
          <button onClick={() => setActiveSection('orders')}>Payments</button>
          <Link to="#" onClick={() => setActiveSection('add-product')}>
            Add Products
          </Link>
          <Link to="#" onClick={() => setActiveSection('user-info')}>
            User Info
          </Link>
          <Link to="#" onClick={() => setActiveSection('admin-info')}>
            ADMIN Info
          </Link>
          <Link to="#" onClick={() => setActiveSection('products')}>
            Products
          </Link>
          <button onClick={handleLogout} className="admin-logout">
            Logout
          </button>
        </nav>
      </div>
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="topbar-left">
            {/* <Link to="/" className="admin-home-link">
              Home
            </Link> */}
          </div>
          <div className="admin-user-info">
            <img src={profilePic} alt="Profile" className="admin-profile-icon" />
            <span className="admin-username">Ibu</span>
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
          {activeSection === 'orders' && <PaymentList/>}
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
          {activeSection === 'add-product' && (
            <AddProductForm />
          )}
          {activeSection === 'user-info' && (
            <div className="admin-user-info-section">
              <h1 className="admin-dashboard-heading">User Info</h1>
              <table className="admin-user-info-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Password</th>
                    <th>Roles</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData
                  .filter(user => user.roles === 'USER')
                  .map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.password}</td>
                      <td>{user.roles}</td>
                      <td>
                        
                        <button
                          className="admin-delete-button"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeSection === 'admin-info' && (
            <div className="admin-user-info-section">
              <h1 className="admin-dashboard-heading">Admin Info</h1>
              <table className="admin-user-info-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Password</th>
                    <th>Roles</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData
                  .filter(user => user.roles === 'ADMIN')
                  .map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.password}</td>
                      <td>{user.roles}</td>
                      <td>
                        <button
                          className="admin-edit-button"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        {/* <button
                          className="admin-delete-button"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {editingUser && (
  <div className="edit-form-container">
    <h2 className="edit-form-title">Edit Admin</h2>
    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(editingUser.id); }} className="edit-form">
      <label className="edit-form-label">
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="edit-form-input" />
      </label>
      <label className="edit-form-label">
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="edit-form-input" />
      </label>
      <label className="edit-form-label">
        Mobile:
        <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} className="edit-form-input" />
      </label>
      <label className="edit-form-label">
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="edit-form-input" />
      </label>
      <div className="edit-form-buttons">
        <button type="submit" className="edit-form-submit-btn">Update</button>
        <button type="button" onClick={() => setEditingUser(null)} className="edit-form-cancel-btn">Cancel</button>
      </div>
    </form>
  </div>
)}

            </div>
          )}
           {activeSection === 'products' && (
  <div className="products-section">
    <h1 className="products-title">Products</h1>
    <table className="products-table">
      <thead>
        <tr>
          <th>ProductId</th>
          <th>ProductImage</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Size</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {productData.map((product, index) => (
          <tr key={index} className="product-row">
            <td className="product-name">{product.productId}</td>
            <td className="product-name"><img 
                  src={product.productimage} 
                  alt={product.productName} 
                  className="admin-product-image" 
                  onError={(e) => {
                    e.target.src = '/path/to/default-image.jpg'; // Fallback image
                  }}
                /></td>
            <td className="product-name">{product.productName}</td>
            <td className="product-description">{product.description}</td>
            <td className="product-price">{product.price}</td>
            <td className="product-price">{product.size}</td>
            <td className="product-actions">
            <td>
                        <button
                          className="admin-edit-button"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-delete-button"
                          onClick={() => handleDeleteProduct(product.productId)}
                        >
                          Delete
                        </button>
                      </td>
            </td>
          </tr>
        ))}
        {editingProduct && (
          <div className="edit-form-container">
            <h3 className="edit-form-title">Edit Product</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(editingProduct.productId);
              }}
              className="edit-form"
            >
              <input
                type="text"
                placeholder="Product Name"
                value={productFormData.productName}
                onChange={(e) => setProductFormData({ ...productFormData, productName: e.target.value })}
                className="edit-form-input"
              />
              <input
                type="text"
                placeholder="Description"
                value={productFormData.description}
                onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                className="edit-form-input"
              />
              <input
                type="text"
                placeholder="Price"
                value={productFormData.price}
                onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                className="edit-form-input"
              />
              <input
                type="text"
                placeholder="Size"
                value={productFormData.size}
                onChange={(e) => setProductFormData({ ...productFormData, size: e.target.value })}
                className="edit-form-input"
              />
              <input
                type="text"
                placeholder="URL"
                value={productFormData.productimage}
                onChange={(e) => setProductFormData({ ...productFormData, productimage: e.target.value })}
                className="edit-form-input"
              />
              <button type="submit" className="edit-form-submit-btn">Update</button>
              <button type="button" onClick={() => setEditingProduct(null)} className="edit-form-cancel-btn">Cancel</button>
            </form>
          </div>
        )}
      </tbody>
    </table>
  </div>
)}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
