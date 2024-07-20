import React, { useContext, useEffect, useState } from "react";
import myContext from "../../components/context";
import axios from "axios";
import CancelOrder from "../../components/cancelOrder";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder } from "../../Redux/features/orders/orderSlice";
import { updateOrdersAsync } from "../../Redux/thunk/thunk";

const OrderDetails = () => {
  // const [orders, setOrders] = useState([]);
  const { id } = useContext(myContext);
  const [isVisible, setIsVisible] = useState(false);
  const [delId, setDelId] = useState([]);
  const orders = useSelector(state => state.orders)
  const dispatch = useDispatch()
  // useEffect(() => {
    // axios.get("http://localhost:8000/users/" + id).then((res) => {
    //   setOrders(res.data.orders);

    // });
  // }, []);

  const cancelOrder = (orderId) => {
      dispatch(removeOrder(orderId))
      dispatch(updateOrdersAsync())
  };
  const cancelModal = (orderId) => {
    setIsVisible(true);
    setDelId(orderId);
  };

  const updateCartOnServer = async (updatedOrders) => {
    try {
      await axios.patch(`http://localhost:8000/users/${id}`, {
        orders: updatedOrders,
      });
    } catch (error) {
      console.error("Error updating cart data:", error);
    }
  };


  return (
    <>
      <div>
        {orders.map((order) => (
          <div
            className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto bg-white"
            key={order.id}
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
                    Customer's Orders
                  </p>
                  <br />
                  <div className="h-96 overflow-auto">
                    {order.cartItems.map((item) => (
                      <div
                        className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                        key={item.id}
                      >
                        <div className="pb-4 md:pb-8 w-full md:w-40">
                          <img
                            className="w-full hidden md:block"
                            src={item.imageSrc}
                            alt={item.imageAlt}
                          />
                          <img
                            className="w-full md:hidden"
                            src={item.imageSrc}
                            alt={item.imageAlt}
                          />
                        </div>
                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-lg xl:text-xl font-semibold leading-6 text-gray-800">
                              {item.name}
                            </h3>
                            <div className="flex justify-start items-start flex-col space-y-2">
                              <p className="text-sm leading-none text-gray-800">
                                <span className="text-gray-400">Color: </span>{" "}
                                {item.color}
                              </p>
                              <p className="text-sm leading-none text-gray-800">
                                <span className="text-gray-400">Type: </span>{" "}
                                {item.type}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between space-x-8 items-start w-full">
                            <p className="text-base xl:text-lg leading-6 ml-10">
                              ${item.price}
                            </p>
                            <p className="text-base xl:text-lg leading-6 text-gray-800">
                              0{item.quantity}
                            </p>
                            <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                              ${item.price * item.quantity}
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
                      <div className="flex justify-between w-full">
                        <p className="text-base leading-4 text-gray-800">
                          Cardholder
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          {order.cardholder}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-gray-800">
                          Email
                          <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">
                            ORDER
                          </span>
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          {order.email}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-gray-800">
                          Amount
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          {order.amount}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-gray-800">
                          Address
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          {order.address}
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
                    <div className="w-full flex justify-center items-center">
                      <button
                        onClick={() => cancelModal(order.id)}
                        className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Customer
                </h3>
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                  <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                      <img
                        src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                        alt="avatar"
                      />
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-base font-semibold leading-4 text-left text-gray-800">
                          David Kent
                        </p>
                        <p className="text-sm leading-5 text-gray-600">
                          10 Previous Orders
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center text-gray-800 md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                        alt="email"
                      />
                      <p className="cursor-pointer text-sm leading-5">
                        david89@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                          Shipping Address
                        </p>
                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          180 North King Street, Northhampton MA 1060
                        </p>
                      </div>
                      <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                          Billing Address
                        </p>
                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                          180 North King Street, Northhampton MA 1060
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                      <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                        Edit Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CancelOrder
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        cancelOrder={cancelOrder}
        delId={delId}
      />
    </>
  );
};

export default OrderDetails;
