import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../pages/css/PaymentList.css'; // Ensure this CSS file is present for styling

const PaymentList = () => {
  const [paymentData, setPaymentData] = useState([]);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        'http://127.0.0.1:8080/api/payments/getAllPayments',
        config
      );
      setPaymentData(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="payment-list-container">
      <h1 className="payment-list-heading">Payment List</h1>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.accountNumber}</td>
              <td>${payment.amount}</td>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
