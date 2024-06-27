import React from "react";

const CartModal = ({ isVisible, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 flex justify-center">
        {children}
      </div>
    </div>
  );
};

export default CartModal;
