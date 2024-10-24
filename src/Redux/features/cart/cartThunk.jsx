import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async ({userId,api}) => {
  try {
    const response = await api.get(
      `http://127.0.0.1:8000/cart/get/${userId}/`
    );
    return response.data;
  } catch (error) {
    console.error(error);

  }
});

export const AddToCart = createAsyncThunk(
  "cart/addtocart",
  async ({ userId, productId, api }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/cart/post/${userId}/`, {
        product: productId,
      });
      return response.data;
    } catch (err) {
      console.error("Error adding to cart:", err);
      return rejectWithValue(err.response?.data || 'Failed to add product to cart');
    }
  }
);

export const UpdateQuantity = createAsyncThunk(
  "cart/updatequantity",
  async ({ userId, productId, api, quantity }, {rejectWithValue}) => {
    try {
      const response = await api.patch(`/cart/patch/${userId}/`, {
        product: productId,
        quantity: quantity,
      });
      return response.data;
    } catch (error) {
      console.error("error updating quantity,", error.response.data);
      return rejectWithValue(error.response?.data || 'Faled to add product to cart')
    }
  }
);
