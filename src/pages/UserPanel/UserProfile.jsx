import React, { useContext } from "react";
import pic from "../../assets/Guest1.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faMailchimp,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import MainContext from "../../context/context";

const UserProfile = ({ isModalOpen, setIsModalOpen }) => {
  const { user,setUser,logout } = useContext(MainContext);

  if (!isModalOpen) return null;

  const logoutFn = () => {
    logout()
    setIsModalOpen(false)
  }
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[800px]">
        <button
          className="absolute top-2 right-6 text-black hover:text-gray-900 text-4xl"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </button>
        <div className="flex justify-center">
          <img
            src={pic}
            alt=""
            className="rounded-full mx-auto w-32 h-32 shadow-md border-4 border-white"
          />
        </div>
        <div className="mt-16">
          <h1 className="font-bold text-center text-3xl text-gray-900">
            {user?.name}
          </h1>

          <p className="text-center text-sm text-gray-400 font-medium">
            Prime Member
          </p>

          <div className="my-5 px-6">
            <Link
              to={"/contact"}
              className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white"
            >
              Connect with <span className="font-bold">@Lucida</span>
            </Link>
          </div>
          <div className="flex justify-between items-center my-5 px-6">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-xl" /> <br />
              @lucida.
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
            >
              <FontAwesomeIcon icon={faTwitter} className="text-xl" /> <br />{" "}
              @lucida1.
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-xl" /> <br />{" "}
              @lucida.
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
            >
              <FontAwesomeIcon icon={faMailchimp} className="text-xl" /> <br />{" "}
              @lucida@gmail.com
            </a>
          </div>
          <div className="w-full">
            {/* <h3 className="font-medium text-gray-900 text-left px-6">
              Recent activities
            </h3> */}
            <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
              <Link
                to={""}
                className="flex gap-2 text-base font-medium border-t border-gray-100 text-black py-4 pl-6 pr-3 w-full hover:bg-gray-100 transition duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Personal Information
              </Link>
              <Link
                to={""}
                className="flex gap-2 text-base font-medium border-t border-gray-100 text-black py-4 pl-6 pr-3 w-full hover:bg-gray-100 transition duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                Manage Address
              </Link>
              <Link
                onClick={() => setIsModalOpen(false)}
                to={"/cart"}
                className="flex gap-2 text-base font-medium border-t border-gray-100 text-black py-4 pl-6 pr-3 w-full hover:bg-gray-100 transition duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                My Cart
              </Link>
              <Link
                onClick={() => setIsModalOpen(false)}
                to={"/orders"}
                className="flex gap-2 text-base font-medium border-t border-gray-100 text-black py-4 pl-6 pr-3 w-full hover:bg-gray-100 transition duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                My Orders
              </Link>
              <Link
                to={""}
                className="flex gap-2 text-base font-medium border-t border-gray-100 text-black py-4 pl-6 pr-3 w-full hover:bg-gray-100 transition duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                  <path
                    fillRule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                    clipRule="evenodd"
                  />
                </svg>
                View Coupons
              </Link>
              <button
                onClick={() => logoutFn()}
                className="flex gap-2 text-base font-medium border-t border-gray-100 text-black py-4 pl-6 pr-3 w-full hover:bg-gray-100 transition duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
          {/* Add the recent activities section here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
