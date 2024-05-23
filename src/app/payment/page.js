"use client";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import ProductsSlider from "@/components/modules/ProductsSlider/ProductsSlider";
import { ArrowLeft, BagHappy, MoneyIcon, TickCircle } from "@/components/modules/Svgs/Svgs";
import { updateProductInLocalStorage, updateProductInUserBasket } from "@/redux/Basket";
import { discountCalculate, discountPercentageCalculate, sumDiscountCalculate } from "@/utils/calculates";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const breadcrumbPath = [
  { title: "خانه", href: "/" },
  { title: "سبد خرید", href: "/basket" },
  { title: "تسویه حساب" },
];

export default function Basket() {
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [stateList, setStateList] = useState([]);
  const [citiesList, setcitiesList] = useState([]);
  const [userState, setUserState] = useState("");
  const [userCity, setUserCity] = useState("");
  const deliveryPrice = basket.sumPrice >= 5_000_000 ? 0 : 80_000;

  useEffect(() => {
    fetchStates();
  }, []);
  useEffect(() => {
    fetchCities();
  }, [userState]);

  async function fetchStates() {
    const res = await fetch("https://iran-locations-api.ir/api/v1/fa/states");
    if (res.status === 200) {
      setStateList(await res.json());
    }
  }
  async function fetchCities() {
    const res = await fetch(`https://iran-locations-api.ir/api/v1/fa/cities?state=${userState}`);
    if (res.status === 200) {
      setcitiesList(await res.json());
    }
  }

  return (
    <>
      <div className="bg-gradient-to-b from-accent to-transparent py-10 relative mb-8">
        <div className="absolute top-4 right-8">
          <Breadcrumbs path={breadcrumbPath} />
        </div>
        <h1 className="font-Lalezar text-6xl text-center mb-8">تسویه حساب</h1>
        <p className="mx-auto text-center">
          مشتری گرامی ، در صورتی که خرید شما به مبلغ 5,000,000 میلیون تومان و وزن محصول کمتر از (30 کیلوگرم)
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
          <form className="bg-background rounded-3xl p-4 h-full min-h-[200px] border border-solid border-black">
            <h4 className="mb-8 font-bold text-2xl">جزئیات صورت حساب :</h4>
            <div className="grid grid-cols-3 gap-x-4 gap-y-8">
              <label
                htmlFor="نام"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  نام <span className="text-error">*</span>
                </p>
                <input id="نام" type="text" className="bg-transparent border-none outline-none" />
              </label>
              <label
                htmlFor="نام خانوادگی"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  نام خانوادگی <span className="text-error">*</span>
                </p>
                <input id="نام خانوادگی" type="text" className="bg-transparent border-none outline-none" />
              </label>
              <label
                htmlFor="شماره موبایل"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  شماره موبایل <span className="text-error">*</span>
                </p>
                <input id="شماره موبایل" type="text" className="bg-transparent border-none outline-none" />
              </label>
              <label
                htmlFor="استان"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  استان <span className="text-error">*</span>
                </p>
                <input
                  id="استان"
                  list="state"
                  type="text"
                  className="bg-transparent border-none outline-none w-full"
                  onChange={(e) => setUserState(e.target.value)}
                  value={userState}
                />
                <datalist
                  onChange={() => console.log("object")}
                  id="state"
                  className="w-full appearance-none"
                >
                  {stateList.map((item) => (
                    <option key={item.id} value={item.name} />
                  ))}
                </datalist>
              </label>
              <label
                htmlFor="شهر"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  شهر <span className="text-error">*</span>
                </p>
                <input
                  id="شهر"
                  list="city"
                  type="text"
                  className="bg-transparent border-none outline-none w-full"
                  onChange={(e) => setUserCity(e.target.value)}
                  value={userCity}
                />
                <datalist id="city" className="w-full appearance-none">
                  {citiesList.map((item, index) => (
                    <optgroup key={index}>
                      {item?.cities?.map((city) => (
                        <option key={city.id} value={city.name} />
                      ))}
                    </optgroup>
                  ))}
                </datalist>
              </label>
              <label
                htmlFor="کدپستی"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  کدپستی <span className="text-error">*</span>
                </p>
                <input
                  id="کدپستی"
                  type="text"
                  className="bg-transparent border-none outline-none w-full"
                  // onChange={(e) => setUserCity(e.target.value)}
                  // value={userCity}
                />
              </label>
              <label
                htmlFor="آدرس"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3 col-span-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  آدرس <span className="text-error">*</span>
                </p>
                <input
                  id="آدرس"
                  type="text"
                  className="bg-transparent border-none outline-none w-full"
                  // onChange={(e) => setUserCity(e.target.value)}
                  // value={userCity}
                />
              </label>
            </div>
          </form>
        </div>

        <div className="bg-background rounded-3xl p-4 flex-1 h-fit max-h-fit min-w-[500px] max-w-[550px] border border-black border-solid">
          <h4 className="text-center text-2xl font-bold">سفارش شما</h4>
          <hr className="my-4" />
          {basket.list.length ? (
            basket.list.map((item) => {
              const productPrice =
                item.count >= item.product.wholesale.number
                  ? item.product.wholesale.price
                  : item.product.price;
              return (
                <div className="flex justify-between items-center mb-4">
                  <p>
                    <span className="text-xs">{item.product.name}</span>
                    <span className="text-xs mx-2 inline-block">
                      {item.count.toLocaleString("fa-ir")} عدد
                    </span>
                  </p>
                  <span>
                    {(discountCalculate(productPrice, item.product.discount) * item.count).toLocaleString(
                      "fa-ir"
                    )}{" "}
                    تومان
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center mb-4">محصولی در سبدخرید وجود ندارد !</div>
          )}
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
          <hr className="my-4" />
          <p className="flex justify-between items-center mb-4">
            <span className="font-bold">مبلغ قابل پرداخت :</span>
            <span>
              {basket.list.length
                ? (basket.sumPrice + deliveryPrice).toLocaleString("fa-ir")
                : (0).toLocaleString("fa-ir")}{" "}
              تومان
            </span>
          </p>
          <button
            type="button"
            className={`btn btn-block btn-primary rounded-full ${basket.list.length || "btn-disabled"}`}
          >
            ثبت سفارش
          </button>
        </div>
      </div>

      <br />
      <br />
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
