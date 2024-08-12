import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/css/AddProductForm.css'; // Create this CSS file for styling
import axios from 'axios';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productSize, setProductSize] = useState('');
  const [products, setProducts] = useState([]); // Assuming this is where you're storing product data
  const apiUrl2 = "http://127.0.0.1:8080/api/product"; // Base API URL
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const newProduct = {
        productId:0,
        productName: productName,
        productimage: productImage,
        size: productSize,
        description: productDescription,
        price: productPrice,
      };

      const response = await axios.post(`${apiUrl2}/addProduct`, newProduct, config);
      
      setProducts([...products, response.data]);
      
      // Clear the form fields
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductSize('');
      setProductImage('');
      
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Description:</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Product Image URL:</label>
          <input
            type="text"
            id="productImage"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productSize">Product Size:</label>
          <input
            type="text"
            id="productSize"
            value={productSize}
            onChange={(e) => setProductSize(e.target.value)}
          />
        </div>
        <button type="submit" className="add-product-button">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
