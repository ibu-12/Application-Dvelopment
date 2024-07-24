import React from 'react';
import Navbar from './Navbar';
import '../pages/css/HomePage.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Welcome to Fashion Rental and Clothing Swapping</h2>
        <p>
          Discover a new way to enjoy fashion. Rent clothes for special occasions or swap clothes you no longer need. Join our community today!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
