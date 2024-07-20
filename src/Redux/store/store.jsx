import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/cart/cartSlice';
import productSlice from '../features/products/productSlice';
import orderSlice from '../features/orders/orderSlice';
import userSlice from '../features/users/userSlice';

const store = configureStore({
    reducer:{
        cart: cartSlice,
        products : productSlice,
        orders: orderSlice,
        users: userSlice,
    }
})

export default store;