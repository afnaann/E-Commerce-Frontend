import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function OrderSuccess() {
  const navigate = useNavigate()
  const api = useAxios()

  const hasProcessedOrder = useRef(false); 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    const processOrder = async () => {
      try {
        const response = await api.get(
          `http://127.0.0.1:8000/api/stripe/processorder/?session_id=${sessionId}`
        );
      } catch (error) {
        toast.error('Something went wrong! Order Unsuccessful!')
        }
    };

    if (sessionId && !hasProcessedOrder.current) {
      hasProcessedOrder.current = true; 
      processOrder();
    }
  }, [api]); 

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
              onClick={() =>{
                navigate('/')
              }
              } 
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
