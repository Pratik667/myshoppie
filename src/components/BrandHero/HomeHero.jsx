import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductsMain/ProductCard";
import useIsMobile from "../useIsMobile";
import { Link } from "react-router-dom";

const HomeHero = ({ title, type, value }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useIsMobile();
  const visibleCount = isMobile ? 4 : 5;
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products/${type}/${value}`;
      const response = await axios.get(apiUrl);
      setProducts(response.data);
    } catch (error) {
      setError("Failed to load Products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [location]);
  return (
    <section className="home-hero-section-1">
      <h3 className="section-title">{title}</h3>
      <div className="product-list">
        {loading ? (
          [...Array(4)].map((_, index) => (
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
          products
            .slice(0, visibleCount)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
        )}
      </div>
      <Link to={`/products?${type}=${value}`} className="btn btn-view-more">
        View More Products
      </Link>
    </section>
  );
};

export default HomeHero;
