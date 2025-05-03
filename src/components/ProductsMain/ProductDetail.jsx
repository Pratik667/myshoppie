import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const location = useLocation();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (location.state?.productdata) {
      setProduct(location.state.productdata);
    }
  }, [location]);

  if (!product) return <p>Loading product details...</p>;
  const formattedDescription = product.description
    ? product.description
        .split("\\n")
        .map((line) => line.replace(/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"))
        .join("<br>")
    : "";
  return (
    <div className="product-container">
      <div className="product-top">
        <div className="product-left">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>

        <div className="product-right">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-brand">
            Brand: <strong>{product.brand}</strong>
          </p>
          <p className="product-category">
            Category: <strong>{product.category}</strong>
          </p>
          <h2 className="product-price">₹{product.price.toLocaleString()}</h2>
          <p className="product-date">
            <em>
              Listed on: {new Date(product.createdAt).toLocaleDateString()}
            </em>
          </p>
        </div>
      </div>

      <hr className="divider" />

      <div className="product-description">
        <h3>Product Description</h3>
        <p dangerouslySetInnerHTML={{ __html: formattedDescription }}></p>
      </div>
    </div>
  );
};

export default ProductDetail;
