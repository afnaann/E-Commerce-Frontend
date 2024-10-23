import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./adminHeader"; 
import AdminSidebar from "./sidebar";

function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="flex-1 p-4 ml-56">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
