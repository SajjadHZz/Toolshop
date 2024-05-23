import Breadcrumbs from "@/components/modules/Breadcrumbs/Breadcrumbs";
import React from "react";

const sidebarList = [
  { id: 1, title: "داشبورد", icon: <DashboardIcon /> },
  { id: 2, title: "سفارش ها", icon: <ShoppingCard /> },
  { id: 3, title: "لیست ها", icon: <TaskIcon /> },
  { id: 4, title: "تیکت پشتیبانی", icon: <TicketMessage /> },
  { id: 5, title: "جزئیات حساب", icon: <UserSquare /> },
  { id: 6, title: "افزودن محصولات", icon: <UserSquare /> },
];

export default function AdminLayout({ children }) {
  const breadcrumbPath = [{ title: "خانه", href: "/" }, { title: "داشبورد" }];
  return (
    <>
      <div className="mx-10 my-4">
        <Breadcrumbs path={breadcrumbPath} />
      </div>

      <div className="flex gap-8 mx-8 my-4 ">
        {/* Sidebar Menu */}
        <div className="bg-background w-1/3 max-w-[350px]">
          <div className="flex gap-4 items-center bg-accent/60 p-4">
            <div className="w-20 h-20 rounded-full bg-gray-400 p-4 border-2 border-solid border-gray-300">
              <svg
                // width="16"
                // height="20"
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
          <ul className="py-4">
            {sidebarList.map((item) => {
              return (
                <li key={item.id}>
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

////////////// SVG Icons //////////////
function UserSquare() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.14 20.62C16.26 20.88 15.22 21 14 21H8C6.78 21 5.74 20.88 4.86 20.62C5.08 18.02 7.75 15.97 11 15.97C14.25 15.97 16.92 18.02 17.14 20.62Z"
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
        d="M14.58 9.58002C14.58 11.56 12.98 13.17 11 13.17C9.02 13.17 7.42 11.56 7.42 9.58002C7.42 7.60002 9.02 6 11 6C12.98 6 14.58 7.60002 14.58 9.58002Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function DashboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 9.9V3.1C21 1.6 20.36 1 18.77 1H14.73C13.14 1 12.5 1.6 12.5 3.1V9.9C12.5 11.4 13.14 12 14.73 12H18.77C20.36 12 21 11.4 21 9.9Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 18.9V17.1C21 15.6 20.36 15 18.77 15H14.73C13.14 15 12.5 15.6 12.5 17.1V18.9C12.5 20.4 13.14 21 14.73 21H18.77C20.36 21 21 20.4 21 18.9Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.1V18.9C9.5 20.4 8.86 21 7.27 21H3.23C1.64 21 1 20.4 1 18.9V12.1C1 10.6 1.64 10 3.23 10H7.27C8.86 10 9.5 10.6 9.5 12.1Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 3.1V4.9C9.5 6.4 8.86 7 7.27 7H3.23C1.64 7 1 6.4 1 4.9V3.1C1 1.6 1.64 1 3.23 1H7.27C8.86 1 9.5 1.6 9.5 3.1Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ShoppingCard() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1H2.74001C3.82001 1 4.67 1.93 4.58 3L3.75 12.96C3.61 14.59 4.89999 15.99 6.53999 15.99H17.19C18.63 15.99 19.89 14.81 20 13.38L20.54 5.88C20.66 4.22 19.4 2.87 17.73 2.87H4.82001"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.25 21C15.9404 21 16.5 20.4404 16.5 19.75C16.5 19.0596 15.9404 18.5 15.25 18.5C14.5596 18.5 14 19.0596 14 19.75C14 20.4404 14.5596 21 15.25 21Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.25 21C7.94036 21 8.5 20.4404 8.5 19.75C8.5 19.0596 7.94036 18.5 7.25 18.5C6.55964 18.5 6 19.0596 6 19.75C6 20.4404 6.55964 21 7.25 21Z"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7H20"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function TaskIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17.5H19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 10.5H19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3.5H19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 3.5L2 4.5L5 1.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 10.5L2 11.5L5 8.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 17.5L2 18.5L5 15.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TicketMessage() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 1H7C3 1 1 3 1 7V20C1 20.55 1.45 21 2 21H15C19 21 21 19 21 15V7C21 3 19 1 15 1Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 8.5H16"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 13.5H13"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.9 6.55999C8.21 2.95999 10.06 1.48999 14.11 1.48999H14.24C18.71 1.48999 20.5 3.27999 20.5 7.74999V14.27C20.5 18.74 18.71 20.53 14.24 20.53H14.11C10.09 20.53 8.24 19.08 7.91 15.54"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 11H2.62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M4.85 7.64999L1.5 11L4.85 14.35"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
