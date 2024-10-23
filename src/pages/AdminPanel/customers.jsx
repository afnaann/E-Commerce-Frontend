import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../components/utils/useAxios"
import ViewCart from "../../components/Modals/viewCart";
import ViewOrders from "../../components/Modals/viewOrders";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../Redux/features/cart/cartThunk";
import { blockUsers, fetchUsers } from "../../Redux/features/users/usersThunk";

const Customers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [isOrdersVisible, setIsOrdersVisible] = useState(false);
  const api = useAxios()
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.userdetails);
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchUsers(api));
  }, [dispatch]);


  const cartView = (userId) => {
    dispatch(fetchCart(userId));
    setIsModalVisible(true);
  };


  const blockUser = (userId) => {
    dispatch(blockUsers({id:userId,api:api}))
    dispatch(fetchUsers(api))

  };

  return (
    <>
      <div className="relative overflow-x-auto  mt-40">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Costumer Email
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Cart
              </th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, Id) => (
              <tr className="bg-white border-b" key={Id}>
                <td className="px-6 py-4">{user.id}</td>
                <td scope="row" className="px-6 py-4 font-bold text-md">
                  {user.email}
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">
                  <button
                    className="inline-block rounded bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
                    onClick={() => {
                      cartView(user.id);
                      setUserName(user.name);
                    }}
                  >
                    View Cart
                  </button>
                </td>

                <td className="px-6 py-4">
                  <button
                    className="inline-block rounded bg-red-600 px-4 py-1 text-sm font-medium text-white transition hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
                    onClick={() => blockUser(user.id)}
                  >
                    {user.is_blocked ? "Unblock": "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <CartModal isVisible={isModalVisible}> */}
      <ViewCart
        cart={cart}
        setIsVisible={setIsModalVisible}
        userName={userName}
        isModalVisible={isModalVisible}
      />
    </>
  );
};

export default Customers;
