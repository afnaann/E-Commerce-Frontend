import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Registation from "./pages/Registation";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Layout from "./components/layout";

import myContext from "./components/context";
import Checkout from "./pages/UserPanel/checkout";
import axios from "axios";
import Costumers from "./pages/AdminPanel/costumers";
import Products from "./pages/AdminPanel/Viewproducts";
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

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [count, setCount] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = localStorage.getItem("id");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    if (id) {
      axios.get("http://localhost:8000/users/" + id).then((res) => {
        setCart(res.data.cart);
      });
    }
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
          openModal,
          closeModal,
          isModalOpen,
          setIsModalOpen,
          id,
          orderSuccess,
          setOrderSuccess,
          cart,
          setCart,
          total,
          setTotal,
          isLoggedIn,
          setLoggedIn,
          count,
          setCount,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders/>}/>
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
