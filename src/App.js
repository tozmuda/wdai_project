import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import UpdateProductModal from './UpdateProductModal';
import AddProductForm from './AddProductForm';
import ShoppingCart from "./ShoppingCart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchInput, setSearchInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Calculate the total sum whenever the cart changes
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cart]);

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

  const addToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    if (selectedProduct) {
      const existingCartItem = cart.find((item) => item.id === productId);
      if (existingCartItem) {
        setCart((prevCart) => prevCart.map((item) => item.id === productId ?
            { ...item, quantity: item.quantity + 1 } : item));
      } else {
        setCart((prevCart) => [...prevCart, { ...selectedProduct, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (productId) => {
    const selectedProduct = cart.find((item) => item.id === productId);
    if (selectedProduct && selectedProduct.quantity > 1) {
      setCart((prevCart) =>
          prevCart.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          )
      );
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }
  };

  const handleEditTitleChange = (e) => {
    setEditingProduct((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleEditDescriptionChange = (e) => {
    setEditingProduct((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleDoneEditing = () => {
    const index = cart.findIndex((item) => item.id === editingProduct.id);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index] = editingProduct;
      setCart(updatedCart);
    }
    setEditingProduct(null);
  };

  const increaseCartQuantity = (productId) => {
    const selectedCartItem = cart.find((item) => item.id === productId);

    if (selectedCartItem) {
      const updatedCart = cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    }
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
        <AddProductForm onAddProduct={addProduct}/>
        <div id="productList">
          <table>
            <thead>
            <tr>
              <th>Nazwa</th>
              <th>Opis</th>
              <th>Ikona</th>
              <th>Action</th>
            </tr>
            </thead>
            <ProductList
                products={filteredProducts}
                onUpdateProduct={(productId, updatedData) => updateProduct(productId, updatedData)}
                onDeleteProduct={(productId) => deleteProduct(productId)}
                onAddToCart={(productId) => addToCart(productId)}
            />
          </table>
        </div>
        <ShoppingCart
            cart={cart}
            cartTotal={cartTotal} // Pass cartTotal as a prop
            expandedDescriptions={expandedDescriptions}
            editingProduct={editingProduct}
            increaseCartQuantity={increaseCartQuantity}
            removeFromCart={removeFromCart}
            handleEditTitleChange={handleEditTitleChange}
            handleEditDescriptionChange={handleEditDescriptionChange}
            handleDoneEditing={handleDoneEditing}
            setExpandedDescriptions={setExpandedDescriptions}
            setEditingProduct={setEditingProduct}
        />
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
