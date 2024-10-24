import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk('users/fetchUsers', async (api)=> {
    try {
      const response = await api.get('/users/get/');
      return response.data
    }
    catch(err){
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  })


export const blockUsers = createAsyncThunk('user/blockUser', async ({api,id})=> {
  try {
    const response = await api.patch(`/users/block/${id}/`);
    return response.data
  }
  catch(err){
    return rejectWithValue(err.response ? err.response.data : err.message);
  }
})