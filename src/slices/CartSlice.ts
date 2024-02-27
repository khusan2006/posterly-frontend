import { CartData } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  cart: CartData[];
};

const initialState: StateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      const existingProduct = state.cart.findIndex((item) => {
        if (
          item.format == action.payload.format &&
          item.frame === action.payload.frame &&
          item.product._id === action.payload.product._id
        ) {
          return item;
        }
      });
      if (existingProduct !== -1) {
        state.cart[existingProduct].quantity++;
        state.cart[existingProduct].totalPrice =
          state.cart[existingProduct].quantity *
          Number(state.cart[existingProduct]?.product?.price);
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteItem(state, action) {
      const deletedItem = state.cart.findIndex((item) => {
        if (
          item.format == action.payload.format &&
          item.frame === action.payload.frame &&
          item.product._id === action.payload.product._id
        ) {
          return item;
        }
      });

      state.cart.splice(Number(deletedItem), 1);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => {
        if (
          item.format == action.payload.format &&
          item.frame === action.payload.frame &&
          item.product._id === action.payload.product._id
        ) {
          return item;
        }
      });
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * Number(item?.product?.price);
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => {
        if (
          item.format == action.payload.format &&
          item.frame === action.payload.frame &&
          item.product._id === action.payload.product._id
        ) {
          return item;
        }
      });
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.quantity * Number(item.product.price);

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: { cart: StateType }) => state.cart.cart;

export const getTotalCartQuantity = (state: { cart: StateType }) =>
  state.cart.cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

export const getTotalCartPrice = (state: { cart: StateType }) =>
  state.cart.cart.reduce((sum, item):number => Number(sum) + Number(item.totalPrice), 0);

// export const getCurrentQuantityById = (id) => (state) =>
//   state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
