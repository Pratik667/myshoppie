import React, { useEffect, useState } from "react";
import axios from "axios";  // Import Axios
import { useLocation } from 'react-router-dom';
import ProductCard from "./ProductCard";

const ProductsList = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const brand = queryParams.get('brand');
    const event = queryParams.get('event');
    const fetchData = async () => {
        try {
            // Fetch the data from the protected endpoint
            let apiUrl = '';
            // Check which query parameter is present and set the URL accordingly
            if (brand) {
                apiUrl = `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products/brand/${brand}`;
            } else if (category) {
                apiUrl = `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products/category/${category}`;
            } else if (event) {
                apiUrl = `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products/event/${event}`;
            } else {
                apiUrl = `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/products`;
            }
            const response = await axios.get(apiUrl);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setError('No Products Found');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchData();
    }, [location]);
    if (loading) {
        return <div>Loading...</div>;  // Show loading while fetching
    }
    if (error) return <p>{error}</p>;
    return (<>
        <div className='product-list'>

            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                 products.map((product) => (<ProductCard key={product._id} product={product} /> )) 
            )}
        </div>

    </>)
}

export default ProductsList;