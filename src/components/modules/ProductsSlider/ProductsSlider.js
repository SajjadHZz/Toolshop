"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";

function ProductsSlider({ title }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchProducts();
  }, []);
  async function fetchProducts() {
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/api/products", {
      next: {
        revalidate: 60 * 60 * 12,
      },
    });
    if (res.status === 200) {
      setProducts(await res.json());
      setIsLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden m-8 py-4 px-2 rounded-3xl bg-background">
      <div className="relative flex justify-between items-center px-8 mb-4">
        <h4 className="text-2xl font-bold">{title}</h4>
        <div className="flex items-center gap-2">
          <Arrow class="prev_main_slider" />
          <Arrow class="next_main_slider" left />
        </div>
      </div>

      <Swiper
        autoHeight
        spaceBetween={10}
        slidesPerView={5}
        modules={[Navigation]}
        navigation={{
          prevEl: ".prev_main_slider",
          nextEl: ".next_main_slider",
        }}
        className="mySwiper"
      >
        {isLoading
          ? [1, 2, 3, 4, 5].map((item) => {
              return (
                <SwiperSlide
                  key={item}
                  className="h-full min-h-full overflow-hidden rounded-xl bg-white shadow max-h-none"
                >
                  <div className="h-full overflow-hidden rounded-xl bg-gray-200 animate-pulse shadow relative">
                    <div className="relative group ">
                      <div className="w-full h-72"></div>
                      <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-black/40 rounded-xl transition-opacity group-hover:opacity-100"></div>
                    </div>
                    <div className="p-4">
                      <div className="w-full h-4 leading-normal bg-gray-300 rounded-full"></div>
                      <div className="join w-full my-4">
                        <div className="join-item flex-1 btn px-0 bg-gray-200 font-normal"></div>
                        <div className="join-item flex-1 btn px-0 bg-gray-200 font-normal"></div>
                      </div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="bg-gray-300 w-1/2 h-2 inline-block rounded-sm"></span>
                        <span className="w-6 h-4 inline-block rounded-full bg-gray-300 mx-2"></span>
                      </div>
                      <p className="w-10 h-2 bg-gray-300 block rounded-sm"></p>
                    </div>
                    <span className="w-10 h-10 absolute left-0 bottom-0 inline-block bg-gray-300 rounded-tr-xl"></span>
                  </div>
                </SwiperSlide>
              );
            })
          : products.map((product) => {
              return (
                <SwiperSlide
                  key={product._id}
                  className="h-full min-h-full overflow-hidden rounded-xl bg-white shadow max-h-none"
                >
                  <ProductCard
                    _id={product._id}
                    img={product.img}
                    name={product.name}
                    price={product.price}
                    wholesale={product.wholesale}
                    discount={product.discount}
                    attributes={product.attributes}
                  />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </section>
  );
}

function Arrow(props) {
  return (
    <svg
      onClick={props.onClick}
      className={`rounded-full p-2 bg-secondary stroke-primary cursor-pointer select-none transition duration-300 delay-75 hover:scale-110 ${props.class}`}
      width="50"
      height="50"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.left && (
        <path
          d="M25 33.2L14.1333 22.3333C12.85 21.05 12.85 18.95 14.1333 17.6667L25 6.8"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {!props.left && (
        <path
          d="M14.85 33.2L25.7166 22.3333C27 21.05 27 18.95 25.7166 17.6667L14.85 6.8"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default ProductsSlider;
