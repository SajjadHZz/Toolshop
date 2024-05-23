"use client";
import FavoriteBox from "@/components/modules/FavoriteBox/FavoriteBox";
import OrderBox from "@/components/modules/OrderBox/OrderBox";
import { CanceledOrders, CurrentOrders, DeliveryOrders, ReturnOrders } from "@/components/modules/Svgs/Svgs";
import { getProductFromUserFavorite } from "@/redux/Favorite";
import { getOrdersFromUser } from "@/redux/Orders";
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
      value: orders.current.list.length,
      desc: orders.current.sumPrice,
      icon: <CurrentOrders />,
    },
    {
      id: 2,
      title: "تعداد تحویل سفارش",
      value: orders.delivery.list.length,
      desc: orders.delivery.sumPrice,
      icon: <DeliveryOrders />,
    },
    {
      id: 3,
      title: "سفارشات مرجوعی",
      value: orders.return.list.length,
      desc: orders.return.sumPrice,
      icon: <ReturnOrders />,
    },
    {
      id: 4,
      title: "سفارشات لغو شده",
      value: orders.canceled.list.length,
      desc: orders.canceled.sumPrice,
      icon: <CanceledOrders />,
    },
  ];

  return (
    <div className="bg-background flex-1 w-2/3">
      <h3 className="text-4xl font-Lalezar m-4">داشبورد</h3>
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
        <ul className="p-4">
          {orders.current.list.length ? (
            orders.current.list.map((item) => {
              return <OrderBox key={item._id} {...item} />;
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
              return <FavoriteBox key={item._id} {...item} />;
            })
          ) : (
            <li className="">محصولی برای نمایش یافت نشد !</li>
          )}
        </ul>
      </div>
    </div>
  );
}
