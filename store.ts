import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./redux/cart-reducer";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
