import React from 'react';
import '../pages/css/Cart.css'; // Ensure this CSS file is present

const Cart = ({ cartItems }) => {
  return (
    <div className="cart-container">
      <h1 className="cart-heading">Cart</h1>
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
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
