import React from 'react';

const Product = ({ title, description, thumbnail }) => {
    return (
        <tr className="product">
            <td>{title}</td>
            <td>{description}</td>
            <td>
                <img src={thumbnail} alt="Icon"  />
            </td>
        </tr>
    );
};

export default Product;
