import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductPreview from "../../components/Modals/ProductPreview";
import CartModal from "../../components/Modals/cartModal";
import { useDispatch, useSelector } from "react-redux";
import MainContext from "../../context/context";
import { fetchProducts } from "../../Redux/features/products/productsThunk";
import { AddToCart } from "../../Redux/features/cart/cartThunk";
import useAxios from "../../components/utils/useAxios";

export default function Shop() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);
  const { user } = useContext(MainContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [previewProduct, setPreviewProduct] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const api = useAxios();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleClick = (productId) => {
    dispatch(
      AddToCart({ userId: user.user_id, productId: productId, api: api })
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const filteredProducts = product?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.name);
    return matchesSearch && matchesCategory;
  });

  const productPreview = (product) => {
    setIsVisible(true);
    setPreviewProduct(product);
  };

  const categories = [
    ...new Set(product?.map((product) => product?.category.name)),
  ];

  return (
    <div className="">
      {/* Search Bar and Category Dropdown Side by Side */}
      <div className="flex justify-center mt-5 space-x-4">
        {/* Search Bar */}
        <div className="relative block w-80">
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

        {/* Category Dropdown (Click) */}
        <div className="relative inline-block">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
          >
            Filter by Category
          </button>

          {categoryDropdownOpen && (
            <div className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg">
              <div className="p-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm text-gray-900"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Explore The Shop!
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts?.map((product) => (
            <div key={product.id} className="group relative">
              <div onClick={() => productPreview(product)}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 shadow-xl">
                  <img
                    src={`data:image/png;base64,${product.Image_base64}`}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 w-52 ">
                      <strong>{product.name}</strong>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category.name}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{product.price}
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() =>
                    user
                      ? handleClick(product.id)
                      : toast.error("You Need To Login First!")
                  }
                  className="inline-block rounded-md bg-indigo-600 px-16 py-3 text-sm font-medium text-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring active:text-indigo-500"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Preview Modal */}
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
