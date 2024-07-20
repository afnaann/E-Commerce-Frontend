import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=> {
    try {
      const response = await axios.get('http://localhost:8000/users');
      return response.data
    }
    catch(error){
      console.log(error)
    }
  })