import React, { useState, useRef } from 'react';
import '../pages/css/RegForm.css'; // Make sure to import the CSS file

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPhoneNumber = phoneNumberRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (!enteredUsername || !enteredEmail || !enteredPhoneNumber || !enteredPassword || !enteredConfirmPassword) {
      setErrorMessage('All fields are required.');
    } else if (enteredPassword !== enteredConfirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      // Perform registration logic here
      console.log('Username:', enteredUsername);
      console.log('Email:', enteredEmail);
      console.log('Phone Number:', enteredPhoneNumber);
      console.log('Password:', enteredPassword);
      setErrorMessage('');
      // Clear the form
      setUsername('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            ref={usernameRef}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            ref={phoneNumberRef}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            ref={confirmPasswordRef}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
