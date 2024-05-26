"use client";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import ProductsSlider from "@/components/modules/ProductsSlider/ProductsSlider";
import { ArrowLeft, BagHappy, MoneyIcon, TickCircle } from "@/components/modules/Svgs/Svgs";
import {
  deleteProductFromUserBasket,
  deleteProductInLocalStorage,
  updateProductInLocalStorage,
  updateProductInUserBasket,
} from "@/redux/Basket";
import { discountCalculate, discountPercentageCalculate, sumDiscountCalculate } from "@/utils/calculates";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const breadcrumbPath = [{ title: "خانه", href: "/" }, { title: "سبد خرید" }];

export default function Basket() {
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deliveryPrice = basket.sumPrice >= 5_000_000 ? 0 : 80_000;

  function deleteProductHandler(product) {
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

  return (
    <>
      <div className="bg-gradient-to-b from-accent to-transparent py-10 relative mb-8">
        <div className="absolute top-4 right-8">
          <Breadcrumbs path={breadcrumbPath} />
        </div>
        <h1 className="font-Lalezar text-6xl text-center mb-8">سبد خرید</h1>
        <p className="mx-auto text-center">
          مشتری گرامی ، در صورتی که خرید شما به مبلغ ۵,۰۰۰,۰۰۰ میلیون تومان و وزن محصول کمتر از (۳۰ کیلوگرم)
          باشد حمل و نقل شما رایگان میباشد.
        </p>
      </div>
      <div className="flex justify-between gap-4 mx-8 h-full">
        <div className="w-full h-full">
          <div className="flex justify-center items-center gap-4 bg-background p-4 rounded-3xl mb-4 border border-solid border-black">
            <p className="flex items-center gap-2">
              <BagHappy />
              <span className="">سبد خرید</span>
            </p>
            <ArrowLeft />
            <p className="flex items-center gap-2">
              <MoneyIcon />
              <span className="">تسویه حساب</span>
            </p>
            <ArrowLeft />
            <p className="flex items-center gap-2">
              <TickCircle />
              <span className="">ثبت سفارش</span>
            </p>
          </div>
          <div className="bg-background rounded-3xl p-4 h-full min-h-[200px] border border-solid border-black">
            <table className="divide-y divide-solid divide-black w-full">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  <th className="p-2">محصول</th>
                  <th className="p-2">تعداد</th>
                  <th className="p-2">قیمت</th>
                  <th className="p-2">جمع جزء</th>
                </tr>
              </thead>

              <tbody className="relative h-full">
                {basket.list.length ? (
                  basket.list.map((item) => {
                    const isWholesale = item.count >= item.product.wholesale.number;
                    const productPrice = isWholesale ? item.product.wholesale.price : item.product.price;

                    return (
                      <tr key={item._id} className="bg-background transition-colors hover:bg-secondary">
                        <td
                          onClick={deleteProductHandler(item)}
                          className="cursor-pointer transition-colors hover:text-error px-2"
                        >
                          ✕
                        </td>
                        <td className="p-2 relative">
                          <div className="relative inline-block mask mask-squircle ">
                            <img
                              src={item.product.img[0]}
                              alt="Image-Product"
                              className="w-24 inline-block align-middle"
                            />
                            {isWholesale && (
                              <p className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black/20 text-error font-bold">
                                <span className="badge badge-accent">خرید عمده</span>
                              </p>
                            )}
                          </div>
                          <p className="max-w-60 inline-block align-middle mx-2">{item.product.name}</p>
                          <div className="absolute top-2 right-2 flex gap-1">
                            {!!item.product.discount && (
                              <span className="badge badge-xs py-2 badge-primary ">
                                {item.product.discount.toLocaleString("fa-ir")}%
                              </span>
                            )}
                            {isWholesale && (
                              <span className="badge badge-xs py-2 badge-accent">
                                {discountPercentageCalculate(
                                  item.product.price,
                                  item.product.wholesale.price
                                ).toLocaleString("fa-ir")}
                                %
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          {(!!item.product.discount || isWholesale) && (
                            <del className="text-sm text-text/40">
                              {item.product.price.toLocaleString("fa-ir")}
                              تومان
                            </del>
                          )}
                          <p>
                            {discountCalculate(productPrice, item.product.discount).toLocaleString("fa-ir")}{" "}
                            تومان
                          </p>
                        </td>
                        <td className="p-2">
                          <Counter
                            count={item.count}
                            productId={item.product._id}
                            price={discountCalculate(item.product.price, item.product.discount)}
                            wholesale={discountCalculate(item.product.wholesale.price, item.product.discount)}
                            wholeNum={item.product.wholesale.number}
                          />
                        </td>
                        <td className="p-2 text-center w-36">
                          {(
                            discountCalculate(productPrice, item.product.discount) * item.count
                          ).toLocaleString("fa-ir")}{" "}
                          تومان
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="absolute top-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
                    <td>هیچ محصولی در سبد خرید شما وجود ندارد</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-background rounded-3xl p-4 flex-1 h-fit max-h-fit min-w-[400px] max-w-[550px] border border-black border-solid">
          <h4 className="text-center text-2xl font-bold">فاکتور سبد خرید</h4>
          <hr className="my-4" />
          <p className="flex justify-between items-center mb-4">
            <span className="font-bold">قیمت کالا ها :</span>
            <span>{basket.sumPrice.toLocaleString("fa-ir")} تومان</span>
          </p>
          <p className="flex justify-between items-center mb-4">
            <span className="font-bold">هزینه ارسال :</span>
            <span>
              {!basket.list.length
                ? (0).toLocaleString("fa-ir") + "تومان"
                : deliveryPrice
                ? deliveryPrice.toLocaleString("fa-ir") + "تومان"
                : "رایگان"}
            </span>
          </p>
          <p className="flex justify-between items-center mb-4 text-error">
            <span className="font-bold">مجموع تخفیفات شما :</span>
            <span>{sumDiscountCalculate(basket).toLocaleString("fa-ir")} تومان</span>
          </p>
          <p className="flex justify-between items-center mb-4">
            <span className="font-bold">مجموع :</span>
            <span>
              {basket.list.length
                ? (basket.sumPrice + deliveryPrice).toLocaleString("fa-ir")
                : (0).toLocaleString("fa-ir")}{" "}
              تومان
            </span>
          </p>
          <Link
            href="/payment"
            scroll
            type="button"
            className={`btn btn-block btn-primary rounded-full ${
              (basket.list.length && user.email) || "btn-disabled"
            }`}
          >
            ادامه جهت تسویه حساب
          </Link>
        </div>
      </div>
      <ProductsSlider title="محصولات مرتبط" />
    </>
  );
}

function Counter({ productId, price, count, wholesale, wholeNum }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [counter, setCounter] = useState(count);

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
    <div dir="ltr" className="join">
      <button
        onClick={() => {
          setCounter((prev) => prev + 1);
          const number = counter + 1;
          updateCounter(number);
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
          }
        }}
        className="btn btn-xs btn-outline btn-primary join-item rounded-r-full"
      >
        -
      </button>
    </div>
  );
}
