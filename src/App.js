import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import UpdateProductModal from './UpdateProductModal';
import AddProductForm from './AddProductForm';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchInput, setSearchInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const slicedProducts = data.products.slice(0, 30);
        setProducts(slicedProducts);
        setFilteredProducts(slicedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sortData = (order) => {
    setSortOrder(order);
    const productsCopy = [...filteredProducts];

    if (order === 'asc') {
      productsCopy.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'desc') {
      productsCopy.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(productsCopy);
  };

  const searchProducts = () => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredProducts(filteredProducts);
  };

  const updateProduct = (productId, updatedData) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, ...updatedData } : product
    );

    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const deleteProduct = (productId) => {
    
    const updatedProducts = products.filter((product) => product.id !== productId);

    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const addProduct = (newProduct) => {
    
    const newProductId = Date.now();

    const addedProduct = { id: newProductId, ...newProduct };

    setProducts([...products, addedProduct]);
    setFilteredProducts([...products, addedProduct]); 
  };

  return (
    <div>
      <input
        type="text"
        id="searchBar"
        placeholder="Search by title"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={searchProducts}>Search</button>
      <select id="myselect" onChange={(e) => sortData(e.target.value)}>
        <option value="default">default</option>
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>
      <AddProductForm onAddProduct={addProduct} />
      <div id="productList">
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Opis</th>
              <th>Ikona</th>
            </tr>
          </thead>
          <ProductList
            products={filteredProducts}
            onUpdateProduct={(productId, updatedData) => updateProduct(productId, updatedData)}
            onDeleteProduct={(productId) => deleteProduct(productId)}
          />
        </table>
      </div>
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onUpdate={(productId, updatedData) => updateProduct(productId, updatedData)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default App;
