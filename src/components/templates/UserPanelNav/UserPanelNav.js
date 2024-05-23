"use client";
import Link from "next/link";
import {
  DashboardIcon,
  LogoutIcon,
  ShoppingCard,
  TaskIcon,
  UserSquare,
} from "@/components/modules/Svgs/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserAuth, signinUserToServer } from "@/redux/User";

const menuList = [
  { id: 1, title: "داشبورد", icon: <DashboardIcon size="22" />, path: "/my-account" },
  { id: 2, title: "سفارش ها", icon: <ShoppingCard size="22" />, path: "/my-account/orders" },
  { id: 3, title: "علاقه‌مندی ها", icon: <TaskIcon size="22" />, path: "/my-account/favorites" },
  // { id: 4, title: "تیکت پشتیبانی", icon: <TicketMessage size="22" />, path: "/my-account/tickets" },
  { id: 5, title: "جزئیات حساب", icon: <UserSquare size="22" />, path: "/my-account/settings" },
];

export default function UserPanelNav() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserAuth("http://localhost:3000/api/auth/me"));
  }, []);

  async function loginHandler(e) {
    e.preventDefault();
    dispatch(signinUserToServer({ url: "http://localhost:3000/api/auth/signin", email, password, basket }));
  }

  return (
    <>
      {user.email ? (
        <div className="dropdown">
          <button
            tabIndex={0}
            className="group btn btn-outline btn-primary border-text/20 rounded-full font-IranSans text-xs font-light"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              className="stroke-primary group-hover:stroke-primary-content"
            >
              <path
                d="M17.1399 20.62C16.2599 20.88 15.2199 21 13.9999 21H7.99986C6.77986 21 5.73986 20.88 4.85986 20.62C5.07986 18.02 7.74986 15.97 10.9999 15.97C14.2499 15.97 16.9199 18.02 17.1399 20.62Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 1H8C3 1 1 3 1 8V14C1 17.78 2.14 19.85 4.86 20.62C5.08 18.02 7.75 15.97 11 15.97C14.25 15.97 16.92 18.02 17.14 20.62C19.86 19.85 21 17.78 21 14V8C21 3 19 1 14 1ZM11 13.17C9.02 13.17 7.42 11.56 7.42 9.58002C7.42 7.60002 9.02 6 11 6C12.98 6 14.58 7.60002 14.58 9.58002C14.58 11.56 12.98 13.17 11 13.17Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5799 9.58002C14.5799 11.56 12.9799 13.17 10.9999 13.17C9.01992 13.17 7.41992 11.56 7.41992 9.58002C7.41992 7.60002 9.01992 6 10.9999 6C12.9799 6 14.5799 7.60002 14.5799 9.58002Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {user.email.split("@")[0]}
          </button>
          <ul tabIndex={0} className="dropdown-content w-52 rounded-xl z-[1] menu p-2 shadow bg-base-100 ">
            {menuList.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={item.path} className="stroke-primary">
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              );
            })}
            <li>
              <div className="stroke-error text-error">
                <LogoutIcon />
                خروج از حساب
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div className="dropdown">
          <button
            tabIndex={0}
            className="group btn btn-outline btn-primary border-text/20 rounded-full font-IranSans text-xs font-light"
          >
            <svg
              className="stroke-primary group-hover:stroke-primary-content"
              width="25"
              height="25"
              viewBox="0 0 32 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.158 9.63758C12.5532 5.04826 14.9116 3.17429 20.0745 3.17429H20.2403C25.9387 3.17429 28.2206 5.4562 28.2206 11.1546V19.4664C28.2206 25.1648 25.9387 27.4467 20.2403 27.4467H20.0745C14.9498 27.4467 12.5914 25.5982 12.1707 21.0854"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.36176 15.2977H19.7813"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.9385 11.0271L21.2091 15.2977L16.9385 19.5684"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            ورود | عضویت
          </button>
          <div tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-80">
            <div className="px-2 pb-4 flex justify-between items-center">
              <p className="text-2xl font-Lalezar">ورود</p>
              <label htmlFor="signin-modal" className="text-xs text-primary cursor-pointer">
                ساخت اکانت کاربری
              </label>
            </div>
            <hr />
            <form onSubmit={loginHandler} className="px-2 pt-4">
              <label htmlFor="signup-email" className="font-medium text-sm">
                ایمیل / شماره موبایل :
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                id="signup-email"
                dir="ltr"
                placeholder="example@gmail.com : مثال"
                className="my-4 block w-full rounded-full px-4 py-3 bg-secondary border border-black/20 border-solid focus:outline-primary focus:bg-background placeholder:text-right"
              />

              <label htmlFor="signup-password" className="font-medium text-sm">
                رمز عبور :
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="signup-password"
                dir="ltr"
                placeholder="رمز عبور"
                className="mt-4 mb-1 block w-full rounded-full px-4 py-3 bg-secondary border border-black/20 border-solid focus:outline-primary focus:bg-background placeholder:text-right"
              />
              <a href="#" className="text-xs text-primary">
                فراموشی رمز عبور
              </a>

              <button
                type="submit"
                className="btn btn-block border-none mt-4 bg-accent rounded-full hover:bg-accent-active"
              >
                ورود
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
