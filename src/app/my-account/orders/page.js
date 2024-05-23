"use client";
import OrderBox from "@/components/modules/OrderBox/OrderBox";
import { CanceledOrders, CurrentOrders, DeliveryOrders, ReturnOrders } from "@/components/modules/Svgs/Svgs";
import { getOrdersFromUser } from "@/redux/Orders";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Orders() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
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
      <h3 className="text-4xl font-Lalezar m-4">سفارشات</h3>
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
      {Object.values(orders).map((item, index) => {
        let title = "";
        switch (index) {
          case 0:
            title = "لیست سفارشات جاری";
            break;
          case 1:
            title = "لیست سفارشات تحویل داده شده";
            break;
          case 2:
            title = "لیست سفارشات مرجوعی";
            break;
          case 3:
            title = "لیست سفارشات لغو شده";
            break;
        }
        return <OrdersList title={title} orders={item} />;
      })}
    </div>
  );
}

function OrdersList({ title, orders }) {
  return (
    <div className="mx-4 my-8 border border-solid border-text/20 rounded-xl">
      <h4 className="text-xl font-bold m-4">{title}</h4>
      <hr />
      <ul className="p-4">
        {orders.list.length ? (
          orders.list.map((item) => {
            return <OrderBox key={item._id} {...item} />;
          })
        ) : (
          <li className="">محصولی برای نمایش یافت نشد !</li>
        )}
      </ul>
    </div>
  );
}
