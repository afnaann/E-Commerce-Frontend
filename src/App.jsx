import Login from "./pages/AuthPages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/userSide/layout";
import Checkout from "./pages/UserPanel/checkout";
import AdminLayout from "./pages/AdminPanel/outlet";
import ViewProducts from "./pages/AdminPanel/Viewproducts";
import AdminPreview from "./pages/AdminPanel/adminPreview";
import About from "./pages/UserPanel/about";
import Contact from "./pages/UserPanel/contact";
import Home from "./pages/UserPanel/Home";
import Shop from "./pages/UserPanel/shop";
import Cart from "./pages/UserPanel/Cart";
import Orders from "./pages/UserPanel/Orders";
import { ContextProvider } from "./context/context";
import {
  AdminRoute,
  PrivateRoute,
  AuthRoute,
} from "./components/utils/privateRoute";
import OrderSuccess from "./components/Modals/orderSuccess";
import OrderDetails from "./pages/AdminPanel/OrderDetails";
import ErrorPage from "./pages/errorPage";
import Register from "./pages/AuthPages/Register";
import Customers from "./pages/AdminPanel/customers";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminPreview />} />
              <Route path="customers" element={<Customers />} />
              <Route path="products" element={<ViewProducts />} />
              <Route path="orders" element={<OrderDetails />} />
            </Route>
            <Route
              path="/ordersuccess"
              element={
                <PrivateRoute>
                  <OrderSuccess />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
