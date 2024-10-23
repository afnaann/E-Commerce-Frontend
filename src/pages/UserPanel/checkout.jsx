import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../Redux/features/orders/orderSlice";
import MainContext from "../../context/context";

const Checkout = () => {
  const navigate = useNavigate();
  const total = useSelector((state) => state.cart.total);
  const { id } = useContext(MainContext);

  const uniqueId = uuidv4();
  const truncatedId = uniqueId.slice(0, 8);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  // useEffect(() => {
  // setOrderData(orders);
  // }, [id]);
  const formik = useFormik({
    initialValues: {
      email: "",
      cardholder: "",
      carddetails: "",
      address: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      cardholder: Yup.string()
        .max(15, "Must be 15 Characters or less!")
        .required("CardHolder Name is Must"),
      carddetails: Yup.string()
        // .max(15, "Must be 15 Characters or less!")
        .required("Card Details is Must"),
      address: Yup.string()
        .min(15, "Too Less Information!")
        .required("Address is Required"),
    }),
    onSubmit: (values) => {
      const newOrder = {
        id: truncatedId,
        cartItems: cart,
        amount: amount,
        email: values.email,
        cardholder: values.cardholder,
        carddetails: values.carddetails,
        address: values.address,
        orderDate: new Date().toISOString(),
      };
      dispatch(addOrder(newOrder));
      // dispatch(updateOrdersAsync());
    },
  });

  
  const tax = ((18 / 100) * total).toFixed(2);

  const shipCharge = 20;

  const amount = Number(total) + Number(tax) + Number(shipCharge);

  return (
    <>
      <div>
        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <p className="text-2xl font-bold text-gray-800">Lucida.</p>
          <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </a>
                  <span className="font-semibold text-gray-900">Shop</span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                    href="#"
                  >
                    2
                  </a>
                  <span className="font-semibold text-gray-900">Shipping</span>
                </li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <a
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                    href="#"
                  >
                    3
                  </a>
                  <span className="font-semibold text-gray-500">Payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="max-h-96 overflow-auto">
              {cart?.map((item) => (
                <div
                  key={item.product.id}
                  className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 "
                >
                  <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={`data:image/png;base64,${item.product.Image_base64}`}
                      alt={item.product.name}
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">{item.product.name}</span>
                      <span className="float-right text-gray-400">
                        Qty:{item.quantity} x ₹{item.product.price}
                      </span>
                      <p className="text-lg font-bold">₹{item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            <div className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  defaultChecked
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-white flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://i.pinimg.com/736x/7f/4d/56/7f4d56aa755be575226bc8505591393a.jpg"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">DHL Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                    <p className="text-green-700 text-sm leading-6">
                      Shipping: ₹20
                    </p>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-white flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_2"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://www.freepnglogos.com/uploads/fedex-logo-png/circle-fedex-icon-png-logo-12.png"
                    alt=""
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Fedex Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 3-4 Days
                    </p>
                    <p className="text-red-500 text-sm leading-6">
                      Shipping: ₹20
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-10 bg-white px-4 pt-5 lg:mt-0 rounded-2xl border"
          >
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div>
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />

                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 01-5 0V12m5 0a2.5 2.5 0 01-5 0V12m5 0h1.5a2.5 2.5 0 010 5H12m0-10h1.5a2.5 2.5 0 015 0H12m0 10H6m4 0v1.5a2.5 2.5 0 005 0V12m-5 0h1.5a2.5 2.5 0 000 5H6m0-10H4a2.5 2.5 0 01-5 0V12"
                    />
                  </svg>
                </div>
                <div>
                  {formik.touched.email && formik.errors.email ? (
                    <p className="mt-1 text-sm text-orange-600">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
              </div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Holder
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardholder"
                  name="cardholder"
                  value={formik.values.cardholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zM4 4h16v4H4zM4 14h16v6H4z"
                    />
                  </svg>
                </div>
                <div>
                  {formik.touched.cardholder && formik.errors.cardholder ? (
                    <p className="mt-1 text-sm text-orange-600">
                      {formik.errors.cardholder}
                    </p>
                  ) : null}
                </div>
              </div>
              <label
                htmlFor="card-no"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Card Details
              </label>
              <div className="flex">
                <div className="relative w-7/12 flex-shrink-0">
                  <input
                    type="text"
                    id="carddetails"
                    name="carddetails"
                    value={formik.values.carddetails}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zM4 4h16v4H4zM4 14h16v6H4z"
                      />
                    </svg>
                  </div>
                </div>
                {/* <input
                    type="text"
                    name="credit-expiry"
                    className="w-1/6 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    name="credit-cvc"
                    className="w-1/6 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="CVC"
                  /> */}
              </div>
              <div>
                {formik.touched.carddetails && formik.errors.carddetails ? (
                  <p className="mt-1 text-sm text-orange-600">
                    {formik.errors.carddetails}
                  </p>
                ) : null}
              </div>
              <label
                htmlFor="billing-address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Billing Address
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zM4 4h16v4H4zM4 14h16v6H4z"
                      />
                    </svg>
                  </div>
                  <div>
                    {formik.touched.address && formik.errors.address ? (
                      <p className="mt-1 text-sm text-orange-600">
                        {formik.errors.address}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">₹{total}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Tax (18%)</p>
                  <p className="font-semibold text-gray-900">₹{tax}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">₹{shipCharge}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{amount}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                // setOrderSuccess(true)
              }}
              type="submit"
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
