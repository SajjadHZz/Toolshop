"use client";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import ProductsSlider from "@/components/modules/ProductsSlider/ProductsSlider";
import { ArrowLeft, BagHappy, MoneyIcon, TickCircle } from "@/components/modules/Svgs/Svgs";
import { addProductToUserOrders } from "@/redux/Orders";
import { discountCalculate, sumDiscountCalculate } from "@/utils/calculates";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteAllProductFromUserBasket } from "@/redux/Basket";
const breadcrumbPath = [
  { title: "خانه", href: "/" },
  { title: "سبد خرید", href: "/basket" },
  { title: "تسویه حساب" },
];

export default function Basket() {
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user.email && !user.loading) {
      router.replace("/");
    }
  }, [user]);
  const dispatch = useDispatch();

  const deliveryPrice = basket.sumPrice >= 5_000_000 ? 0 : 80_000;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [nationalityCode, setNationalityCode] = useState("");
  const [landline, setLandline] = useState("");
  const [numberCard, setNumberCard] = useState("");
  const [shabaCard, setShabaCard] = useState("");
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");

  const [stateList, setStateList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    fetchStates();
    fetchUserInfos();
  }, []);
  useEffect(() => {
    fetchCities();
  }, [state]);

  async function fetchUserInfos() {
    const res = await fetch("/api/user-infos");
    if (res.status === 200) {
      const data = await res.json();
      setFirstname(data?.firstname || "");
      setLastname(data?.lastname || "");
      setNumberPhone(data?.numberPhone || "");
      setState(data?.state || "");
      setCity(data?.city || "");
      setPostalCode(data?.postalCode || "");
      setAddress(data?.address || "");
      setNationalityCode(data?.nationalityCode || "");
      setLandline(data?.landline || "");
      setNumberCard(data?.numberCard || "");
      setShabaCard(data?.shabaCard || "");
      setCompany(data?.company || "");
      setJob(data?.job || "");
    }
  }
  async function fetchStates() {
    if (navigator.onLine) {
      const res = await fetch("https://iran-locations-api.ir/api/v1/fa/states");
      if (res.status === 200) {
        setStateList(await res.json());
      }
    }
  }
  async function fetchCities() {
    if (navigator.onLine) {
      const res = await fetch(`https://iran-locations-api.ir/api/v1/fa/cities?state=${state}`);
      if (res.status === 200) {
        setCitiesList(await res.json());
      }
    }
  }

  async function setUserDatas() {
    const reqBody = {
      firstname,
      lastname,
      state,
      city,
      address,
      postalCode,
      numberPhone,
      landline,
      nationalityCode,
      numberCard,
      shabaCard,
      job,
      company,
      postalCode,
    };
    const res = await fetch("/api/user-infos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    if (res.status === 200) {
      const list = basket.list.map((item) => {
        const price =
          item.count >= item.product.wholesale.number ? item.product.wholesale.price : item.product.price;
        const discount = (item.product.price - discountCalculate(price, item.product.discount)) * item.count;
        return {
          count: item.count,
          price,
          img: item.product.img[0],
          name: item.product.name,
          discount,
        };
      });
      dispatch(addProductToUserOrders({ url: "/api/orders", sumPrice: basket.sumPrice, list }));
      dispatch(deleteAllProductFromUserBasket("/api/basket"));
      router.push("/my-account");
    }
  }

  return (
    <>
      <div className="bg-gradient-to-b from-accent to-transparent py-10 relative mb-8">
        <div className="absolute start-4 top-1 lg:top-4 lg:start-8">
          <Breadcrumbs path={breadcrumbPath} />
        </div>
        <h1 className="font-Lalezar text-6xl text-center mb-8">تسویه حساب</h1>
        <p className="mx-auto text-center">
          مشتری گرامی ، در صورتی که خرید شما به مبلغ ۵,۰۰۰,۰۰۰ میلیون تومان و وزن محصول کمتر از (۳۰ کیلوگرم)
          باشد حمل و نقل شما رایگان میباشد.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4 mx-2 lg:mx-8 h-full">
        <div className="w-full h-full lg:col-span-2">
          <div className="flex justify-center items-center gap-4 bg-background p-4 rounded-3xl mb-4 border border-solid border-black text-nowrap text-xs sm:text-sm">
            <p className="flex items-center gap-2">
              <BagHappy />
              <span>سبد خرید</span>
            </p>
            <ArrowLeft />
            <p className="flex items-center gap-2 scale-125 px-4">
              <MoneyIcon />
              <span className="font-bold">تسویه حساب</span>
            </p>
            <ArrowLeft />
            <p className="flex items-center gap-2">
              <TickCircle />
              <span>ثبت سفارش</span>
            </p>
          </div>
          <form className="bg-background rounded-3xl p-4 border border-solid border-black">
            <h4 className="mb-8 font-bold text-2xl">جزئیات صورت حساب :</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-8">
              <label
                htmlFor="نام"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  نام <span className="text-error">*</span>
                </p>
                <input
                  id="نام"
                  placeholder="نام ..."
                  type="text"
                  className="bg-transparent border-none outline-none"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                />
              </label>
              <label
                htmlFor="نام خانوادگی"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  نام خانوادگی <span className="text-error">*</span>
                </p>
                <input
                  id="نام خانوادگی"
                  type="text"
                  placeholder="نام خانوادگی ..."
                  className="bg-transparent border-none outline-none"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                />
              </label>
              <label
                htmlFor="شماره همراه"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  شماره همراه <span className="text-error">*</span>
                </p>
                <input
                  id="شماره همراه"
                  type="text"
                  placeholder="شماره همراه ..."
                  className="bg-transparent border-none outline-none"
                  onChange={(e) => setNumberPhone(e.target.value)}
                  value={numberPhone}
                />
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
                  placeholder="استان ..."
                  type="text"
                  className="bg-transparent border-none outline-none w-full"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
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
                  placeholder="شهر ..."
                  type="text"
                  className="bg-transparent border-none outline-none w-full"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
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
                  placeholder="کدپستی ..."
                  className="bg-transparent border-none outline-none w-full"
                  onChange={(e) => setPostalCode(e.target.value)}
                  value={postalCode}
                />
              </label>
              <label
                htmlFor="آدرس"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3 lg:col-span-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  آدرس <span className="text-error">*</span>
                </p>
                <input
                  id="آدرس"
                  type="text"
                  placeholder="آدرس ..."
                  className="bg-transparent border-none outline-none w-full"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </label>
              <label
                htmlFor="کد ملی"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">کد ملی</p>
                <input
                  id="کد ملی"
                  type="text"
                  placeholder="کد ملی ..."
                  className="bg-transparent border-none outline-none"
                  onChange={(e) => setNationalityCode(e.target.value)}
                  value={nationalityCode}
                />
              </label>
              <label
                htmlFor="شماره ثابت"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">شماره ثابت</p>
                <input
                  id="شماره ثابت"
                  type="text"
                  placeholder="شماره ثابت ..."
                  className="bg-transparent border-none outline-none"
                  onChange={(e) => setLandline(e.target.value)}
                  value={landline}
                />
              </label>
              <label
                htmlFor="شماره کارت بانکی (جهت عودت وجه)"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-xs absolute -top-3 right-4 bg-background px-2 rounded">
                  شماره کارت بانکی (جهت عودت وجه)
                </p>
                <input
                  id="شماره کارت بانکی (جهت عودت وجه)"
                  type="text"
                  placeholder="شماره کارت بانکی ..."
                  className="bg-transparent border-none outline-none"
                  onChange={(e) => setNumberCard(e.target.value)}
                  value={numberCard}
                />
              </label>
              <label
                htmlFor="شماره شبا (جهت عودت وجه)"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-xs absolute -top-3 right-4 bg-background px-2 rounded">
                  شماره شبا (جهت عودت وجه)
                </p>
                <input
                  id="شماره شبا (جهت عودت وجه)"
                  type="text"
                  placeholder="شماره شبا ..."
                  className="bg-transparent border-none outline-none"
                  onChange={(e) => setShabaCard(e.target.value)}
                  value={shabaCard}
                />
              </label>
              <label
                htmlFor="نام شرکت یا فروشگاه"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
                  نام شرکت یا فروشگاه
                </p>
                <input
                  id="نام شرکت یا فروشگاه"
                  type="text"
                  placeholder="نام شرکت یا فروشگاه ..."
                  className="bg-transparent border-none outline-none"
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                />
              </label>
              <label
                htmlFor="شغل شما"
                className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
              >
                <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">شغل شما</p>
                <input
                  id="شغل شما"
                  type="text"
                  placeholder="شغل شما ..."
                  className="bg-transparent border-none outline-none"
                  onChange={(e) => setJob(e.target.value)}
                  value={job}
                />
              </label>
            </div>
          </form>
        </div>

        <div className="col-span-1 bg-background rounded-3xl p-4 flex-1 h-fit border-black border-solid border">
          <h4 className="text-center text-2xl font-bold">سفارش شما</h4>
          <hr className="my-4" />
          {basket.list.length ? (
            basket.list.map((item) => {
              const productPrice =
                item.count >= item.product.wholesale.number
                  ? item.product.wholesale.price
                  : item.product.price;
              return (
                <div key={item._id} className="flex justify-between items-center mb-4">
                  <p>
                    <span className="text-xs">{item.product.name}</span>
                    <span className="text-xs mx-2 inline-block">
                      {item.count.toLocaleString("fa-ir")} عدد
                    </span>
                  </p>
                  <span className="text-nowrap">
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
            onClick={setUserDatas}
            className={`btn btn-block btn-primary rounded-full ${basket.list.length || "btn-disabled"}`}
          >
            ثبت سفارش
          </button>
        </div>
      </div>

      <br />
      <br />
      <ProductsSlider title="محصولات مرتبط" route="/" />
    </>
  );
}
