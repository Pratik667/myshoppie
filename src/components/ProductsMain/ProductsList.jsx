import { useEffect, useState, useMemo } from "react";
import axios from "axios"; // Import Axios
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import FilterPanel from "./FilterPanel";

const ProductsList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [filters, setFilters] = useState({
    event: new Set(),
    category: new Set(),
    brand: new Set(),
    sortOrder: "asc",
  });
  const location = useLocation();

  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    let filtered = products.filter((p) => {
      const matchEvent = filters.event.size === 0 || filters.event.has(p.event.toLowerCase().trim());
      const matchCategory = filters.category.size === 0 || filters.category.has(p.category.toLowerCase().trim());
      const matchBrand = filters.brand.size === 0 || filters.brand.has(p.brand.toLowerCase().trim());
      return matchEvent && matchCategory && matchBrand;
    });

    return filtered.sort((a, b) => {
      const d1 = new Date(a.updatedAt);
      const d2 = new Date(b.updatedAt);
      return filters.sortOrder === "asc" ? d1 - d2 : d2 - d1;
    });
  }, [products, filters]);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const newSet = new Set(prev[type]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [type]: newSet };
    });

  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sortOrder: e.target.value }));
  };

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
      if (response.data.length) {
        const uniqueEvents = [
          ...new Set(
            response.data
              .map(e =>
                typeof e.event === 'string' ? e.event.toLowerCase().trim() : ""
              )
              .filter(e => e !== "")
          )
        ];
        const uniqueBrands = [
          ...new Set(
            response.data
              .map(e =>
                typeof e.brand === 'string' ? e.brand.toLowerCase().trim() : ""
              )
              .filter(e => e !== "")
          )
        ];
        const uniqueCategory = [
          ...new Set(
            response.data
              .map(e =>
                typeof e.category === 'string' ? e.category.toLowerCase().trim() : ""
              )
              .filter(e => e !== "")
          )
        ];
        setEvent(uniqueEvents);
        setBrand(uniqueBrands);
        setCategory(uniqueCategory);
        setFilters((prev) => ({
          ...prev,
          category: category ? new Set([category.toLowerCase().trim()]) : new Set(),
          brand: brand ? new Set([brand.toLowerCase().trim()]) : new Set(),
          event: event ? new Set([event.toLowerCase().trim()]) : new Set(),
         }));
      }
    } catch (error) {
      setError("No Products Found");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [location]);


  return (
    <section className="product-list">
    
      <FilterPanel
  filters={filters}
  event={event}
  category={category}
  brand={brand}
  handleSortChange={handleSortChange}
  handleCheckboxChange={handleCheckboxChange}
/>
      <div className="products">
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
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default ProductsList;
