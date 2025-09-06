import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("No token found");

      const { id: userId } = jwtDecode(token);

      const response = await axios.get(
        `${import.meta.env.VITE_DOMAIN_URL}/api/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      dispatch({ type: "FETCH_CART_SUCCESS", payload: response.data });
    } catch (error) {
      console.log(`error: ${error.message}`);
    }
  };
};
