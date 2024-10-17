import { createSlice } from "@reduxjs/toolkit";
import {
  AddToCart,
  fetchCart,
  UpdateQuantity,
} from "./cartThunk";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  total: 0,
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateTotal: (state) => {
      state.total = state.items.reduce((acc, curr) => {
        return Number(acc) + (Number(curr.product?.price) * Number(curr.quantity));
      }, 0);
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        const { product, quantity } = action.payload;
        console.log(product);
        console.log(state.items);
        if (quantity == 1) {
          state.items.push(action.payload);
        } else {
          const productt = state.items.find(
            (item) => item.product.id === product.id
          );
          productt.quantity += 1;
        }
      })
      // .addCase(AddToCart.pending, (state, action) => {
      //   // console.log(action)
      //   // state.items = action.payload;
      // })
      .addCase(AddToCart.rejected, (state, action) => {
        console.log(action);
        toast.error("Error Updating, Try Agian.");

        // state.items = action.payload;
      })
      .addCase(UpdateQuantity.fulfilled, (state, action) => {
        const { product, quantity } = action.payload;

        const existingItem = state.items.find(
          (item) => item.product.id === product
        );

        console.log(existingItem);
        if (quantity != 0) {
          existingItem.quantity = quantity;
        } else {
          state.items = state.items.filter((item) => item !== existingItem);
        }
      })

      // .addCase(UpdateQuantity.pending, (state, action) => {})
      .addCase(UpdateQuantity.rejected, (state, action) => {
        console.error(action);
        toast.error("Error Updating, Try Agian.");
      });
  },
});

export const { updateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
