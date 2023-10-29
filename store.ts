import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./redux/cart-reducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
