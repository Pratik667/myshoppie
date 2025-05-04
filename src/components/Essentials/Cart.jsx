import React from "react";
import PrivateRoute from "../Auth/PrivateRoute";

const Cart = () => { 
  return <>
  <PrivateRoute>
    Cart Page;

  </PrivateRoute>
  </>;
};

export default Cart;
