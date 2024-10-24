import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast } from "react-toastify";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
      try {
        const response = await axios.get("http://3.110.45.58/products/get/");
  
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response ? err.response.data : err.message);
      }
    }
  );

  export const AddNewProduct = createAsyncThunk(
    'product/addproduct',
    async ({api,values}) => {
      try {
        const response = await api.post('/products/post/',values,{
          headers:{
            'Content-Type': 'multipart/form-data',
          },
        })
        return response.data
      }
      catch(err){
        return rejectWithValue(err.response ? err.response.data : err.message);
      }
    }
  )