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
      state.total = state.items?.reduce((acc, curr) => {
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
      .addCase(fetchCart.rejected, (state,action) => {
        state.status = "failed";
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        const { product, quantity } = action.payload;
        console.log(quantity)
        if (quantity == 1) {
          state.items.push(action.payload);
        } else {
          const productt = state.items.find(
            (item) => item.product.id === product.id
          );
          if (productt){
            productt.quantity += 1;
          }
        }
      })

      .addCase(AddToCart.rejected, (state, action) => {

        toast.error(action.payload.update ||"Error Updating, Try Agian.");
      })
      .addCase(UpdateQuantity.fulfilled, (state, action) => {
        const { product, quantity } = action.payload;

        const existingItem = state.items.find(
          (item) => item.product.id === product
        );

        if (quantity != 0) {
          existingItem.quantity = quantity;
        } else {
          state.items = state.items.filter((item) => item !== existingItem);
        }
      })

      // .addCase(UpdateQuantity.pending, (state, action) => {})
      .addCase(UpdateQuantity.rejected, (state, action) => {

        console.log(action);
        toast.error(action.payload?.update||"Error Updating, Try Agian.");
      });
  },
});

export const { updateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
