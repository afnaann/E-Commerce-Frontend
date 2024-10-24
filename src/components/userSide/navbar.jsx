import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import picture from "../../assets/Guest1.png";
import fav from "../../assets/favic.png";
import UserProfile from "../../pages/UserPanel/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import MainContext from "../../context/context";
import { fetchCart } from "../../Redux/features/cart/cartThunk";
import useAxios from "../utils/useAxios";

export default function Navbar() {
  const cart = useSelector((state) => state.cart.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(MainContext);
  const api = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      dispatch(fetchCart({ userId: user.user_id, api: api }));
    }
  }, []);

  return (
    <header className="bg-customColor">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-24 w-auto" src={Logo} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center gap-32">
          <div className="hidden lg:flex lg:gap-x-12">
            <div className="relative nav">
              <Link
                to={"/"}
                className="text-md font-manrope leading-6 text-gray-900 relative inline-block"
              >
                Home
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-black transition-all duration-300"></span>
              </Link>
            </div>
            <div className="relative nav">
              <Link
                to={"/shop"}
                className="text-md font-manrope leading-6 text-gray-900 relative inline-block"
              >
                Shop
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-black transition-all duration-300"></span>
              </Link>
            </div>
            <div className="relative nav">
              <Link
                to={"about"}
                className="text-md font-manrope leading-6 text-gray-900 relative inline-block"
              >
                About Us
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-black transition-all duration-300"></span>
              </Link>
            </div>
            <div className="relative nav">
              <Link
                to={"contact"}
                className="text-md font-manrope leading-6 text-gray-900 relative inline-block"
              >
                Contact Us
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-black transition-all duration-300"></span>
              </Link>
            </div>
          </div>
          <div></div>
        </div>
        <div className="text-2xl mx-6">
          {user ? (
            <Link to={"/cart"}>
              <div className="relative">
                <span className="bg-blue-500 rounded-full text-sm px-2 text-white absolute left-4 bottom-3">
                  {cart?.length}
                </span>
                <HiOutlineShoppingCart />
              </div>
            </Link>
          ) : null}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <div
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="flex flex-col text-center"
            >
              <div className="mx-auto">
                <img src={picture} alt="photo" className="h-14" />
              </div>
              <div className="text-md font-semibold uppercase leading-none text-gray-900">
                {user?.name}
              </div>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="text-sm font-semibold leading-6 text-gray-900 bg-indigo-400 shadow-2xl py-1 px-4 rounded-md hover:bg-indigo-600"
            >
              LogIn
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full h-fit bg-indigo-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-16 w-auto" src={fav} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to={"/"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to={"/shop"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Shop
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to={"/about"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About Us
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to={"/contact"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              </div>
              <div className="py-6">
                {user ? (
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    View Profile
                  </button>
                ) : (
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to={"/login"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <UserProfile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </header>
  );
}
