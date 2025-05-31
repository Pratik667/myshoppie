import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category");
        const brand = queryParams.get("brand");
        const event = queryParams.get("event");

        const apiBaseUrl =
          "https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products";
        const apiUrl = brand
          ? `${apiBaseUrl}/brand/${brand}`
          : category
            ? `${apiBaseUrl}/category/${category}`
            : event
              ? `${apiBaseUrl}/event/${event}`
              : apiBaseUrl;

        const response = await axios.get(apiUrl);
        setProducts(response.data);
      } catch (error) {
        setError("No Products Found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  return (
     <section className="product-list">
      {loading ? (
          [...Array(10)].map((_, index) => (
          <div key={index} className="product-card">
            <div className="skeleton product-skeleton"></div>
            <div className="skeleton text-skeleton"></div>
            <div className="skeleton text-skeleton" style={{ width: "60%" }}></div>
          </div>
          ))
      ) : error ? (
        <p>{error}</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (       
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))       
      )}
    </section>
  );
};

export default ProductsList;
