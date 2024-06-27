import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 left-0">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-semibold">
          Lucida.
        </a>
 
        <button
          onClick={toggleSideNav}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {isSideNavOpen && (
        <div className="fixed inset-0 bg-slate-50 bg-opacity-25 z-30">
          <div className="fixed left-0 top-0 w-screen bg-white h-96 shadow-lg z-40">
            <button
              onClick={toggleSideNav}
              className="text-gray-700 p-4 focus:outline-none"
            >
              ✕
            </button>
            <ul className="mt-6 space-y-1">
              <li>
                <Link
                  to={"/admin"}
                  onClick={toggleSideNav}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium"> Products </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        to={"/admin/viewproducts"}
                        onClick={toggleSideNav}
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        View Products
                      </Link>
                    </li>

                    <li>
                      <Link
                        to={"/admin/addproduct"}
                        onClick={toggleSideNav}
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Add Products
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <Link
                  to={"/admin/costumers"}
                  onClick={toggleSideNav}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                >
                  Costumers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
