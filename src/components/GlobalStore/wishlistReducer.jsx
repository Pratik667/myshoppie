const initialState = {
  items: []
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_WISHLIST_SUCCESS':
      return { ...state,items: action.payload };
    default:
      return state;
  }
};

export default wishlistReducer;
