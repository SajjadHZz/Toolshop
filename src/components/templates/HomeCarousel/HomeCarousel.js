"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

export default function HomeCarousel() {
  return (
    <div className="relative group h-80 lg:h-96">
      <Swiper
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".prev_main_slider",
          nextEl: ".next_main_slider",
        }}
        slidesPerView={1}
        modules={[Autoplay, Navigation]}
        className="mySwiper w-full h-full overflow-hidden rounded-3xl"
      >
        <SwiperSlide>
          <Image
            className="w-full h-full object-cover"
            src="/images/slider_1.jpg"
            alt="Slider-Image"
            width="1600"
            height="500"
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full h-full object-cover"
            src="/images/slider_2.jpg"
            alt="Slider-Image"
            width="1600"
            height="500"
            loading="lazy"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            className="w-full h-full object-cover"
            src="/images/slider_3.jpg"
            alt="Slider-Image"
            width="1600"
            height="500"
            loading="lazy"
          />
        </SwiperSlide>
      </Swiper>

      <Arrow class="left-4 next_main_slider" left />
      <Arrow class="right-4 prev_main_slider" />
    </div>
  );
}

function Arrow(props) {
  return (
    <svg
      className={`absolute top-1/2 z-[1] -translate-y-1/2 rounded-full p-2 bg-background/40 stroke-primary cursor-pointer select-none opacity-0 transition duration-300 delay-75 hover:bg-background group-hover:opacity-100 ${props.class}`}
      width="50"
      height="50"
      viewBox="0 0 40 40"
      fill="none"
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
