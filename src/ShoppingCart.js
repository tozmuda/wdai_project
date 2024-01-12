import React from 'react';

const ShoppingCart = ({ cart, cartTotal, expandedDescriptions, editingProduct, increaseCartQuantity, removeFromCart, handleEditTitleChange, handleEditDescriptionChange, handleDoneEditing, setExpandedDescriptions, setEditingProduct }) => {    return (
        <div id="shoppingCart">
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        <img src={item.thumbnail} alt="Icon" height="50" width="50" />
                        <div>
                            {editingProduct && editingProduct.id === item.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editingProduct.title}
                                        onChange={handleEditTitleChange}/><br />
                                    <textarea
                                        value={editingProduct.description}
                                        onChange={handleEditDescriptionChange}/> <br />
                                    <button onClick={handleDoneEditing}>Done Editing</button>
                                </>
                            ) : (
                                <>
                                    <strong>{item.title}</strong> <br />
                                    {expandedDescriptions.includes(item.id) ? (
                                        <>
                                            {item.description}{" "}
                                            <button onClick={() => setExpandedDescriptions((prev) => prev.filter((id) => id !== item.id))}>Read Less</button>
                                        </>
                                    ) : (
                                        <>
                                            {item.description.slice(0, 50)}...{" "}
                                            <button onClick={() => setExpandedDescriptions((prev) => [...prev, item.id])}>Read More</button>
                                        </>
                                    )}
                                    <button onClick={() => setEditingProduct(item)}>Edit</button>
                                </>
                            )}
                        </div>
                        Quantity: {item.quantity}
                        <button onClick={() => increaseCartQuantity(item.id)}>+</button>
                        <button onClick={() => removeFromCart(item.id)}>-</button>
                        <br />
                        Price: {item.price * item.quantity} <br />
                    </li>
                ))}
            </ul>
            <p>Total: {cartTotal}</p>
        </div>
    );
};

export default ShoppingCart;
