import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import '../pages/css/Cart.css';

const Cart = ({ cartItems }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Cart</h1>
      {!showPaymentForm ? (
        <>
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h2 className="cart-item-name">{item.name}</h2>
                    <div className="cart-item-description">
                      <span className="cart-item-size">Size: {item.size}</span>
                      <span className="cart-item-color">Color: {item.color}</span>
                      <span className="cart-item-type">Type: {item.type}</span>
                      {item.type !== 'Swap' && <span className="cart-item-price">Price: {item.price}</span>}
                      <button className="cart-item-remove">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <button onClick={() => setShowPaymentForm(true)} className="cart-pay-button">Pay</button>
          </div>
        </>
      ) : (
        <PaymentForm amount={`$${totalAmount.toFixed(2)}`} onPayment={() => setShowPaymentForm(false)} />
      )}
    </div>
  );
};

export default Cart;
