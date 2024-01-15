import React from 'react';
import './css/ShoppingCart.css';

const ShoppingCart = ({ cart, cartTotal, expandedDescriptions, editingProduct, increaseCartQuantity, removeFromCart, handleEditTitleChange, handleEditDescriptionChange, handleDoneEditing, setExpandedDescriptions, setEditingProduct }) => {
    return (
        <div id="shoppingCart">
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        <img src={item.thumbnail} alt="Icon" />
                        <div id="edit">
                            {editingProduct && editingProduct.id === item.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingProduct.title}
                                        onChange={handleEditTitleChange}
                                    /><br />
                                    <textarea
                                        value={editingProduct.description}
                                        onChange={handleEditDescriptionChange}
                                    /> <br />
                                    <button onClick={handleDoneEditing}>Done Editing</button>
                                </>
                            ) : (
                                <>
                                    <strong>{item.title}</strong> <br />
                                    {item.description}
                                    <button onClick={() => setEditingProduct(item)}>Edit</button>
                                </>
                            )}
                        </div>
                        <div >
                        Quantity: {item.quantity}
                            <button onClick={() => increaseCartQuantity(item.id)}>+</button>
                            <button onClick={() => removeFromCart(item.id)}>-</button>
                            Price: {item.price * item.quantity} <br />
                        </div>
                    </li>
                ))}
            </ul>
            <p>Total: {cartTotal}</p>
        </div>
    );
};

export default ShoppingCart;
