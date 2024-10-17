import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/products/get/");
  
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );