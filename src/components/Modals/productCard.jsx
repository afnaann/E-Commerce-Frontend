import React from "react";

const ProductCard = ({ items, editProduct, deleteAction }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-4 w-96" key={items.id}>
    <div className="relative">
      <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs px-2 py-1 rounded">
        {items.stock} in stock
      </span>
      <img
        className="w-full h-56 object-contain"
        src={`data:image/png;base64,${items.Image_base64}`}
        alt="Baby Stroller"
      />
    </div>
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
          Category: <br /> {items.category.name}
        </div>
      </div>
      <h3 className="text-lg font-bold mt-2">{items.name}</h3>
      <div className="flex items-center mt-2">
        <span className="text-red-500 text-xl font-semibold">
          {items.price}₹
        </span>
        {/* <span className="ml-3 text-gray-500 line-through">{items.price}</span> */}
        {/* <span className="ml-2 text-red-600 text-sm">Sale</span> */}
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => editProduct(items.id)}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Edit Product
        </button>
        <button
          onClick={() => deleteAction(items.id)}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-red-800"
        >
          Delete Product
        </button>
      </div>
    </div>
  </div>
  );
};


export default ProductCard;
