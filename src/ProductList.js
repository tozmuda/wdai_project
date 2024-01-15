import React, { useState } from 'react';
import UpdateProductModal from './UpdateProductModal';
import shoppingCartImage from './css/shopping-cartW.png';
import deleteImage from './css/delete2.png';
import updateImage from './css/system-update2.png';
import './css/ProductList.css'
const ProductList = ({ products, onUpdateProduct, onDeleteProduct, onAddToCart }) => {
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
    if (onDeleteProduct) {
      onDeleteProduct(productId);
    }
  };

  const addToCart = (productId) => {
    if (onAddToCart) {
      onAddToCart(productId);
    }
  };

  return (
      <tbody>
      {products.map((product) => (
          <tr key={product.id}>
            <td id="icon">
              <img src={product.thumbnail} alt="Product Icon"/>
            </td>
            <td id="title">{product.title}</td>
            <td id="description">{product.description}</td>
            <td>
              <button onClick={() => openUpdateModal(product)}>
                <img src={updateImage} alt="Update" style={{maxWidth: '25px', maxHeight: '25px'}}/>
              </button>
            </td>
            <td>
              <button onClick={() => deleteProduct(product.id)}>
                <img src={deleteImage} alt="Delete" style={{maxWidth: '25px', maxHeight: '25px'}}/>
              </button>
            </td>
            <td>
              <button onClick={() => addToCart(product.id)}>
                <img src={shoppingCartImage} alt="Add to cart" style={{maxWidth: '25px', maxHeight: '25px'}}/>
              </button>
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