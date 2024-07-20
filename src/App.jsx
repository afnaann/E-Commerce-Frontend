import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Registation from "./pages/Registation";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Layout from "./components/layout";

import myContext from "./components/context";
import Checkout from "./pages/UserPanel/checkout";

import Costumers from "./pages/AdminPanel/costumers";

import AdminLayout from "./pages/AdminPanel/outlet";
import ErrorPage from "./pages/errorPage";
import ViewProducts from "./pages/AdminPanel/Viewproducts";
import AddProducts from "./pages/AdminPanel/AddProduct";
import AdminPreview from "./components/adminPreview";

import About from "./pages/UserPanel/about";
import Contact from "./pages/UserPanel/contact";
import Home from "./pages/UserPanel/Home";
import Shop from "./pages/UserPanel/shop";
import Cart from "./pages/UserPanel/Cart";
import Orders from "./pages/UserPanel/Orders";
import { useDispatch } from "react-redux";
import { fetchCart, fetchOrders } from "./Redux/thunk/thunk";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (id) {
      dispatch(fetchCart(id));
    }
    dispatch(fetchOrders(id));
  }, []);

  const user = localStorage.getItem("credentials") || false;
  const userDetails = JSON.parse(user);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <myContext.Provider
        value={{
          userDetails,
          isModalOpen,
          setIsModalOpen,
          id,
          orderSuccess,
          setOrderSuccess,
          isLoggedIn,
          setLoggedIn,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registation />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin" element={<AdminPreview />} />
              <Route path="/admin/costumers" element={<Costumers />} />
              <Route path="/admin/viewproducts" element={<ViewProducts />} />
              <Route path="/admin/addproduct" element={<AddProducts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </myContext.Provider>
    </div>
  );
}

export default App;
