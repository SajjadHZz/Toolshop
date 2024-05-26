"use client";
import {
  deleteProductFromUserBasket,
  deleteProductInLocalStorage,
  getProductFromUserBasket,
  updateProductInLocalStorage,
  updateProductInUserBasket,
} from "@/redux/Basket";
import { discountCalculate } from "@/utils/calculates";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BasketButtonNav() {
  const inputNavBasket = useRef();
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductFromUserBasket("http://localhost:3000/api/basket"));
  }, []);

  function deleteHandler(product) {
    return () => {
      if (user.email) {
        dispatch(
          deleteProductFromUserBasket({
            url: "http://localhost:3000/api/basket",
            productId: product.product._id,
          })
        );
      } else {
        dispatch(deleteProductInLocalStorage(product.product._id));
      }
    };
  }

  function basketButtonHandler() {
    inputNavBasket.current.checked = false;
  }

  return (
    <div className="drawer w-fit">
      <input ref={inputNavBasket} id="nav-basket" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="nav-basket"
          tabIndex={0}
          className="relative group w-12 btn btn-outline btn-primary px-0 bg-background border-text/20 rounded-full font-IranSans text-xs font-light"
        >
          <svg
            className="stroke-primary group-hover:stroke-background"
            width="20"
            height="20"
            viewBox="0 0 31 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3481 3.49625L6.73328 8.12381"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.4814 3.49625L24.0962 8.12381"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.66663 10.9539C2.66663 8.59549 3.92869 8.40427 5.49671 8.40427H25.3328C26.9008 8.40427 28.1629 8.59549 28.1629 10.9539C28.1629 13.6947 26.9008 13.5035 25.3328 13.5035H5.49671C3.92869 13.5035 2.66663 13.6947 2.66663 10.9539Z"
              strokeWidth="2"
            />
            <path d="M12.5592 18.794V23.3196" strokeWidth="2" strokeLinecap="round" />
            <path d="M18.4233 18.794V23.3196" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M4.57886 13.6947L6.37634 24.7091C6.78428 27.1822 7.76589 28.9925 11.4118 28.9925H19.099C23.0636 28.9925 23.65 27.2587 24.109 24.8621L26.2507 13.6947"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="badge w-4 h-4 px-0 absolute -top-1 -right-1 text-xs bg-accent border-none">
            {basket?.list?.length.toLocaleString("fa")}
          </span>
        </label>
      </div>
      <div className="drawer-side z-10">
        <label htmlFor="nav-basket" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex flex-col w-80 max-h-full h-full bg-background">
          <div className="px-4 py-2 flex justify-between items-center">
            <h4 className="text-2xl font-bold font-Lalezar">سبد خرید</h4>
            <label htmlFor="nav-basket" aria-label="close sidebar" className="btn btn-ghost btn-circle">
              ✕
            </label>
          </div>
          <hr />
          <div className="flex-1 overflow-auto">
            {basket.list.length ? (
              basket.list.map((item) => {
                return (
                  <div
                    key={item.product._id}
                    className="flex items-stretch gap-2 p-2 transition-colors hover:bg-secondary relative"
                  >
                    <img src={item.product.img[0]} alt="" className="w-24 mask mask-squircle" />
                    <div className="flex flex-col justify-between items-start">
                      <h5 className="text-sm">{item.product.name}</h5>
                      <Counter
                        count={item.count}
                        productId={item.product._id}
                        price={discountCalculate(item.product.price, item.product.discount)}
                        wholesale={discountCalculate(item.product.wholesale.price, item.product.discount)}
                        wholeNum={item.product.wholesale.number}
                      />
                    </div>
                    <svg
                      onClick={deleteHandler(item)}
                      width="16"
                      height="18"
                      viewBox="0 0 20 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-2 bottom-2 fill-error cursor-pointer transition-transform hover:scale-110"
                    >
                      <path d="M19.0697 4.23C17.4597 4.07 15.8497 3.95 14.2297 3.86V3.85L14.0097 2.55C13.8597 1.63 13.6397 0.25 11.2997 0.25H8.67967C6.34967 0.25 6.12967 1.57 5.96967 2.54L5.75967 3.82C4.82967 3.88 3.89967 3.94 2.96967 4.03L0.929669 4.23C0.509669 4.27 0.209669 4.64 0.249669 5.05C0.289669 5.46 0.649669 5.76 1.06967 5.72L3.10967 5.52C8.34967 5 13.6297 5.2 18.9297 5.73C18.9597 5.73 18.9797 5.73 19.0097 5.73C19.3897 5.73 19.7197 5.44 19.7597 5.05C19.7897 4.64 19.4897 4.27 19.0697 4.23Z" />
                      <path d="M17.2297 7.14C16.9897 6.89 16.6597 6.75 16.3197 6.75H3.67975C3.33975 6.75 2.99975 6.89 2.76975 7.14C2.53975 7.39 2.40975 7.73 2.42975 8.08L3.04975 18.34C3.15975 19.86 3.29975 21.76 6.78975 21.76H13.2097C16.6997 21.76 16.8398 19.87 16.9497 18.34L17.5697 8.09C17.5897 7.73 17.4597 7.39 17.2297 7.14ZM11.6597 16.75H8.32975C7.91975 16.75 7.57975 16.41 7.57975 16C7.57975 15.59 7.91975 15.25 8.32975 15.25H11.6597C12.0697 15.25 12.4097 15.59 12.4097 16C12.4097 16.41 12.0697 16.75 11.6597 16.75ZM12.4997 12.75H7.49975C7.08975 12.75 6.74975 12.41 6.74975 12C6.74975 11.59 7.08975 11.25 7.49975 11.25H12.4997C12.9097 11.25 13.2497 11.59 13.2497 12C13.2497 12.41 12.9097 12.75 12.4997 12.75Z" />
                    </svg>
                  </div>
                );
              })
            ) : (
              <div className="text-center mt-10">محصولی در سبد خرید یافت نشد !</div>
            )}
          </div>
          <hr />
          <div className="p-4">
            <p className="flex justify-between items-center text-lg mb-4">
              <span>جمع مبلغ :</span>
              <span className="text-primary fontMedium">{basket?.sumPrice?.toLocaleString("fa")} تومان</span>
            </p>
            <Link
              href="/basket"
              scroll={true}
              onClick={basketButtonHandler}
              className={`btn btn-block btn-accent rounded-full my-1 ${basket.list.length || "btn-disabled"}`}
            >
              مشاهده سبد خرید
            </Link>
            <Link
              href="/payment"
              scroll={true}
              onClick={basketButtonHandler}
              className={`btn btn-block btn-accent rounded-full my-1 ${
                (basket.list.length && user.email) || "btn-disabled"
              }`}
            >
              تسویه حساب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Counter({ productId, price, count, wholesale, wholeNum }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [counter, setCounter] = useState(count);
  const [productPrice, setProductPrice] = useState(wholeNum > counter ? price : wholesale);

  function updateCounter(number) {
    if (user.email) {
      dispatch(
        updateProductInUserBasket({ url: "http://localhost:3000/api/basket", productId, counter: number })
      );
    } else {
      dispatch(updateProductInLocalStorage({ productId, count: number }));
    }
  }

  return (
    <>
      <div dir="ltr" className="join">
        <button
          onClick={() => {
            setCounter((prev) => prev + 1);
            const number = counter + 1;
            updateCounter(number);
            wholeNum - 1 < number ? setProductPrice(wholesale) : setProductPrice(price);
          }}
          className="btn btn-xs btn-outline btn-primary join-item rounded-l-full"
        >
          +
        </button>
        <button className="join-item border border-solid border-primary text-xs w-8">
          {counter.toLocaleString("fa")}
        </button>
        <button
          onClick={() => {
            if (counter > 1) {
              setCounter((prev) => prev - 1);
              const number = counter - 1;
              updateCounter(number);
              wholeNum - 1 < number ? setProductPrice(wholesale) : setProductPrice(price);
            }
          }}
          className="btn btn-xs btn-outline btn-primary join-item rounded-r-full"
        >
          -
        </button>
      </div>
      <p className="text-xs">
        <span className="align-middle mx-1">{count.toLocaleString("fa")} ✕</span>
        <span>{productPrice.toLocaleString("fa")} تومان</span>
      </p>
    </>
  );
}
