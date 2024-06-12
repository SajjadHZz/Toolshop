"use client";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import { discountCalculate } from "@/utils/calculates";
import { addProductToLocalStorage, addProductToUserBasket } from "@/redux/Basket";

export default function QuicklyAccessProducts() {
  const product = useSelector((state) => state.quickly);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <input type="checkbox" id="quickly-access-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <label className="modal-backdrop" htmlFor="quickly-access-modal">
          Close
        </label>
        {/* -------------------------- Content Box -------------------------- */}
        <div className="modal-box w-11/12 max-w-3xl flex justify-between gap-8">
          <label
            htmlFor="quickly-access-modal"
            className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2"
          >
            ✕
          </label>

          {/* Images Slider */}
          <div className="w-1/3 my-auto relative">
            {!!product.discount && (
              <div className="absolute top-2 left-2 z-[2] badge badge-primary">
                {product.discount.toLocaleString("fa")}%
              </div>
            )}
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              zoom
              modules={[FreeMode, Thumbs, Zoom]}
              className="mySwiper2 mb-4"
            >
              {product.img.map((item) => {
                return (
                  <SwiperSlide key={crypto.randomUUID()}>
                    <div className="swiper-zoom-container">
                      <img src={item} alt="Product-Image" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className="mySwiper"
            >
              {product.img.map((item) => {
                return (
                  <SwiperSlide key={crypto.randomUUID()}>
                    <img src={item} alt="Product-Image" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Infos Section  */}
          <div className="w-2/3">
            <h4 className="font-bold text-xl font-Lalezar mb-2">
              <Link href={`/products/${product.name}`}>{product.name}</Link>
            </h4>
            <hr />

            <div className="w-full py-4">
              <div>
                <h5 className="font-bold mb-2">ویژگی های محصول :</h5>
                <ul className="list-disc text-text/60 mr-8 leading-loose text-sm">
                  {product.attributes.length ? (
                    product.attributes.slice(0, 3).map((attr, index) => <li key={index}>{attr}</li>)
                  ) : (
                    <li>ویژگی برای محصول درج نشده است</li>
                  )}
                </ul>
              </div>
              <div className="flex justify-center items-center divide-x divide-solid divide-text/20 divide-x-reverse my-4 text-center bg-secondary rounded-xl p-4">
                <div className="px-4 w-1/2">
                  <h5 className="text-lg font-bold mb-4">قیمت تک</h5>
                  {!!product.discount && (
                    <del className="text-text/40">{product.price.toLocaleString("fa")} تومان</del>
                  )}
                  <p className="font-bold text-primary text-xl mt-1 mb-4">
                    {discountCalculate(product.price, product.discount).toLocaleString("fa")} تومان
                  </p>
                </div>
                {!!product.wholesale.price && (
                  <div className="px-4 w-1/2">
                    <h5 className="text-lg font-bold mb-4">
                      قیمت عمده{" "}
                      <span className="text-sm font-normal">
                        ({product.wholesale.number.toLocaleString("fa")} عدد به بالا)
                      </span>
                    </h5>
                    {!!product.discount && (
                      <del className="text-text/40">{product.wholesale.price.toLocaleString("fa")} تومان</del>
                    )}
                    <p className="font-bold text-primary text-xl mt-1 mb-4">
                      {discountCalculate(product.wholesale.price, product.discount).toLocaleString("fa")}{" "}
                      تومان
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <Counter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Counter() {
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { _id, img, name, price, wholesale, discount } = useSelector((state) => state.quickly);

  function productsToBasketHandler() {
    if (user.email) {
      dispatch(addProductToUserBasket({ url: "/api/basket", productId: _id, count: counter }));
    } else {
      dispatch(
        addProductToLocalStorage({
          product: { _id, name, price, wholesale, discount, img },
          count: counter,
        })
      );
    }
  }
  return (
    <>
      <div dir="ltr" className="join">
        <button
          onClick={() => {
            setCounter((prev) => prev + 1);
          }}
          className="btn  btn-outline btn-primary join-item rounded-l-full"
        >
          +
        </button>
        <button className="join-item border border-solid border-primary text-sm w-10">
          {counter.toLocaleString("fa")}
        </button>
        <button
          onClick={() => {
            if (counter > 1) {
              setCounter((prev) => prev - 1);
            }
          }}
          className="btn btn-outline btn-primary join-item rounded-r-full"
        >
          -
        </button>
      </div>
      <button onClick={productsToBasketHandler} className="btn flex-1 btn-accent rounded-full">
        افزودن به سبد خرید
      </button>
    </>
  );
}
