import React, { useContext, useState } from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaChartLine,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaLock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import MainContext from "../../context/context";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(MainContext);

  // Assuming these specific sections should be locked
  const isLocked = !user.admin_status;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 bg-gray-800 text-white">
        <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6 text-center border-b border-gray-300 bg-gray-900 text-white">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <ul className="mt-6">
          {/* Dashboard */}
          <Link
            to="/admin"
            className="flex items-center p-4 hover:bg-gray-100 transition-colors"
          >
            <FaTachometerAlt className="text-xl mr-3 text-gray-700" />
            <span className="font-medium text-gray-800">Dashboard</span>
          </Link>

          {/* Products */}
          <Link
            to="/admin/products"
            className="flex items-center p-4 hover:bg-gray-100 transition-colors"
          >
            <FaBox className="text-xl mr-3 text-gray-700" />
            <span className="font-medium text-gray-800">Products</span>
          </Link>

          {/* Orders */}
          <Link
            to="/admin/orders"
            className="flex items-center p-4 hover:bg-gray-100 transition-colors"
          >
            <FaShoppingCart className="text-xl mr-3 text-gray-700" />
            <span className="font-medium text-gray-800">Orders</span>
          </Link>

          {/* Customers - Locked/Unlocked */}
          <Link
            to={isLocked ? "#" : "/admin/customers"}
            className={`flex items-center p-4 ${
              isLocked
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-gray-100 transition-colors"
            }`}
            aria-disabled={isLocked}
          >
            {isLocked && <FaLock className="text-xl mr-3 text-gray-500" />}
            <FaUsers
              className={`text-xl mr-3 ${
                isLocked ? "text-gray-500" : "text-gray-700"
              }`}
            />
            <span
              className={`font-medium ${
                isLocked ? "text-gray-500" : "text-gray-800"
              }`}
            >
              Customers
            </span>
          </Link>

          {/* Analytics - Locked/Unlocked */}
          <Link
            to={isLocked ? "#" : "/admin/analytics"}
            className={`flex items-center p-4 ${
              isLocked
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-gray-100 transition-colors"
            }`}
            aria-disabled={isLocked}
          >
            {isLocked && <FaLock className="text-xl mr-3 text-gray-500" />}
            <FaChartLine
              className={`text-xl mr-3 ${
                isLocked ? "text-gray-500" : "text-gray-700"
              }`}
            />
            <span
              className={`font-medium ${
                isLocked ? "text-gray-500" : "text-gray-800"
              }`}
            >
              Analytics
            </span>
          </Link>

          {/* Settings - Locked/Unlocked */}
          <Link
            to={isLocked ? "#" : "/admin/settings"}
            className={`flex items-center p-4 ${
              isLocked
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-gray-100 transition-colors"
            }`}
            aria-disabled={isLocked}
          >
            {isLocked && <FaLock className="text-xl mr-3 text-gray-500" />}
            <FaCog
              className={`text-xl mr-3 ${
                isLocked ? "text-gray-500" : "text-gray-700"
              }`}
            />
            <span
              className={`font-medium ${
                isLocked ? "text-gray-500" : "text-gray-800"
              }`}
            >
              Staff Overview
            </span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => logout()}
            className="flex items-center p-4 mt-auto bg-gray-100 hover:bg-gray-200 transition-colors w-full text-gray-800"
          >
            <FaSignOutAlt className="text-xl mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </ul>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminSidebar;
