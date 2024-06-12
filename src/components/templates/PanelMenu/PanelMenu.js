"use client";
import {
  DashboardIcon,
  LogoutIcon,
  ShoppingCard,
  TaskIcon,
  TicketMessage,
  UserSquare,
} from "@/components/modules/Svgs/Svgs";
import { signoutUserFromServer } from "@/redux/User";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

export default function PanelMenu() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const sidebarList = [
    { id: 1, title: "داشبورد", icon: <DashboardIcon size="22" />, path: "/my-account" },
    {
      id: 2,
      title: "سفارش ها",
      icon: <ShoppingCard size="22" />,
      path: "/my-account/orders",
    },
    {
      id: 3,
      title: "علاقه‌مندی ها",
      icon: <TaskIcon size="22" />,
      path: "/my-account/favorites",
    },
    // { id: 4, title: "تیکت پشتیبانی", icon: <TicketMessage size="22" />, path: "/my-account/tickets"},
    {
      id: 5,
      title: "جزئیات حساب",
      icon: <UserSquare size="22" />,
      path: "/my-account/settings",
    },
  ];

  function signoutUserHandler() {
    dispatch(signoutUserFromServer("/api/auth/signout"));
  }

  return (
    <ul>
      {sidebarList.map((item) => {
        return (
          <li key={item.id}>
            <Link href={item.path} scroll>
              <input
                className="peer"
                type="radio"
                name="aside-list-account"
                id={`aside-list-account-${item.id}`}
                checked={item.path === pathname}
                onChange={() => {}}
                hidden
              />
              <label
                htmlFor={`aside-list-account-${item.id}`}
                className="p-4 flex gap-2 items-center border-0 transition-all hover:border-r-8 peer-checked:border-r-8 border-primary border-solid stroke-primary cursor-pointer hover:bg-gradient-to-l hover:from-gray-100 hover:to-transparent hover:stroke-accent-active peer-checked:bg-gradient-to-l peer-checked:from-gray-100 peer-checked:to-transparent peer-checked:stroke-accent-active"
              >
                {item.icon}
                {item.title}
              </label>
            </Link>
          </li>
        );
      })}

      <button
        type="submit"
        onClick={signoutUserHandler}
        className="w-full p-4 flex gap-2 items-center text-red-500 stroke-red-600 border-0 transition-all hover:border-r-8 border-error border-solid cursor-pointer hover:bg-gradient-to-l hover:from-red-100 hover:to-transparent"
      >
        <LogoutIcon />
        خروج از حساب
      </button>
    </ul>
  );
}
