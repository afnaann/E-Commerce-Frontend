import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "./orderThunk";


const initialState = {
    items: []
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers:{
        addOrder: (state, action) => {
            state.push(action.payload)
        },
        removeOrder: (state, action) => {
            return state.filter((order) => order.id !== action.payload);
        }
    },
    extraReducers:(builder)=> {
        builder
        .addCase(fetchOrders.fulfilled, (state, action)=> {
            state.items = action.payload
        })
        .addCase(fetchOrders.rejected,(state,action)=> {
            console.log(action)
        })
    }
})

export default orderSlice.reducer

export const {removeOrder, addOrder} = orderSlice.actions