import React, { useContext } from "react";
import myContext from "./context";
import { Link } from "react-router-dom";

function OrderSuccess() {
  const { orderSuccess, setOrderSuccess } = useContext(myContext);

  if (!orderSuccess) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center mb-96 justify-center z-50">
        <div className="fixed inset-0 bg-black bg-opacity-20"></div>
        <div className="relative bg-white rounded-3xl shadow-2xl w-[32rem]">
          <div className="p-8 text-center sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
              Your order is on the way
            </p>
            <h2 className="mt-6 text-3xl font-bold">
              Thanks for your purchase, we're getting it ready!
            </h2>
            <button
            
              className="mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
              onClick={() => setOrderSuccess(false)}
            >
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSuccess;
