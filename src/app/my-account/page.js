"use client";
import FavoriteBox from "@/components/modules/FavoriteBox/FavoriteBox";
import OrderBox from "@/components/modules/OrderBox/OrderBox";
import {
  CanceledOrders,
  CurrentOrders,
  DashboardFillIcon,
  DeliveryOrders,
  ReturnOrders,
} from "@/components/modules/Svgs/Svgs";
import { getProductFromUserFavorite } from "@/redux/Favorite";
import { getOrdersFromUser } from "@/redux/Orders";
import { ToastAlert } from "@/utils/sort";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const favorites = useSelector((state) => state.favorite);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductFromUserFavorite("http://localhost:3000/api/favorite"));
    dispatch(getOrdersFromUser("http://localhost:3000/api/orders"));
  }, []);

  const statBoxs = [
    {
      id: 1,
      title: "تعداد سفارش جاری",
      value: orders.current?.list.length,
      desc: orders.current?.sumPrice,
      icon: <CurrentOrders size="30" color="primary" />,
    },
    {
      id: 2,
      title: "تعداد تحویل سفارش",
      value: orders.delivery?.list.length,
      desc: orders.delivery?.sumPrice,
      icon: <DeliveryOrders size="30" color="success" />,
    },
    {
      id: 3,
      title: "سفارشات مرجوعی",
      value: orders.return?.list.length,
      desc: orders.return?.sumPrice,
      icon: <ReturnOrders size="30" color="error" />,
    },
    {
      id: 4,
      title: "سفارشات لغو شده",
      value: orders.canceled?.list.length,
      desc: orders.canceled?.sumPrice,
      icon: <CanceledOrders size="30" color="error" />,
    },
  ];

  return (
    <div className="bg-background flex-1 w-2/3 rounded-3xl">
      {/* <ToastAlert title="hello" status="error" /> */}
      <span className="alert-error" hidden></span>
      <span className="alert-success" hidden></span>
      <h3 className="text-4xl font-Lalezar m-4 flex gap-4 items-center">
        <DashboardFillIcon size="30" color="primary" />
        داشبورد
      </h3>
      <hr />

      <div className="grid grid-cols-4 items-center gap-2 m-4">
        {statBoxs.map((item) => {
          return (
            <div
              key={item.id}
              className="stat px-4 border border-solid border-text/20 rounded-xl bg-secondary"
            >
              <div className="stat-figure ">{item.icon}</div>
              <div className="stat-title">{item.title}</div>
              <div className="stat-value">{item.value?.toLocaleString("fa")}</div>
              <div className="stat-desc">{item.desc?.toLocaleString("fa")} تومان</div>
            </div>
          );
        })}
      </div>

      <div className="mx-4 my-8 border border-solid border-text/20 rounded-xl">
        <h4 className="text-xl font-bold m-4">لیست سفارشات جاری</h4>
        <hr />
        <ul className="p-4 flex flex-wrap gap-4">
          {orders.loading ? (
            <div className="bg-base-100 skeleton border border-solid border-text/20 w-fit p-4 rounded-3xl flex justify-start items-center gap-2 min-w-fit">
              <div className="w-20 h-20 skeleton to-base-200 mask mask-squircle" />
              <div>
                <div className="w-60 h-2 rounded skeleton bg-base-200 mb-4"></div>
                <div className="w-40 h-1 rounded skeleton bg-base-200"></div>
              </div>
            </div>
          ) : orders.current.list.length ? (
            orders.current.list.map((item) => {
              return (
                <li
                  key={item._id}
                  className="flex-1 border border-solid border-text/20 w-fit p-4 rounded-3xl flex justify-start items-center gap-2 min-w-fit"
                >
                  <OrderBox
                    img={item.img}
                    name={item.name}
                    price={item.price}
                    count={item.count}
                    discount={item.discount}
                  />
                </li>
              );
            })
          ) : (
            <li className="">محصولی برای نمایش یافت نشد !</li>
          )}
        </ul>
      </div>

      <div className="mx-4 my-8 border border-solid border-text/20 rounded-xl">
        <h4 className="text-xl font-bold m-4">لیست علاقه‌مندی ها</h4>
        <hr />
        <ul className="p-4">
          {favorites.length ? (
            favorites.map((item) => {
              return (
                <FavoriteBox
                  key={item._id}
                  _id={item._id}
                  img={item.img}
                  name={item.name}
                  discount={item.discount}
                  price={item.price}
                  wholesale={item.wholesale}
                  attributes={item.attributes}
                />
              );
            })
          ) : (
            <li className="">محصولی برای نمایش یافت نشد !</li>
          )}
        </ul>
      </div>
    </div>
  );
}
