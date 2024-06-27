import { useContext, useEffect, useState } from "react";
import myContext from "../../components/context";
import { toast } from "react-toastify";
import axios from "axios";
import ProductPreview from "../../components/ProductPreview";
import CartModal from "../../components/cartModal";

export default function Shop() {
  const { cart, setCart, isLoggedIn } = useContext(myContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [product, setProduct] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [previewProduct, setPreviewProduct] = useState([]);
  const id = localStorage.getItem("id");
  useEffect(() => {
    axios
      .get("http://localhost:8000/products/")
      .then((res) => setProduct(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  const updateCartOnServer = async (updatedCart) => {
    try {
      await axios.patch(`http://localhost:8000/users/${id}`, {
        cart: updatedCart,
      });

      toast.success("Successfully Added");
    } catch (error) {
      toast.error("Error Updating Cart: ", error);
      console.error("Error updating cart data:", error);
    }
  };

  const handleClick = (product) => {
    let updatedCart;

    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex === -1) {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    } else {
      updatedCart = cart.map((item, index) =>
        index === productIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    setCart(updatedCart);
    updateCartOnServer(updatedCart);
  };

  const filteredProducts = product.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const productPreview = (product) => {
    setIsVisible(true);
    setPreviewProduct(product);
  };
  return (
    <div className="bg-white">
      <div className="flex justify-center mt-5 ">
        <div className="relative block w-96 ">
          <label htmlFor="Search" className="sr-only">
            {" "}
            Search{" "}
          </label>

          <input
            type="text"
            id="Search"
            placeholder="Search for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-md sm:text-sm"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Explore The Shop!
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div onClick={() => productPreview(product)}>
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
                      <strong>{product.name}</strong>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() =>
                    isLoggedIn
                      ? handleClick(product)
                      : toast.error("You Need To Login First!")
                  }
                  className="inline-block rounded-full bg-blue-600 px-16 py-3 text-sm font-medium text-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring active:text-indigo-500"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CartModal isVisible={isVisible}>
        <ProductPreview
          setIsVisible={setIsVisible}
          previewProduct={previewProduct}
          handleClick={handleClick}
        />
      </CartModal>
    </div>
  );
}
