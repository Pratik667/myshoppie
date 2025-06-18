import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Cart.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt");

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
        },
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
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchWishlist(userId);
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

   useEffect(() => {
    if (!wishlist || !wishlist.items) return;
    const nullItems = wishlist.items.filter((item) => item.product === null);
    if (nullItems.length === 0) return;

    const { id: userId } = jwtDecode(token);

    nullItems.forEach((item) => {
      axios
        .post(
          `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/wishlist/remove`,
          {
            userId,
            productId: item._id, // assuming item._id is the reference for cart entry
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          console.log(`Removed invalid cart item: ${item._id}`);
        })
        .catch((err) => {
          console.error("Failed to auto-remove null cart item:", err);
        });
    });
  }, [wishlist, token]);

  if (loading)
    return (
      <div className="loader-container">
        <img
          src="./assets/mainloader.gif"
          alt="Loading..."
          className="loader"
        />
      </div>
    );

    const validItems = wishlist?.items?.filter((item) => item.product !== null) || [];

  if (validItems.length === 0)
    return <h2 className="cart-container">Your wishlist is empty.</h2>;

  return (
    <div className="cart-container">
      <h2>Your Wishlist</h2>
      {validItems.map((item) => (
        <div className="cart-item" key={item._id}>
          <img src={item.product.image} alt={item.product.name} />
          <div className="cart-item-info">
            <h4 className="product-name">{item.product.name}</h4>
            <p>₹{item.product.price}</p>
            <div className="action-button">
              <DeleteIcon
                className="remove-btn"
                onClick={() => removeItem(item.product._id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
