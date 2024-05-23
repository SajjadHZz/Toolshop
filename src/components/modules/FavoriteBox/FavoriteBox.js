import { addProductToLocalStorage, addProductToUserBasket } from "@/redux/Basket";
import { deleteFavoriteInLocalStorage, deleteProductFromUserFavorite } from "@/redux/Favorite";
import { quicklyAccessProduct } from "@/redux/QuicklyAccess";
import { discountCalculate } from "@/utils/calculates";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeeQuicklyIcon, TrushIcon } from "../Svgs/Svgs";

export default function FavoriteBox({ _id, img, name, discount, price, wholesale, attributes }) {
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  function quicklyAccessHandler() {
    dispatch(quicklyAccessProduct({ _id, name, attributes, price, wholesale, discount, img }));
  }

  function deleteHandler() {
    if (user.email) {
      dispatch(
        deleteProductFromUserFavorite({
          url: "http://localhost:3000/api/favorite",
          productId: _id,
        })
      );
    } else {
      dispatch(deleteFavoriteInLocalStorage(_id));
    }
  }

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
    <div className="flex gap-4 items-center border border-solid border-text/5 transition-colors hover:bg-secondary p-2 rounded-xl mb-2">
      <div className="relative group">
        <img
          src={img[0]}
          alt="Product-Image"
          className=" w-40 mask mask-squircle transition group-hover:brightness-75"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <div
            onClick={deleteHandler}
            className="lg:tooltip bg-white rounded-full p-2 cursor-pointer"
            data-tip="حذف"
          >
            <TrushIcon />
          </div>
          <label
            onClick={quicklyAccessHandler}
            htmlFor="quickly-access-modal"
            className="lg:tooltip bg-white rounded-full p-2 cursor-pointer"
            data-tip="دسترسی سریع"
          >
            <SeeQuicklyIcon />
          </label>
        </div>
      </div>
      <div className="w-full">
        <h4 className="font-bold">{name}</h4>
        <div className="flex gap-4">
          <div className="flex-1 flex justify-center items-center border border-solid border-text/20 divide-x divide-solid divide-text/20 divide-x-reverse my-4 text-center bg-background rounded-xl py-2">
            <div className="px-4 w-1/2">
              <h5 className="font-bold mb-4">قیمت تک</h5>
              {!!discount && <del className="text-text/40">{price.toLocaleString("fa")} تومان</del>}
              <p className="font-bold text-primary my-1">
                {discountCalculate(price, discount).toLocaleString("fa")} تومان
              </p>
            </div>
            {!!wholesale.price && (
              <div className="px-4 w-1/2 min-w-fit">
                <h5 className="font-bold mb-4">
                  قیمت عمده{" "}
                  <span className="text-xs font-normal">
                    ({wholesale.number.toLocaleString("fa")} عدد به بالا)
                  </span>
                </h5>
                {!!discount && (
                  <del className="text-text/40">{wholesale.price.toLocaleString("fa")} تومان</del>
                )}
                <p className="font-bold text-primary my-1">
                  {discountCalculate(wholesale.price, discount).toLocaleString("fa")} تومان
                </p>
              </div>
            )}
          </div>
          <div className="max-w-40 self-center">
            <div dir="ltr" className="join my-2 w-full">
              <button
                onClick={() => {
                  setCounter((prev) => prev + 1);
                }}
                className="btn btn-outline btn-primary join-item rounded-l-full"
              >
                +
              </button>
              <button className="join-item border border-solid border-primary text-sm w-full">
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
            <button onClick={productsToBasketHandler} className="btn btn-accent rounded-full btn-block">
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
