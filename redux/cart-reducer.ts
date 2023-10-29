import { createSlice } from "@reduxjs/toolkit";
import { Offer } from "../types";

type ExtendedCart = Offer & { quantity: number };

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [] as ExtendedCart[],
  },
  reducers: {
    addToCart: (state, action) => {
      const alreadyInCart = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (alreadyInCart) {
        alreadyInCart.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    },
    incrementQuantity: (state, action) => {
      const incrementItem = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      incrementItem.quantity++;
    },
    decrementQuantity: (state, action) => {
      const existingItemInCart = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (existingItemInCart.quantity === 1) {
        existingItemInCart.quantity = 0;
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
      } else {
        existingItemInCart.quantity--;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
