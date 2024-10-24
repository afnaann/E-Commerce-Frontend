import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, api }) => {
    try {
      const response = await api.get(
        `http://3.110.45.58/cart/get/${userId}/`
      );
      return response.data;
    } catch (error) {
      toast.error("Error Fetching Cart.");
    }
  }
);

export const AddToCart = createAsyncThunk(
  "cart/addtocart",
  async ({ userId, productId, api }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/cart/post/${userId}/`, {
        product: productId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to add product to cart"
      );
    }
  }
);

export const UpdateQuantity = createAsyncThunk(
  "cart/updatequantity",
  async ({ userId, productId, api, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/cart/patch/${userId}/`, {
        product: productId,
        quantity: quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Faled to add product to cart"
      );
    }
  }
);
