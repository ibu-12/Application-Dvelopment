import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../pages/css/RegistrationPage.css';
import axios from 'axios';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiurl="http://127.0.0.1:8080/api/users/createUser";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user = { username, email, phoneNumber, password };
    dispatch(setUser(user));
    const newData= await axios
      .post(apiurl,{
        id:0,
        name: username,
        email: email,
        password: password,
        mobile: phoneNumber,
        roles: "USER"
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error)=>{
        console.error(error);
      });
    if(newData){
      alert("Something went wrong");
    }
    else{
      alert("User created successfully");
      navigate('/login');
    }
  };
  return (
    <div>
      <Navbar />
      <div className="registration-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="registration-field">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="registration-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="registration-field">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="registration-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="registration-field">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="registration-button">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
