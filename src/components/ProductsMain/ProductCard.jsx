import React from "react";
import { Link } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevents Link navigation when clicking icon

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("Please log in to add items to cart.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id; // adjust based on your JWT structure

      const response = await axios.post(
        "https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/cart/add",
        {
          userId,
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Error adding product to cart");
    }
  };

  return (
    <Link to={`/pdp`} state={{ productdata: product }} className="product-card">
      <div className="product-image-box">
        <img className="product-image" src={product.image} alt={product.name} />
        <div className="icon-overlay">
          <ShoppingCartIcon
            className="action-icon"
            titleAccess="Add to Cart"
            onClick={handleAddToCart}
          />
          <FavoriteBorderIcon
            className="action-icon"
            titleAccess="Add to Wishlist"
          />
        </div>
      </div>
      <h3 className="product-title">{product.name}</h3>
      <span className="product-price">
        <CurrencyRupeeIcon /> {product.price}
      </span>
    </Link>
  );
};

export default ProductCard;
