import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import '../pages/css/LandingPage.css';

const LandingPage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Welcome to Fashion Rental and Clothing Swapping</h2>
        {user && <p>Hello, {user.username}</p>}
        <div className="content">
          <h3>How It Works</h3>
          <p>
            Our platform allows you to rent or swap clothing items with others. Browse through available items, make a selection, and enjoy wearing something new without the need to buy. When you're done, simply return or swap the item.
          </p>
          <h3>Benefits</h3>
          <ul>
            <li>Save money by renting instead of buying</li>
            <li>Access to a wide variety of fashion items</li>
            <li>Reduce waste by swapping clothes you no longer need</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
