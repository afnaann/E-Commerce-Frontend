import axios from "axios";
import React, { useEffect, useState } from "react";
import  {toast}  from "react-toastify";

import ViewCart from "../../components/viewCart";
import CartModal from "../../components/cartModal";
import ViewOrders from "../../components/viewOrders";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux/thunk/adminThunk";

const Costumers = () => {
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [orders, setOrders] = useState([]);
  const [isOrdersVisible, setIsOrdersVisible] = useState(false);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
    axios.get("http://localhost:8000/users").then((res) => setUsers(res.data));
  }, []);

  const cartView = (userId) => {
    axios.get("http://localhost:8000/users/" + userId).then((res) => {
      setCart(res.data.cart);
      setIsModalVisible(true);
    });
  };

  const ordersView = (userId) => {
    axios.get("http://localhost:8000/users/" + userId).then((res) => {
      setOrders(res.data.orders);
      setIsOrdersVisible(true);
    });
  };

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Deleted Successfully");
          setUsers(users.filter((user) => user.id !== userId));
          console.log("Successfully Deleted!");
        } else {
          toast.error("Failed Operation");
          console.error("Failed Deleting the User!");
        }
      })
      .catch((error) => {
        toast.error("Failed Deleting");
        console.error("Failed Deleting. ", error);
      });
  };

  return (
    <>
      <div className="relative overflow-x-auto w-screen mt-40">
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
              <th scope="col" className="px-6 py-3">
                Cart
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, Id) => (
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
                    className="inline-block rounded bg-yellow-400 px-6 py-2 text-sm font-medium text-black transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
                    onClick={() => {
                      ordersView(user.id);
                      setUserName(user.name);
                    }}
                  >
                    View Orders
                  </button>
                </td>

                <td className="px-6 py-4">
                  <button
                    className="inline-block rounded bg-red-600 px-4 py-1 text-sm font-medium text-white transition hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
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
      {/* </CartModal> */}
      <ViewOrders
        orders={orders}
        setIsVisible={setIsOrdersVisible}
        userName={userName}
        isModalVisible={isOrdersVisible}
      />
    </>
  );
};

export default Costumers;
