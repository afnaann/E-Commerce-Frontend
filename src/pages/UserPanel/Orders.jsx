import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainContext from "../../context/context";
import {
  fetchOrders,
  updateOrder,
} from "../../Redux/features/orders/orderThunk";
import useAxios from "../../components/utils/useAxios";
import { downloadInvoice } from "../../components/utils/invoicePdf";

const OrderDetails = () => {
  const { user } = useContext(MainContext);
  const orders = useSelector((state) => state.orders.items);
  const api = useAxios();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders({ userId: user.user_id, api: api }));
  }, []);

  const cancelOrderr = (orderId) => {
    dispatch(updateOrder({ api: api, orderId: orderId,status:'CA' }));
    dispatch(fetchOrders({ userId: user.user_id, api: api }));

  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "SH":
        return { display: "Shipping", color: "text-yellow-500" };
      case "OD":
        return { display: "Out Of Delivery", color: "text-blue-500" };
      case "OR":
        return { display: "Order Recieved", color: "text-green-500" };
      case "CA":
        return { display: "Cancelled", color: "text-orange-500" };
      case "RT":
        return { display: "Returned", color: "text-red-500" };
      default:
        return { display: "Unknown", color: "text-gray-500" };
    }
  };

  return (
    <>
      <div>
        {orders?.map((order, index) => {
          const order_date = new Date(order.order_date).toLocaleDateString();
          const { display, color } = getStatusDetails(order.status); // Get status details
          return (
            <div
              className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto bg-white"
              key={index}
            >
              <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  Order #{order.id}
                </h1>
                <p className="text-base font-medium leading-6 text-gray-600">
                  {order.orderDate}
                </p>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                      Your Orders
                    </p>
                    <br />
                    <div className="h-96 overflow-auto w-full">
                      {order?.order_items?.map((item) => (
                        <div
                          className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                          key={item.id}
                        >
                          <div className="pb-4 md:pb-8 w-full md:w-40">
                            <img
                              className="w-full hidden md:block"
                              src={`data:image/png;base64,${item.product.Image_base64}`}
                              alt={item.product.name}
                            />
                            <img
                              className="w-full md:hidden"
                              src={`data:image/png;base64,${item.product.Image_base64}`}
                              alt={item.product.name}
                            />
                          </div>
                          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                              <h3 className="text-lg xl:text-xl font-semibold leading-6 text-gray-800">
                                {item.product.name}
                              </h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-400">
                                    Category:{" "}
                                  </span>{" "}
                                  {item.product.category.name}
                                </p>
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-400">Type: </span>{" "}
                                  {item.type}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base xl:text-lg leading-6 ml-10">
                                ₹{item.product.price}
                              </p>
                              <p className="text-base xl:text-lg leading-6 text-gray-800">
                                0{item.quantity}
                              </p>
                              <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                ₹{item.product.price * item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Order Details
                      </h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Date
                            <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">
                              ORDER
                            </span>
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            {order.order_date}
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base leading-4 text-gray-800">
                            Amount
                          </p>
                          <p className="text-base leading-4 text-gray-600">
                            {order.total_price}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                      <h3 className="text-xl font-semibold leading-5 text-gray-800">
                        Shipping
                      </h3>
                      <div className="flex justify-between items-start w-full">
                        <div className="flex justify-center items-center space-x-4">
                          <div className="w-8 h-8">
                            <img
                              className="w-full h-full"
                              alt="logo"
                              src="https://i.ibb.co/L8KSdNQ/image-3.png"
                            />
                          </div>
                          <div className="flex flex-col justify-start items-center">
                            <p className="text-lg leading-6 font-semibold text-gray-800">
                              Fedex Delivery
                              <br />
                              <span className="font-normal">
                                Delivery within 2-4 Days
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      {order.status == "SH" && (
                        <div className="w-full flex justify-center items-center">
                          <button
                            onClick={() => cancelOrderr(order.id)}
                            className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                          >
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                  <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                      <div className="flex flex-col md:flex-row justify-between items-center w-full py-8 border-b border-gray-300">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                          Order Date:
                        </h3>
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                          <p className="text-base md:text-lg font-medium text-gray-700">
                            {order_date}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-center w-full py-8 border-b border-gray-300">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                          Order Status:
                        </h3>
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                          <p
                            className={`text-base md:text-lg font-manrope ${color} font-bold`}
                          >
                            {display}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                      <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                          <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                            Shipping Address
                          </p>
                          <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                            {order.address}
                          </p>
                        </div>
                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                          <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                            Billing Address
                          </p>
                          <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                            {order.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                        <button
                          className="mt-6 md:mt-0 py-5 px-6 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 w-96 2xl:w-full text-base font-medium leading-4 text-gray-800 flex items-center justify-center space-x-2"
                          onClick={() => downloadInvoice(order)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M8 2a1 1 0 00-1 1v7a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1H8zM4 7a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7z" />
                          </svg>
                          <span>Download Invoice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderDetails;
