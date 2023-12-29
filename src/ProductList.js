import React, { useState } from 'react';
import UpdateProductModal from './UpdateProductModal';

const ProductList = ({ products, onUpdateProduct, onDeleteProduct }) => {
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleDescription = (productId) => {
    setExpandedDescriptions((prevExpanded) => {
      const isExpanded = prevExpanded.includes(productId);
      if (isExpanded) {
        return prevExpanded.filter((id) => id !== productId);
      } else {
        return [...prevExpanded, productId];
      }
    });
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
  };

  const deleteProduct = (productId) => {
    // Trigger the onDeleteProduct callback to delete the product
    if (onDeleteProduct) {
      onDeleteProduct(productId);
    }
  };

  return (
    <tbody>
      {products.map((product) => (
        <tr key={product.id}>
          <td>{product.title}</td>
          <td>
            {expandedDescriptions.includes(product.id)
              ? product.description
              : `${product.description.slice(0, 50)}...`}
            <button onClick={() => toggleDescription(product.id)}>
              {expandedDescriptions.includes(product.id) ? 'Read Less' : 'Read More'}
            </button>
          </td>
          <td>
            <img src={product.thumbnail} alt="Product Icon" style={{ maxWidth: '50px', maxHeight: '50px' }} />
          </td>
          <td>
            <button onClick={() => openUpdateModal(product)}>Update</button>
          </td>
          <td>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </td>
        </tr>
      ))}
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onUpdate={onUpdateProduct}
          onClose={closeUpdateModal}
        />
      )}
    </tbody>
  );
};

export default ProductList;

