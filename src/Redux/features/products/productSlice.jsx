import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../thunk/thunk";

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