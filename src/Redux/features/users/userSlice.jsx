import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers,blockUsers } from "./usersThunk";



const initialState = {
    userdetails:[]

}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=> {
        builder
        .addCase(fetchUsers.fulfilled, (state, action)=> {
            state.userdetails = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action)=> {
            console.log(action)
        })
        .addCase(blockUsers.fulfilled, (state, action)=> {
            console.log(action.payload)
        })
        .addCase(blockUsers.rejected, (state, action)=> {
            console.log(action)
        })
    }

})

export default userSlice.reducer;

