import React from 'react'
import BtnRender from './BtnRender'

import './ProductItem.css'

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            <img src={product.images.url} alt="" />

            <div className="product_box">
                <h2 title={product.title}>{capitalizeFirstLetter(product.title)}</h2>
                <span>₹{product.price}</span>
                <p>{product.description}</p>
            </div>

            
            <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
    )
}

export default ProductItem