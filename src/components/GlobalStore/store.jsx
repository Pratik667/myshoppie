import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistReducer';
import cartReducer from './cartReducer';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export default store;
