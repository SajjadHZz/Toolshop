"use client";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProductToLocalStorage, addProductToUserBasket } from "@/redux/Basket";

export default function ProductCounter({ _id, img, name, price, wholesale, discount }) {
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function productsToBasketHandler() {
    if (user.email) {
      dispatch(
        addProductToUserBasket({ url: "http://localhost:3000/api/basket", productId: _id, count: counter })
      );
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
