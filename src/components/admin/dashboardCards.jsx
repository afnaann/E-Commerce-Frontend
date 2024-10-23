import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux/features/users/usersThunk";
import { fetchAllOrders } from "../../Redux/features/orders/orderThunk";
import useAxios from "../utils/useAxios"

function DashboardCards({sale}) {
  const users = useSelector(state=> state.users.userdetails)
  const orders = useSelector(state => state.orders.items)


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <DashboardCard title="Total Users" value={users?.length} icon="👤" color="blue" />
      <DashboardCard title="Total Sales" value={`₹${sale}`} icon="💰" color="green" />
      <DashboardCard title="Total Orders" value={orders?.length} icon="📦" color="purple" />
    </div>
  );
}

export default DashboardCards;



  const DashboardCard = ({ title, value, icon, color }) => {
    const bgColor = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-yellow-500",
    };
    return (
      <div
        className={`flex items-center justify-between transition-all duration-300 hover:shadow-xl rounded-lg p-6 ${bgColor[color]} text-white`}
      >
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    );
  };