import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchCart, UpdateQuantity } from "../../Redux/features/cart/cartThunk";
import MainContext from "../../context/context";
import useAxios from "../../components/utils/useAxios";
import { updateTotal } from "../../Redux/features/cart/cartSlice";
import { toast } from "react-toastify";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items || []);
  const total = useSelector((state) => state.cart.total);
  const navigate = useNavigate();
  const { user } = useContext(MainContext);
  const api = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(fetchCart({ userId: user.user_id, api: api }));
    }
  }, []);

  const updateCount = (productId, newQuantity) => {
    dispatch(
      UpdateQuantity({
        productId: productId,
        userId: user.user_id,
        quantity: newQuantity,
        api: api,
      })
    );
  };

  useEffect(() => {
    dispatch(updateTotal());
  }, [cart]);

  const paymentFunction = async () => {
    try {
      const response = await api.post("/api/stripe/checkoutsession/", {
        cart: cart,
      });

      if (response.status == 200) {
        const url = response.data.id;

        window.location.assign(url);
      } else {
        toast.warning("something Went Wrong! Try Again");
      }
    } catch (err) {
      toast.warning("something Went Wrong! Try Again");
    }
  };

  if (!cart || cart.length == 0) {
    return null;
  }

  return (
    <div className="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-extrabold text-gray-800">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="md:col-span-2 space-y-4">
          {cart?.map((item) => (
            <div
              className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]"
              key={item.product.id}
            >
              <div className="flex gap-4">
                <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                  <img
                    src={`data:image/png;base64,${item.product.Image_base64}`}
                    className="w-full h-full object-contain"
                    alt={item.product.name}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-800">
                      {item.product.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                      Category:
                      <span className="font-light text-gray-600">
                        {item.product.category.name}
                      </span>
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        updateCount(item.product.id, item.quantity - 1)
                      }
                      className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full hover:bg-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 124 124"
                      >
                        <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"></path>
                      </svg>
                    </button>
                    <span className="font-bold text-sm leading-[18px]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateCount(item.product.id, item.quantity + 1)
                      }
                      className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full hover:bg-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 42 42"
                      >
                        <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="ml-auto flex flex-col">
                <div className="flex items-start gap-4 justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 cursor-pointer fill-gray-400 inline-block"
                    viewBox="0 0 64 64"
                  >
                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 cursor-pointer fill-gray-400 inline-block hover:fill-red-500"
                    viewBox="0 0 24 24"
                    onClick={() => updateCount(item.product.id, 0)}
                  >
                    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-800 mt-auto">
                  ₹{item.product.price}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
          <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
          <div className="space-y-2 text-sm font-semibold text-gray-500 mt-4">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>{total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="flex justify-between items-center font-bold text-base text-gray-800 mt-6">
            <span>Total</span>
            <span>{total}</span>
          </div>
          <div className="mt-8 space-y-2">
            <button
              type="button"
              onClick={() => paymentFunction()}
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
            >
              Make Payment ₹{total}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
            >
              Continue Shopping{" "}
            </button>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <img
                src="https://readymadeui.com/images/master.webp"
                alt="card1"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/visa.webp"
                alt="card2"
                className="w-10 object-contain"
              />
              <img
                src="https://readymadeui.com/images/american-express.webp"
                alt="card3"
                className="w-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
