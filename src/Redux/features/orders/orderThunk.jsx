import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({userId,api})=> {
  try {
    const response = await api.get(`http://127.0.0.1:8000/orders/get/${userId}`);
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error("Error fetching user orders:", error);
  }
})


