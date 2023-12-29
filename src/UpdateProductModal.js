import React, { useState } from 'react';

const UpdateProductModal = ({ product, onUpdate, onClose }) => {
  const [updatedTitle, setUpdatedTitle] = useState(product.title);
  const [updatedDescription, setUpdatedDescription] = useState(product.description);

  const handleUpdate = () => {

    alert(`Updating product with ID ${product.id} with new title: ${updatedTitle}`);
    onUpdate(product.id, { title: updatedTitle, description: updatedDescription });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Product</h2>
        <label>Title:</label>
        <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
        <label>Description:</label>
        <textarea value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default UpdateProductModal;
