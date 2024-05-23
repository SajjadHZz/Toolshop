"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/zoom";

export default function ProductImages({ img }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        zoom
        modules={[FreeMode, Thumbs, Zoom]}
        className="mySwiper2 mb-4"
      >
        {img.map((item) => {
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
        {img.map((item) => {
          return (
            <SwiperSlide key={crypto.randomUUID()}>
              <img src={item} alt="Product-Image" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide">
          <Image
            width="500"
            height="500"
            src="/images/Products/Product_Image_1.jpg"
            alt="Product-Image"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            width="500"
            height="500"
            src="/images/Products/Product_Image_2.jpg"
            alt="Product-Image"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            width="500"
            height="500"
            src="/images/Products/Product_Image_3.jpg"
            alt="Product-Image"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            width="500"
            height="500"
            src="/images/Products/Product_Image_4.jpg"
            alt="Product-Image"
            className=""
          />
        </div>
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        <div className="keen-slider__slide">
          <Image
            width="100"
            height="100"
            src="/images/Products/Product_Image_1.jpg"
            alt="Product-Image"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            width="100"
            height="100"
            src="/images/Products/Product_Image_2.jpg"
            alt="Product-Image"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            width="100"
            height="100"
            src="/images/Products/Product_Image_3.jpg"
            alt="Product-Image"
            className=""
          />
        </div>
        <div className="keen-slider__slide">
          <Image
            width="100"
            height="100"
            src="/images/Products/Product_Image_4.jpg"
            alt="Product-Image"
            className=""
          />
        </div>
      </div> */}
    </>
  );
}
