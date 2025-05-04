import React from "react";
import "./Footer.css"; // Optional: You can create a separate CSS file for styling
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/location">Location</Link>
            </li>
            <li>
              <Link href="/category">Category</Link>
            </li>
            <li>
              <Link href="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link href="/account">Account</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Products</h4>
          <ul>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/sale">Sale</a>
            </li>
            <li>
              <a href="/electronics">Electronic</a>
            </li>
            <li>
              <a href="/house-kitchen">House & Kitchen</a>
            </li>
            <li>
              <a href="/essentials">Essentials</a>
            </li>
            <li>
              <a href="/clothes">Clothes</a>
            </li>
            <li>
              <a href="/bike-car">Bike & Car</a>
            </li>
            <li>
              <a href="/bestsellers">Bestseller</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 JinStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
