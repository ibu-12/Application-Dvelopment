import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './Navbar';
import '../pages/css/LoginPage.css'; 
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const apiurl = "http://localhost:8080/api/auth/authenticate";
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(apiurl,formData);
      console.log(response);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role);
      localStorage.setItem("user",formData.email);
      const role = localStorage.getItem("role");
      if(role=="ADMIN"){
        toast.success('Logged in successfully!');
      setTimeout(() => {
        const user= {formData, isAdmin:true};
        dispatch(setUser(user));
        navigate('/admin/dashboard');
      }, 1500); 
      }
      else{
        toast.success('Logged in successfully!');
      setTimeout(() => {
        const user= {formData};
        dispatch(setUser(user));
        navigate('/user/dashboard');
      }, 1500); 
      }
      
    } catch (error) {
      console.error(error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="Login" id="Login">
      <NavigationBar />
      <div className="login-container">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                placeholder="Enter email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p className="signup-link">
            New to the account? <Link to="/register">Signup</Link>
          </p>
          {/* <p className="signup-link">
             <Link to="/AdminLogin">Login As an Admin</Link>
          </p> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;