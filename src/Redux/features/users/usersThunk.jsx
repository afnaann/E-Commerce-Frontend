import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=> {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/get/');
      return response.data
    }
    catch(error){
      console.log(error)
    }
  })

