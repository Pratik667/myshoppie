import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Cart.css";

const Wishlist = () => {
 const [wishlist, setWishlist] = useState(null);
   const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt")

 useEffect(() => {
     if (token) {
       const { id: userId } = jwtDecode(token);
       fetchWishlist(userId);
     }
   }, [token]);

   const fetchWishlist = async (userId) => {
    try {
      const response = await axios.get(
        `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/wishlist/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(response.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

    const removeItem = async (productId) => {
    try {
      const { id: userId } = jwtDecode(token);
      await axios.post(
        `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/wishlist/remove`,
        {
          userId,
          productId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchWishlist(userId);
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  if (loading) return <div className="loader-container">
    <img
      src="./assets/mainloader.gif"
      alt="Loading..."
      className="loader"
    />
  </div>;
  if (!wishlist || wishlist.items.length === 0) return <h2 className="cart-container">Your wishlist is empty.</h2>;


  return <div className="cart-container">
      <h2>Your Wishlist</h2>
      {wishlist.items.map((item) => (
        <div className="cart-item" key={item._id}>
          <img src={item.product.image} alt={item.product.name} />
          <div className="cart-item-info">
            <h4 className="product-name">{item.product.name}</h4>
            <p>₹{item.product.price}</p>
            <div className='action-button'>
              {/* <div className="quantity-controls">
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, -1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product._id, 1)
                  }
                >
                  +
                </button>
              </div> */}
              <DeleteIcon className="remove-btn" onClick={() => removeItem(item.product._id)} />
            </div>
          </div>
        </div>
      ))}
      {/* <div className="cart-total">
        <h3>Cart Total: ₹{cart.totalPrice}</h3>
      </div> */}
    </div>
};

export default Wishlist;
