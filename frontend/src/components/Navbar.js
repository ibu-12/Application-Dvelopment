import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions'; // Adjust the import path as needed
import '../pages/css/Navbar.css';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()); // Call the action to log out the user
    navigate('/'); // Redirect to the home page or login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Fashion Rental</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            {user.isAdmin && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        )}
        <li>
          <Link to="/sustainability">Sustainability</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
