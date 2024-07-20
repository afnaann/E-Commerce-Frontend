import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../../thunk/adminThunk";



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
    }

})

export default userSlice.reducer;

