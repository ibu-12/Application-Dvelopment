import React, { useState } from 'react';
import axios from 'axios';
import '../pages/css/PaymentForm.css'; // Ensure this CSS file is present for styling

const PaymentForm = ({ amount, onPayment }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async () => {
    try {
      // Construct the payment data
      const paymentData = {
        accountNumber: accountNumber,
        amount:amount,
        
      };

      // Get the token from localStorage if required for authentication
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      // Send the POST request to your backend
      await axios.post('http://127.0.0.1:8080/api/payments/addPayment', paymentData, config);

      alert('Payment Successful');
      onPayment();
    } catch (error) {
      setErrorMessage('Payment failed. Please try again.');
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="payment-form-container">
      <h1 className="payment-form-heading">Payment</h1>
      <div className="payment-form-field">
        <label htmlFor="accountNumber">Account Number:</label>
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
      <div className="payment-form-field">
        <label htmlFor="amount">Amount:</label>
        <input type="text" id="amount" value={amount} readOnly />
      </div>
      <div className="payment-form-field">
        <label htmlFor="pin">PIN:</label>
        <input
          type="password"
          id="pin"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>
      {errorMessage && <p className="payment-error">{errorMessage}</p>}
      <button onClick={handlePayment} className="payment-form-button">Pay</button>
    </div>
  );
};

export default PaymentForm;
