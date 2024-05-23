"use client";
import Link from "next/link";

import { addProductToLocalStorage, addProductToUserBasket } from "@/redux/Basket";
import { quicklyAccessProduct } from "@/redux/QuicklyAccess";
import { discountCalculate } from "@/utils/calculates";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteToLocalStorage, addProductToUserFavorite } from "@/redux/Favorite";

export default function ProductCard({ _id, img, name, price, wholesale, discount, attributes }) {
  const rendomUniqueId = crypto.randomUUID();
  const [productPrice, setProductPrice] = useState(price);
  const [isShowWholesaleNumber, setIsShowWholesaleNumber] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function quicklyAccessHandler() {
    dispatch(quicklyAccessProduct({ _id, name, attributes, price, wholesale, discount, img }));
  }

  function addToBasketHandler() {
    const count = isShowWholesaleNumber ? wholesale.number : 1;
    if (user.email) {
      dispatch(
        addProductToUserBasket({
          url: "http://localhost:3000/api/basket",
          productId: _id,
          count,
        })
      );
    } else {
      dispatch(
        addProductToLocalStorage({
          product: { _id, name, price, wholesale, discount, img },
          count,
        })
      );
    }
  }

  function addToFavoriteHandler() {
    if (user.email) {
      dispatch(
        addProductToUserFavorite({
          url: "http://localhost:3000/api/favorite",
          productId: _id,
        })
      );
    } else {
      dispatch(addFavoriteToLocalStorage({ _id, name, price, wholesale, discount, img }));
    }
  }

  return (
    <>
      <div className="relative group">
        {isShowWholesaleNumber && (
          <div className="absolute top-2 left-2 text-xs badge badge-primary animate-fade-in">
            {wholesale.number.toLocaleString("fa")} عدد
          </div>
        )}
        <img className="w-full h-full object-cover" src={img[0]} alt="Product-Image" loading="lazy" />
        <div className="absolute top-0 left-0 w-full h-full opacity-0 bg-black/40 flex justify-center items-center gap-2 rounded-xl transition-opacity group-hover:opacity-100">
          <div
            onClick={addToFavoriteHandler}
            className="lg:tooltip bg-white rounded-full p-2 cursor-pointer"
            data-tip="علاقه مندی"
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <label
            onClick={quicklyAccessHandler}
            htmlFor="quickly-access-modal"
            className="lg:tooltip bg-white rounded-full p-2 cursor-pointer"
            data-tip="دسترسی سریع"
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42 13.98 8.42 12C8.42 10.02 10.02 8.41998 12 8.41998C13.98 8.41998 15.58 10.02 15.58 12Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.47 3.71997 5.18 5.79997 2.89 9.39997C1.99 10.81 1.99 13.18 2.89 14.59C5.18 18.19 8.47 20.27 12 20.27Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm h-10 leading-normal text-justify font-bold">
          <Link href={`/products/${name}`}>{name}</Link>
        </p>

        <div className="join w-full my-4">
          <input
            onChange={() => {
              setProductPrice(price);
              setIsShowWholesaleNumber(false);
            }}
            className="join-item flex-1 btn px-0 bg-secondary font-normal"
            type="radio"
            name={rendomUniqueId}
            aria-label="قیمت تک"
            defaultChecked
          />
          {!!wholesale.price && (
            <input
              onChange={() => {
                setProductPrice(wholesale.price);
                setIsShowWholesaleNumber(true);
              }}
              className="join-item flex-1 btn px-0 bg-secondary font-normal"
              type="radio"
              name={rendomUniqueId}
              aria-label="قیمت عمده"
            />
          )}
        </div>

        {discount !== 0 && (
          <div>
            <del className="text-black/40 text-sm">
              {productPrice.toLocaleString("fa")}
              تومان
            </del>
            <span className="badge text-xs font-bold bg-accent border-none mx-2">
              {discount.toLocaleString("fa")}%
            </span>
          </div>
        )}

        <p className="font-bold">
          {discountCalculate(productPrice, discount).toLocaleString("fa")}
          تومان
        </p>
      </div>

      <svg
        onClick={addToBasketHandler}
        className="absolute left-0 bottom-0 p-2 rounded-tr-xl bg-accent stroke-black cursor-pointer"
        width="40"
        height="40"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>افزودن به سبد</title>
        <path
          d="M21.8854 11.6875V16.3646C21.8854 21.0417 20.0208 22.9167 15.3333 22.9167H9.71877C9.1146 22.9167 8.56248 22.8855 8.05206 22.8126"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3.16664 16.1667V11.6875" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M12.5313 12.5C14.4375 12.5 15.8438 10.948 15.6563 9.0417L14.9583 2.08331H10.0938L9.39586 9.0417C9.20836 10.948 10.625 12.5 12.5313 12.5Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.0938 12.5C21.1979 12.5 22.7396 10.7916 22.5313 8.69787L22.2396 5.83329C21.8646 3.12495 20.8229 2.08331 18.0937 2.08331H14.9167L15.6459 9.38541C15.8334 11.1042 17.375 12.5 19.0938 12.5Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.90622 12.5C7.62497 12.5 9.17704 11.1042 9.34371 9.38541L9.57291 7.08336L10.0729 2.08331H6.89582C4.16665 2.08331 3.12501 3.12495 2.75001 5.83329L2.45831 8.69787C2.24998 10.7916 3.80206 12.5 5.90622 12.5Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.375 19.7917C9.375 20.5729 9.15624 21.3126 8.77082 21.9376C8.5729 22.2709 8.33332 22.5729 8.05207 22.8125C8.02082 22.8542 7.98959 22.8854 7.94793 22.9167C7.21876 23.5729 6.26042 23.9583 5.20834 23.9583C3.9375 23.9583 2.80206 23.3854 2.05206 22.4895C2.03122 22.4583 2.00003 22.4375 1.9792 22.4063C1.8542 22.2604 1.73961 22.1042 1.64586 21.9376C1.26044 21.3126 1.04167 20.5729 1.04167 19.7917C1.04167 18.4792 1.64584 17.3021 2.60417 16.5417C2.78126 16.3958 2.96873 16.2709 3.16665 16.1667C3.77082 15.8229 4.46875 15.625 5.20834 15.625C6.25 15.625 7.18748 16 7.91665 16.6354C8.04165 16.7291 8.15625 16.8438 8.26041 16.9584C8.94791 17.7084 9.375 18.6979 9.375 19.7917Z"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.76041 19.7708H3.65627"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.20834 18.25V21.3646"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
