import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsThunk";

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
    }
})

export default productSlice.reducer;