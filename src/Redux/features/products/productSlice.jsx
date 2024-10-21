import { createSlice } from "@reduxjs/toolkit";
import { AddNewProduct, fetchProducts } from "./productsThunk";
import { toast } from "react-toastify";

const initialState = {
    products:[]
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.fulfilled, (state, action)=> {
            state.products = action.payload;
        })
        .addCase(AddNewProduct.fulfilled,(state,action)=> {
            state.products.push(action.payload)
            toast.success('Added Successfully!')
        })
        .addCase(AddNewProduct.rejected,(state,action)=>{
            // toast.error('Failed Adding')
            console.logo(action)
        })
    }
})

export default productSlice.reducer;