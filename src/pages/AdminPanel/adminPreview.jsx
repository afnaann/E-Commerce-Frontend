import React, { useEffect } from "react";
import DashboardCards from "../../components/admin/dashboardCards";
import SummaryChart from "../../components/admin/summaryChart";
import RecentActivity from "../../components/admin/recentActivity";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../../components/utils/useAxios";
import { fetchUsers } from "../../Redux/features/users/usersThunk";
import { fetchAllOrders } from "../../Redux/features/orders/orderThunk";


function AdminPreview() {
  const dispatch = useDispatch()
  const api = useAxios()
  const orders = useSelector(state => state.orders.items)
  useEffect(()=> {
    dispatch(fetchUsers(api))
    dispatch(fetchAllOrders(api))
  },[])
  const sale = orders?.reduce((acc,curr)=> acc + Number(curr.total_price) ,0)
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DashboardCards sale={sale} />
      <SummaryChart orders={orders} />
      <RecentActivity />
    </div>
  );
}

export default AdminPreview;
