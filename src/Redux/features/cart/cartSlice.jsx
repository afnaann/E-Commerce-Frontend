import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, updateCartOnServer } from "../../thunk/thunk";

const initialState = {
  items: [],
  total: 0,
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;

      const productIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex === -1) {
        state.items.push({ ...product, quantity: 1 });
      } else {
        state.items[productIndex].quantity += 1;
      }
    },
    removeCart: (state, action) => {
      state.items = state.items.filter((itm) => itm.id !== action.payload);
    },
    emptyCart: (state) => {
      state.items = []
    },
    updateQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const product = state.items.find((product) => product.id === productId);
      if (product) {
        product.quantity = newQuantity;
      }
    },
    updateTotal: (state) => {
      // console.log(state.items)
      state.total = state.items.reduce(
        (acc, curr) => Number(acc) + Number(curr.price) * Number(curr.quantity),
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload)
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateCartOnServer.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addCart, removeCart, updateQuantity, updateTotal , emptyCart} =
  cartSlice.actions;

export default cartSlice.reducer;
