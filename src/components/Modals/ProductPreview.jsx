import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../Redux/features/cart/cartThunk";

function ProductPreview({ setIsVisible, previewProduct }) {
  
  const dispatch = useDispatch()
  return (
    <div className="bg-gray-100 py-8 max-h-fit">
    <div className="relative">

      <button
        onClick={() => setIsVisible(false)}
        className="absolute end-4 -top-4 text-gray-600 transition hover:scale-150"
      >
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-200 mb-4 w-fit">
              <img
                className="w-fit h-full rounded-lg"
                src={`data:image/png;base64,${previewProduct.Image_base64}`} 
                alt={previewProduct.name}
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button onClick={()=> dispatch(AddToCart(previewProduct))} className="w-full bg-blue-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
             
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-lg  text-gray-900 mb-2">
              Product Name:
            </h2>
            <p className="text-gray-900 text-xl font-bold mb-4">
            {previewProduct.name}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-800">Price:</span>
                <span className="text-gray-700">{previewProduct.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-800">Availability:</span>
                <span className="text-gray-700">In Stock</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Select Color:</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 mr-2"></button>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Select Size:</span>
              <div className="flex items-center mt-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-800">
                Product Description:
              </span>
              <p className="text-gray-700 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis
                dapibus augue vel ipsum pretium, et venenatis sem blandit.
                Quisque ut erat vitae nisi ultrices placerat non eget velit.
                Integer ornare mi sed ipsum lacinia, non sagittis mauris
                blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt
                mi consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
