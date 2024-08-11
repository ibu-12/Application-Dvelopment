import React, { useState } from 'react';
import '../pages/css/PaymentForm.css'; // Ensure this CSS file is present for styling

const PaymentForm = ({ amount, onPayment }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');

  const handlePayment = () => {
    // Implement payment logic here
    alert('Payment Successful');
    onPayment();
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
      <button onClick={handlePayment} className="payment-form-button">Pay</button>
    </div>
  );
};

export default PaymentForm;
