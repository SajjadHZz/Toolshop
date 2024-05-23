import Link from "next/link";
import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import {
  DashboardIcon,
  LogoutIcon,
  ShoppingCard,
  TaskIcon,
  TicketMessage,
  UserSquare,
} from "@/components/modules/Svgs/Svgs";
import { redirect } from "next/navigation";

const sidebarList = [
  { id: 1, title: "داشبورد", icon: <DashboardIcon size="22" />, path: "/my-account" },
  { id: 2, title: "سفارش ها", icon: <ShoppingCard size="22" />, path: "/my-account/orders" },
  { id: 3, title: "علاقه‌مندی ها", icon: <TaskIcon size="22" />, path: "/my-account/favorites" },
  // { id: 4, title: "تیکت پشتیبانی", icon: <TicketMessage size="22" />, path: "/my-account/tickets" },
  { id: 5, title: "جزئیات حساب", icon: <UserSquare size="22" />, path: "/my-account/settings" },
];

const breadcrumbPath = [{ title: "خانه", href: "/" }, { title: "داشبورد" }];

export default async function PanelLayout({ children }) {
  // const res = await fetch("http://localhost:3000/api/auth/me", { cache: "no-store" });
  // console.log(res);
  // if (res.status !== 200) {
  //   redirect("/");
  // }

  return (
    <>
      <div className="mx-10 my-4">
        <Breadcrumbs path={breadcrumbPath} />
      </div>

      <div className="flex gap-8 mx-8 my-4 ">
        {/* Sidebar Menu */}
        <div className="bg-background w-1/3 h-fit max-w-[350px]">
          <div className="flex gap-4 items-center bg-accent/60 p-4">
            <div className="w-20 h-20 rounded-full bg-gray-400 p-4 border-2 border-solid border-gray-300">
              <svg
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full fill-secondary"
              >
                <path d="M8.00003 0C5.38003 0 3.25003 2.13 3.25003 4.75C3.25003 7.32 5.26003 9.4 7.88003 9.49C7.96003 9.48 8.04003 9.48 8.10003 9.49C8.12003 9.49 8.13003 9.49 8.15003 9.49C8.16003 9.49 8.16003 9.49 8.17003 9.49C10.73 9.4 12.74 7.32 12.75 4.75C12.75 2.13 10.62 0 8.00003 0Z" />
                <path d="M13.08 12.15C10.29 10.29 5.74002 10.29 2.93002 12.15C1.66002 13 0.960022 14.15 0.960022 15.38C0.960022 16.61 1.66002 17.75 2.92002 18.59C4.32002 19.53 6.16002 20 8.00002 20C9.84002 20 11.68 19.53 13.08 18.59C14.34 17.74 15.04 16.6 15.04 15.36C15.03 14.13 14.34 12.99 13.08 12.15Z" />
              </svg>
            </div>

            <div>
              <h4 className="font-bold leading-loose text-lg">sajjad</h4>
              <p className="text-xs text-text/60">sahoza4@gmail.com</p>
            </div>
          </div>
          <ul className="pt-4">
            {sidebarList.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={item.path}>
                    <input
                      className="peer"
                      type="radio"
                      name="aside-list-account"
                      id={`aside-list-account-${item.id}`}
                      hidden
                    />
                    <label
                      htmlFor={`aside-list-account-${item.id}`}
                      className="p-4 flex gap-2 items-center stroke-primary cursor-pointer hover:bg-gradient-to-l hover:from-gray-100 hover:to-transparent hover:stroke-accent-active peer-checked:bg-gradient-to-l peer-checked:from-gray-100 peer-checked:to-transparent peer-checked:stroke-accent-active"
                    >
                      {item.icon}
                      {item.title}
                    </label>
                  </Link>
                </li>
              );
            })}

            <form
              method="post"
              action="http://localhost:3000/api/auth/signout"
              target="_blank"
              className="w-full block"
            >
              <button
                type="submit"
                className="w-full p-4 flex gap-2 items-center text-red-500 stroke-red-600 cursor-pointer hover:bg-gradient-to-l hover:from-red-100 hover:to-transparent"
              >
                <LogoutIcon />
                خروج از حساب
              </button>
            </form>
          </ul>
        </div>

        {/* Main Content */}
        {children}
      </div>
    </>
  );
}
