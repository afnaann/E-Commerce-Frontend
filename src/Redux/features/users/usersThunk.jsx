import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk('users/fetchUsers', async (api)=> {
    try {
      const response = await api.get('/users/get/');
      return response.data
    }
    catch(error){
      console.error(error)
    }
  })


export const blockUsers = createAsyncThunk('user/blockUser', async ({api,id})=> {
  try {
    const response = await api.patch(`/users/block/${id}/`);
    return response.data
  }
  catch(err){
    console.err(err)
  }
})