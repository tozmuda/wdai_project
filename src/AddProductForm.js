import React, { useState } from 'react';
import './css/AddProductForm.css';
const AddProductForm = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    thumbnail: '', // You can provide a default thumbnail URL or leave it empty
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {

    if (onAddProduct) {
      onAddProduct(newProduct);
    }

    setNewProduct({
      title: '',
      description: '',
      thumbnail: '',
    });
  };

  return (
    <div id="AddProduct">
      <h2>Add New Product</h2>
      <label>Title:</label>
      <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} />
      <label>Description:</label>
      <textarea name="description" value={newProduct.description} onChange={handleInputChange} />
      <label>Thumbnail URL:</label>
      <input type="text" name="thumbnail" value={newProduct.thumbnail} onChange={handleInputChange} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProductForm;
