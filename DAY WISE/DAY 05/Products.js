import React, { useState } from 'react';
import '../pages/css/Products.css'; // Import the CSS file for products
import p1 from '../pages/p1.jpg'; // Ensure this image is present
import p2 from '../pages/p2.jpg'; // Ensure this image is present
import p3 from '../pages/p3.jpg'; // Ensure this image is present
import p4 from '../pages/p4.jpg'; // Ensure this image is present
import p5 from '../pages/p5.jpg'; // Ensure this image is present
import p6 from '../pages/p6.jpg'; // Ensure this image is present
import p7 from '../pages/p7.jpg'; // Ensure this image is present
import p8 from '../pages/p8.jpg'; // Ensure this image is present
import p9 from '../pages/p9.jpg'; // Ensure this image is present

const Products = ({ addToCart }) => {
  // Sample data for the products
  const products = [
    { id: 'p001', image: p1, name: 'Red Dress', price: '$50', size: 'M', color: 'Red', type: 'Rent', duration: 'Day' },
    { id: 'p002', image: p2, name: 'Blue Jeans', price: '$40', size: 'L', color: 'Blue', type: 'Rent', duration: 'Week' },
    { id: 'p003', image: p3, name: 'Green Jacket', price: '$60', size: 'XL', color: 'Green', type: 'Rent', duration: 'Month' },
    { id: 'p004', image: p4, name: 'Yellow Top', price: '$30', size: 'S', color: 'Yellow', type: 'Rent', duration: 'Day' },
    { id: 'p005', image: p5, name: 'Black Shoes', price: '$80', size: '42', color: 'Black', type: 'Rent', duration: 'Week' },
    { id: 'p006', image: p6, name: 'White Hat', price: '$20', size: 'One Size', color: 'White', type: 'Rent', duration: 'Month' },
    { id: 'p007', image: p7, name: 'Purple Scarf', price: '$25', size: 'One Size', color: 'Purple', type: 'Rent', duration: 'Day' },
    { id: 'p008', image: p8, name: 'Orange Skirt', price: '$35', size: 'M', color: 'Orange', type: 'Rent', duration: 'Week' },
    { id: 'p009', image: p9, name: 'Pink Blouse', price: '$45', size: 'L', color: 'Pink', type: 'Rent', duration: 'Month' },
  ];

  // State for filters
  const [filter, setFilter] = useState({
    size: '',
    color: '',
    duration: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    return (
      (filter.size ? product.size === filter.size : true) &&
      (filter.color ? product.color === filter.color : true) &&
      (filter.duration ? product.duration === filter.duration : true)
    );
  });

  return (
    <div className="products-container">
      <h1 className="products-heading">Products</h1>

      <div className="products-filter">
        <select name="size" value={filter.size} onChange={handleFilterChange}>
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="One Size">One Size</option>
          <option value="42">42</option>
        </select>

        <select name="color" value={filter.color} onChange={handleFilterChange}>
          <option value="">All Colors</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Purple">Purple</option>
          <option value="Orange">Orange</option>
          <option value="Pink">Pink</option>
        </select>

        <select name="duration" value={filter.duration} onChange={handleFilterChange}>
          <option value="">All Durations</option>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            {product.type === 'Rent' && <p className="product-price">{product.price}</p>}
            <p className="product-size">Size: {product.size}</p>
            <p className="product-color">Color: {product.color}</p>
            <p className="product-duration">Duration: {product.duration}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
