import React from 'react';

const Product = ({ title, description, thumbnail }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>
        <img src={thumbnail} alt="Icon" height="50" width="50" />
      </td>
    </tr>
  );
};

export default Product;


