import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, updateOrdersOnServer } from "../../thunk/thunk";


const orderSlice = createSlice({
    name: 'orders',
    initialState:[],
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

            return action.payload
        })
        .addCase(updateOrdersOnServer.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default orderSlice.reducer

export const {removeOrder, addOrder} = orderSlice.actions