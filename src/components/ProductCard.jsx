import React from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const ProductCard = ({product}) => {
    return (
        <div className='product-card'>
            <div className='product-image-box'><img className='product-image' src={product.image} /></div>
            <h3 className='product-title'>
                {product.name}
            </h3>
            <span className='product-price'>
               <CurrencyRupeeIcon/> {product.price}
            </span>
        </div>
    )
}

export default ProductCard;