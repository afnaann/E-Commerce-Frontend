import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/cart/get/${userId}/`
    );
    return response.data;
  } catch (error) {
    console.error(error);

  }
});

export const AddToCart = createAsyncThunk(
  "cart/addtocart",
  async ({ userId, productId, api }) => {
    try {
      const response = await api.post(`/cart/post/${userId}/`, {
        product: productId,
      });
      return response.data;
    } catch (err) {
      console.error("error adding to cart.", err);
    }
  }
);

export const UpdateQuantity = createAsyncThunk(
  "cart/updatequantity",
  async ({ userId, productId, api, quantity }) => {
    try {
      const response = await api.patch(`/cart/patch/${userId}/`, {
        product: productId,
        quantity: quantity,
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("error updating quantity,", err);
    }
  }
);
