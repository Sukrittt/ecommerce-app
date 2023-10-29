import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types";

type ExtendedCart = Product & { quantity: number };

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [] as ExtendedCart[],
  },
  reducers: {
    addTCart: (state, action) => {
      const alreadyInCart = state.cart.find(
        (cartItem) => cartItem === action.payload.id
      );

      if (alreadyInCart) {
        alreadyInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    },
    incrementQuantity: (state, action) => {
      const incrementItem = state.cart.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      incrementItem.quantity++;
    },
    decrementQuantity: (state, action) => {
      const existingItemInCart = state.cart.find(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (existingItemInCart.quantity === 1) {
        existingItemInCart.quantity = 0;
        state.cart = state.cart.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
      } else {
        existingItemInCart.quantity--;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addTCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
