import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CartModal from "../../components/cartModal";
import EditProduct from "./EditProduct";
import DeleteModal from "../../components/Modals/deleteModals";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [delId, setDelId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/products")

      .then((res) => {
        setProducts(res.data);
  
      });
  }, []);

  const editProduct = (id) => {
    setId(id);
    setIsEdit(true);
  };

  const deleteAction = (id) => {
    setDelId(id);
    setIsVisible(true);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || product.type === selectedCategory)
  );

  const categories = [...new Set(products.map((product) => product.type))];

  return (
    <div className="flex gap-11 flex-wrap justify-center mt-24">
      <div className="flex w-11/12 justify-centres gap-10">
        <div className="relative w-fit h-fit">
          <button
            onClick={toggleDropdown}
            className="text-gray-700 hover:text-blue-700 focus:outline-none"
          >
            {selectedCategory==""? "All": selectedCategory}
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul className="absolute bg-white border border-gray-200 rounded shadow-lg mt-2 w-48">
              <li
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSelectedCategory("");
                  setIsDropdownOpen(false);
                }}
              >
                All
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="hidden md:flex space-x-8 items-center h-fit ">
          <div className="relative">
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-full"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {filteredProducts.map((items, id) => (
        <div
          className="bg-indigo-200 p-10 shadow-xl rounded-lg text-center"
          key={id}
        >
          <div href="#" className="group block w-64 h-auto ">
            <img
              src={items.imageSrc}
              alt={items.imageAlt}
              className="aspect-square w-full rounded object-cover"
            />

            <div className="mt-3">
              <h3 className="font-medium text-gray-900 ">{items.name}</h3>
              <p className="text">Color: {items.color}</p>
              <p className="text">Type: {items.type}</p>
              <p className="mt-1 text-lg text-gray-800 flex justify-center mb-2">
                ${items.price}
              </p>
            </div>
            <div className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-md ">
              <button
                onClick={() => editProduct(items.id)}
                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative"
              >
                Edit
              </button>

              <button
                onClick={() => deleteAction(items.id)}
                className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <CartModal isVisible={isEdit}>
        <EditProduct id={id} setIsVisible={setIsEdit} />
      </CartModal>
      <DeleteModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setProducts={setProducts}
        products={products}
        setDelId={setDelId}
        delId={delId}
      />
    </div>
  );
}

export default ViewProducts;
