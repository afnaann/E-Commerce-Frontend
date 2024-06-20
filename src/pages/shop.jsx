
const products = [
  {
    id: 1,
    name: "Party Ramper With Stylish Bow and Collar.",
    href: "#",
    imageSrc:
      "https://media.hunyhuny.com/9968-large_default/onesies-rompers-newborn-toddler-infant.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "20",
    color: "Beige",
    // qty: 1,
  },
  {
    id: 2,
    name: "Stylish Party Dress Soft Rampers For Infants.",
    href: "#",
    imageSrc:
      "https://media.hunyhuny.com/10104-large_default/onesies-rompers-newborn-toddler-infant.jpg",
    imageAlt: "Baby Dress in white",
    price: "25",
    color: "White",
    // qty: 1,
  },
  {
    id: 3,
    name: "Navy Collar With Soft Bamboo Cotton Ramper for Infants",
    href: "#",
    imageSrc:
      "https://media.hunyhuny.com/10164-large_default/onesies-rompers-newborn-toddler-infant.jpg",
    imageAlt: "Baby Dress in white",
    price: "40",
    color: "White",
    // qty: 1,
  },
  {
    id: 4,
    name: "Little Baby Bow Soft Bamboo Cotton Onesies For Infants",
    href: "#",
    imageSrc:
      "https://media.hunyhuny.com/10215-large_default/onesies-rompers-newborn-toddler-infant.jpg",
    imageAlt: "Baby Dress in white",
    price: "25",
    color: "Red",
  },
  {
    id: 5,
    name: "Cute Little Chicken Print Soft Rampers",
    href: "#",
    imageSrc:
      "https://media.hunyhuny.com/9974-large_default/onesies-rompers-newborn-toddler-infant.jpg",
    imageAlt: "Baby Dress in white",
    price: "39",
    color: "Blue",
  },
  {
    id: 6,
    name: "Cute Teddy Print Full Sleeves Full Length Rampers",
    href: "#",
    imageSrc:
      "https://media.hunyhuny.com/9921-large_default/onesies-rompers-newborn-toddler-infant.jpg",
    imageAlt: "Baby Dress in white",
    price: "29",
    color: "whites",
  },
  {
    id: 7,
    name: "Baby Elephant Full Sleeves Organic Cotton Winter Pant",
    href: "#",
    imageSrc:
      "https://media.hunyhuny.com/9956-large_default/onesies-rompers-newborn-toddler-infant.jpg",
    imageAlt: "Baby Dress in white",
    price: "40",
    color: "Indigo",
  },
  {
    id: 8,
    name: "Apple Print Full Sleeves Snap Button Romper And Onesies",
    href: "#",
    imageSrc:
      "https://media.hunyhuny.com/9986-large_default/onesies-rompers-newborn-toddler-infant.jpg",
    imageAlt: "Baby Dress in white",
    price: "25",
    color: "red",
  },
  // More products...
];

import { useContext, useState } from "react";
import myContext from "../components/context";
import { toast } from "react-toastify";


const handleClick = (product, cart) => {
  const productIndex = cart.findIndex((item) => item.id === product.id);


  if (productIndex === -1) {
    // Product is not in the cart, add it with quantity 1
    cart.push({ ...product, quantity: 1 });
  } else {
    // Product is already in the cart, increase its quantity
    cart[productIndex].quantity += 1;
  }

  console.log(cart);
};

export default function Shop() {
  const { cart, setCart , count, setCount, isLoggedIn} = useContext(myContext);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Explore The Shop!
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 shadow-xl">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 w-52 ">
                    {/* <a href={product.href}> */}
                    {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                    <strong>{product.name}</strong>
                    {/* </a> */}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() =>isLoggedIn ? handleClick(product, cart, setCart): toast.error('You Need To Login First!')}
                  className="inline-block rounded border border-indigo-600 bg-indigo-600 px-16 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                  Add To Cart
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
