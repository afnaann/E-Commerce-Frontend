import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({userId,api})=> {
  try {
    const response = await api.get(`/orders/get/${userId}`);
    return response.data
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : err.message);
  }
})


export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (api)=> {
  try {
    const response = await api.get('/orders/get/');
    return response.data
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : err.message);
  }
})


export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ api, orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/orders/update/${orderId}/`, {
        status: status,
      });
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);
