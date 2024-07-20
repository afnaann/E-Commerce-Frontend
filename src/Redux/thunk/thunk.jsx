import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8000/users/${userId}`);
    // console.log(response.data.cart);
    return response.data.cart;
  } catch (error) {
    console.log(error);
  }
});

export const updateCartOnServer = createAsyncThunk(
  "cart/updateCartOnServer",
  async (updatedCart) => {
    try {
      const id = localStorage.getItem("id");

      const response = await axios.patch(`http://localhost:8000/users/${id}/`, {
        cart: updatedCart,
      });
      return response.data.cart;

    } 
    catch (error) {
      console.error("Error updating cart on server:", error);
      throw error;
    }
  }
);

export const updateCartAsync = () => (dispatch, getState) => {
  const updatedCart = getState().cart.items;

  dispatch(updateCartOnServer(updatedCart));
};

export const updateOrdersOnServer = createAsyncThunk(
  'orders/updateOrdersOnServer',
  async (updatedOrders) => {
    
    try {
      const id = localStorage.getItem('id')
      const response = await axios.patch(`http://localhost:8000/users/${id}`, {
        orders: updatedOrders,
      });
      return response.data.orders
      // return response.data
    } catch (error) {
      console.error("Error updating cart data:", error);
    }
  }
)
export const updateOrdersAsync = () => (dispatch, getState) => {
  const updatedOrders = getState().orders;

  dispatch(updateOrdersOnServer(updatedOrders))
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      // console.log(response.data)

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (id)=> {
  try {
    const response = await axios.get(`http://localhost:8000/users/${id}`);
    // console.log(response.data);
    return response.data.orders
  } catch (error) {
    console.error("Error fetching user orders:", error);
  }
})


