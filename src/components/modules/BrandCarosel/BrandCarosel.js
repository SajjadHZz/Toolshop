"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode, Autoplay } from "swiper/modules";

function BrandCarosel({ brands }) {
  return (
    <Swiper
      loop
      breakpoints={{
        500: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        850: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1100: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      slidesPerView={2}
      spaceBetween={15}
      freeMode={true}
      centeredSlides={true}
      modules={[FreeMode, Autoplay]}
      className="mySwiper"
    >
      {brands.map((item) => {
        return (
          <SwiperSlide key={item._id}>
            <img
              className="object-contain w-full max-w-40 h-20"
              src={item.img}
              alt={item.name}
              title={item.name}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default BrandCarosel;
