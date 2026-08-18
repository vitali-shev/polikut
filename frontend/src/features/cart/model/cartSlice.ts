import { createAppSlice } from "@/app/store/createAppSlice";
import { CartItem } from "./types";
import { PayloadAction } from "@reduxjs/toolkit/react";

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: (create) => ({
    addToCart: create.reducer((state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    }),
    removeFromCart: create.reducer((state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    }),
    setQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    incrementQuantity: create.reducer(
      (state, action: PayloadAction<number>) => {
        const item = state.items.find((i) => i.id === action.payload);

        if (item) {
          item.quantity++;
        }
      },
    ),
    decrementQuentity: create.reducer(
      (state, action: PayloadAction<number>) => {
        const item = state.items.find((i) => i.id === action.payload);

        if (item) {
          item.quantity--;
        }
      },
    ),
    clearCart: create.reducer((state) => {
      state.items = [];
    }),
  }),
  selectors: {
    selectCartItems: (state) => state.items,
  },
});

export const {
  addToCart,
  removeFromCart,
  setQuantity,
  incrementQuantity,
  decrementQuentity,
  clearCart,
} = cartSlice.actions;

export const { selectCartItems } = cartSlice.selectors;
