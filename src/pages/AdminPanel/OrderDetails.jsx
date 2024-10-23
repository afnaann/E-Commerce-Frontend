import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select"; // Import react-select
import useAxios from "../../components/utils/useAxios";
import {
  fetchAllOrders,
  updateOrder,
} from "../../Redux/features/orders/orderThunk";
import "../../styles/orders.css";
import ViewCart from "../../components/Modals/viewCart";

const OrderDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const api = useAxios();
  const orders = useSelector((state) => state.orders.items);

  useEffect(() => {
    dispatch(fetchAllOrders(api));
  }, []);

  const viewProducts = (order_items) => {
    setIsVisible(true);
    setProducts(order_items);
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "SH":
        return { display: "Shipping", color: "bg-yellow-200 text-gray-700" };
      case "RF":
        return { display: "Refunded", color: "bg-blue-100 text-blue-700" };
      case "OR":
        return { display: "Received", color: "bg-green-100 text-green-700" };
      case "CA":
        return { display: "Cancelled", color: "bg-orange-100 text-orange-700" };
      case "RT":
        return { display: "Returned", color: "bg-red-100 text-red-700" };
      default:
        return { display: "Unknown", color: "bg-gray-200 text-gray-700" };
    }
  };

  const actionOptions = [
    { value: "SH", label: "Shipping" },
    { value: "OR", label: "Recieved" },
    { value: "RT", label: "Returned" },
    { value: "RF", label: "Refunded" },
  ];

  const handleActionChange = (selectedOption, order) => {
    if (selectedOption.value === order.status) {
      return null;
    } else {
      dispatch(
        updateOrder({
          api: api,
          orderId: order.id,
          status: selectedOption.value,
        })
      );
      dispatch(fetchAllOrders(api));
    }
  };

  const sortedOrders = orders
    ?.slice()
    .sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

  return (
    <>
      <div className="p-4">
        <table className="table-auto bg-white rounded-lg shadow mt-40 w-full">
          <thead>
            <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Customer Email</th>
              <th className="py-2 px-4">Products</th>
              <th className="py-2 px-4">Order Date</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="font-poppins">
            {sortedOrders?.map((order) => {
              const formattedDate = new Date(
                order.order_date
              ).toLocaleDateString();
              const { display, color } = getStatusDetails(order.status);
              return (
                <tr className="border-t" key={order.id}>
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.total_price}</td>
                  <td className="py-2 px-4">{order.user.email}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => viewProducts(order.order_items)}
                    >
                      View
                    </button>
                  </td>
                  <td className="py-2 px-4">{formattedDate}</td>
                  <td className="py-2 px-4 relative">
                    <div className="truncate-address">{order.address}</div>
                    <span className="tooltip-text">{order.address}</span>
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`${color} px-3 py-1 rounded-full shadow-sm text-sm font-medium`}
                    >
                      {display}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <Select
                      options={actionOptions}
                      onChange={(selectedOption) =>
                        handleActionChange(selectedOption, order)
                      }
                      className="w-40"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ViewCart
        cart={products}
        isModalVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};

export default OrderDetails;
