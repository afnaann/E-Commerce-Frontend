


function ViewOrders({orders, setIsVisible, userName, isModalVisible }) {

  if (!isModalVisible) return null;

  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
      <div
        className="relative w-[32rem] rounded-sm bg-gray-50 px-4 py-8 sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute end-4 top-4 text-gray-600 transition hover:scale-150"
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
        <h2>{userName}'s Orders</h2>
        <div className="mt-4 space-y-6">
          <ul className="space-y-4 max-h-[32rem] overflow-auto" >
            {orders?.length === 0 ? (
              <h2 className="text-red-500">No Orders</h2>
            ) : (
              orders?.map((order, orderIndex) => (
                <div className="p-2 border-2 border-black" key={orderIndex}>
                <div className="text-sm font-mono " >

                    <p>Order Date: {order.order_date}</p>
                    <p>Order amount: {order.total_price}</p>
                    <p>Order Address: {order.address}</p>
                    <p>Order Items: </p>
                </div>

                <div >
                  <ul className='max-h-40 overflow-auto'>
                    {order.order_items?.map((item, itemIndex) => (
                      <li className="flex items-center gap-4 " key={itemIndex}>
                        <img
                          src={`data:image/png;base64,${item.product.Image_base64}`}
                          alt={item.product.name}
                          className="w-32 h-32 rounded object-cover"
                        />
                        <div>
                          <h3 className="text-md text-gray-900">{item.name}</h3>
                          <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                            <div>
                              <dt className="inline">Category: </dt>
                              <dd className="inline">{item.product.category.name}</dd>
                            </div>
                            <div>
                              <dt className="inline">Price: </dt>
                              <dd className="inline">₹{item.product.price}</dd>
                            </div>
                            <div>
                              <dt className="inline">Quantity: </dt>
                              <dd className="inline">{item.quantity}</dd>
                            </div>
                          </dl>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                </div>

              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewOrders;
