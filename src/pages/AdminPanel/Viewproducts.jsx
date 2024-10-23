import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CartModal from "../../components/Modals/cartModal";
import EditProduct from "./EditProduct";
import DeleteModal from "../../components/Modals/deleteModals";
import { useSelector, useDispatch } from "react-redux";
import AddProduct from "./AddProduct";
import { fetchProducts } from "../../Redux/features/products/productsThunk";
import ProductCard from "../../components/Modals/productCard";

function ViewProducts() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [delId, setDelId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAdd, setIsAdd] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const editProduct = (id) => {
    setId(id);
    setIsEdit(true);
  };

  const deleteAction = (id) => {
    setDelId(id);
    setIsVisible(true);
  };

  const filteredProducts = products?.filter(
    (product) =>
      product?.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" || product.category.name === selectedCategory)
  );

  const categories = [
    ...new Set(products?.map((product) => product?.category.name)),
  ];

  return (
    <div className="flex flex-col items-center mt-24">
      <div className="flex flex-wrap justify-between items-center w-11/12 mb-6">
      <div className="relative inline-block">
  <button
    onClick={toggleDropdown}
    className="text-gray-700 hover:text-blue-600 focus:outline-none flex items-center font-medium transition-colors duration-200 ease-in-out"
  >
    {selectedCategory === "" ? "All Categories" : selectedCategory}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${
        isDropdownOpen ? "rotate-180" : "rotate-0"
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </button>

  {isDropdownOpen && (
    <ul className="absolute left-0 bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-56 z-20 divide-y divide-gray-100">
      <li
        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-800 font-normal transition-colors duration-200"
        onClick={() => {
          setSelectedCategory("");
          setIsDropdownOpen(false);
        }}
      >
        All Categories
      </li>
      {categories.map((category) => (
        <li
          key={category}
          onClick={() => {
            setSelectedCategory(category);
            setIsDropdownOpen(false);
          }}
          className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-800 font-normal transition-colors duration-200"
        >
          {category}
        </li>
      ))}
    </ul>
  )}
</div>


        <div className="flex items-center space-x-4">
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
          <button
            onClick={() => setIsAdd(true)}
            className="bg-emerald-700 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Add New Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12">
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product.id} // Use product.id for keys
            items={product}
            editProduct={editProduct}
            deleteAction={deleteAction}
          />
        ))}
      </div>

      {isEdit && <EditProduct id={id} setIsVisible={setIsEdit} />}
      {isVisible && (
        <DeleteModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          products={products}
          setDelId={setDelId}
          delId={delId}
        />
      )}
      {isAdd && <AddProduct setIsAdd={setIsAdd} products={products} />}
    </div>
  );
}

export default ViewProducts;
