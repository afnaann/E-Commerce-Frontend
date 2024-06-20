import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Registation from "./pages/Registation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Shop from "./pages/shop";
import About from "./pages/about";
import Contact from "./pages/contact";
import Navbar from "./components/navbar";
import Layout from "./components/layout";
import Cart from "./pages/Cart";
import myContext from "./components/context";
import Checkout from "./pages/checkout";
function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [count, setCount ] = useState(0)

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <myContext.Provider
        value={{ cart, setCart, total, setTotal, isLoggedIn, setLoggedIn , count, setCount}}
      >
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registation />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </myContext.Provider>
    </div>
  );
}

export default App;
