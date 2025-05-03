import React from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {Link} from 'react-router-dom';
const ProductCard = ({product}) => {
    return (
        <Link to={`/pdp`} state={{ productdata: product }}className='product-card' >
            <div className='product-image-box'><img className='product-image' src={product.image} /></div>
            <h3 className='product-title'>
                {product.name}
            </h3>
            <span className='product-price'>
               <CurrencyRupeeIcon/> {product.price}
            </span>
        </Link>
    )
}

export default ProductCard;