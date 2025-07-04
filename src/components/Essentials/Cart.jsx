import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      const { id: userId } = jwtDecode(token);
      fetchCart(userId);
    }
  }, [token]);

  const fetchCart = async (userId) => {
    try {
      const response = await axios.get(
        `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCart(response.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQty) => {
    try {
      const { id: userId } = jwtDecode(token);
      await axios.post(
        `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/cart/add`,
        {
          userId,
          productId,
          quantity: newQty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchCart(userId);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const removeItem = async (productId, newQty) => {
    try {
      const { id: userId } = jwtDecode(token);
      await axios.post(
        `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/cart/remove`,
        {
          userId,
          productId,
          quantity: newQty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchCart(userId);
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  useEffect(() => {
    if (!cart || !cart.items) return;
    const nullItems = cart.items.filter((item) => item.product === null);
    if (nullItems.length === 0) return;

    const { id: userId } = jwtDecode(token);

    nullItems.forEach((item) => {
      axios
        .post(
          `https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/cart/remove`,
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
  }, [cart, token]);

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

  const validItems = cart?.items?.filter((item) => item.product !== null) || [];

  if (validItems.length === 0)
    return <h2 className="cart-container">Your cart is empty.</h2>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {validItems.map((item) => (
        <div className="cart-item" key={item._id}>
          <img src={item.product.image} alt={item.product.name} />
          <div className="cart-item-info">
            <h4 className="product-name">{item.product.name}</h4>
            <p>₹{item.product.price}</p>
            <div className="action-button">
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.product._id, -1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product._id, 1)}>
                  +
                </button>
              </div>
              <DeleteIcon
                className="remove-btn"
                onClick={() => removeItem(item.product._id, item.quantity - 1)}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>
          Cart Total: ₹
          {validItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0,
          )}
        </h3>
      </div>
    </div>
  );
};

export default Cart;
