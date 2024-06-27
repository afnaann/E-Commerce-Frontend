import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import Header from "./adminHeader";
import AdminPreview from "../../components/adminPreview";

function AdminLayout() {
  return (
    <div>
      <div>
      <Header/>
      </div>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
