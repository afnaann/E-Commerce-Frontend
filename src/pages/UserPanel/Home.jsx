import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { CardElement } from "@stripe/react-stripe-js";

function Home() {
  return (
    <div className="w-full">
      {/* Carousel Section */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        <div>
          <img
            src="https://hausandkinder.com/cdn/shop/files/3_d688df48-ca7e-478c-a3ef-68d74f4a341a.jpg?v=1707477708&width=3840"
            alt="First Slide"
          />
        </div>
        <div>
          <img
            src="https://hausandkinder.com/cdn/shop/files/1_a275fd5f-aee4-44c2-88e9-c5e83e5a6ecc.jpg?v=1707477708&width=3840"
            alt="Second Slide"
          />
        </div>
        <div>
          <img
            src="https://hausandkinder.com/cdn/shop/files/4_feaecb53-ea0d-4931-a6f6-3fb67a10d978.jpg?v=1707477708&width=3840"
            alt="Third Slide"
          />
        </div>
      </Carousel>

      {/* Other Content */}
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              New Collection
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <li>
              <Link to={"/shop"} className="group relative block">
                <img
                  src="https://hausandkinder.com/cdn/shop/products/Bluepompom..jpg?v=1671600175&width=493"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Casual Trainers
                  </h3>

                  <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </Link>
            </li>

            <li>
              <Link to={"/shop"} className="group relative block">
                <img
                  src="https://hausandkinder.com/cdn/shop/products/HK34_6fdc7d10-105d-4b31-8d51-151d609a3fc6.jpg?v=1688032741&width=493"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Winter Jumpers
                  </h3>

                  <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </Link>
            </li>

            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <Link to={"/shop"} className="group relative block">
                <img
                  src="https://hausandkinder.com/cdn/shop/files/HK08copy_1.jpg?v=1682427370&width=493"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Skinny Jeans Blue
                  </h3>

                  <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="overflow-hidden bg-white sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Welcome to Lucida: Where Every Step of Your Baby's Journey Begins
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
              Welcome to Lucida, your ultimate destination for all things baby!
              Explore our curated collection of premium products designed to
              make every moment with your little one magical and memorable. Join
              us in creating a world of comfort, style, and joy for your baby's
              journey.
            </p>

            <div className="mt-4 md:mt-8">
              <a
                href="/shop"
                className="inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://cdn.wallpapersafari.com/68/73/6e5VFb.jpg"
          className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
      </section>
      
    </div>
  );
}

export default Home;
