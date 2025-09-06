import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const fetchWishlist = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("No token found");

      const { id: userId } = jwtDecode(token);

      const response = await axios.get(
        `${import.meta.env.VITE_DOMAIN_URL}/api/wishlist/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch({ type: "FETCH_WISHLIST_SUCCESS", payload: response.data });
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };
};
