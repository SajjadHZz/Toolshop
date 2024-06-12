import { Righteous } from "next/font/google";
const righteous = Righteous({ subsets: ["latin"], weight: "400" });

import Link from "next/link";

import UserPanelNav from "@/components/templates/UserPanelNav/UserPanelNav";
import BasketButtonNav from "@/components/templates/BasketButtonNav/BasketButtonNav";
import SearchBoxNav from "@/components/templates/SearchBoxNav/SearchBoxNav";
import { ShoppingHelp } from "../Svgs/Svgs";

export default async function Navbar() {
  const res = await fetch(`${process.env.BASE_URL}/api/categories`, {
    next: { revalidate: 604800 /*1 Week */ },
  });
  const categories = await res.json();

  return (
    <>
      <nav className="sticky top-0 left-0 z-[2] px-2 sm:px-8 py-4 bg-background flex justify-between items-center border-b border-solid border-black/20">
        <div className="flex items-center gap-2 sm:gap-4">
          <UserPanelNav />
          <BasketButtonNav />
          <SearchBoxNav />
        </div>
        <Link href="/" className="flex items-center">
          <span className={`${righteous.className} text-primary text-lg sm:text-2xl `}>TOOLSHOP</span>
          <svg className="w-8 h-8 sm:w-12 sm:h-12" viewBox="0 0 213 213">
            <g className="fill-primary">
              <path d="M97 162.50 l0 -39.50 7.50 0 7.50 0 0 39.50 0 39.50 -7.50 0 -7.50 0 0 -39.50z" />
              <path d="M93.45 182.30 c-0.10 -0.15 -3.60 -0.30 -7.70 -0.35 -17.25 -0.25 -31.20 -2.15 -39.65 -5.35 -3.40 -1.30 -8.55 -5.35 -10.90 -8.60 -4.15 -5.65 -5.25 -9.60 -5.55 -20.10 -0.15 -4.35 -0.05 -7.90 0.15 -7.95 1.10 -0.05 12.15 -0.05 13.60 0 1.55 0.05 1.60 0.10 1.60 2.45 0 2.25 0.75 9.25 1.20 11.40 0.35 1.70 1.70 4.70 2.75 6 4.40 5.60 16.80 8.05 44.20 8.65 l2.40 0.05 -0.15 6.85 c-0.15 5.75 -0.30 6.90 -0.90 7.05 -0.45 0.05 -0.90 0.05 -1.05 -0.10z" />
              <path d="M113.50 175.40 l0 -6.90 1.40 -0.05 c0.75 -0.05 3.05 -0.15 5.10 -0.20 18.35 -0.70 27.40 -2.15 33.95 -5.50 3.55 -1.75 4.70 -2.80 6.70 -6.05 3.15 -5.10 3.85 -18.40 1.25 -24.20 -2.05 -4.45 -4.35 -6.40 -9.85 -8.25 -7.10 -2.30 -11.55 -2.60 -50.30 -3 -13.75 -0.15 -27.90 -0.40 -31.50 -0.55 -21.15 -0.90 -31.75 -5.20 -36.75 -14.80 -5.40 -10.35 -5.10 -30.25 0.55 -40.25 3 -5.25 8.90 -9.80 15.85 -12.20 7.85 -2.70 20.10 -4.60 33.85 -5.20 3.60 -0.15 7.70 -0.40 9.15 -0.50 l2.60 -0.15 0 6.95 0 6.95 -2.85 0.05 c-1.60 0.05 -3.70 0.10 -4.65 0.20 -0.95 0.05 -4.35 0.30 -7.55 0.45 -11.85 0.65 -21.20 2.65 -26.15 5.55 -3 1.75 -4.55 3.55 -6.35 7.45 -1.50 3.20 -1.65 3.90 -1.80 9.50 -0.40 15.90 5.25 21 24.60 22 2.75 0.15 16.35 0.40 30.25 0.55 35.25 0.35 43.50 0.70 52 2.05 10.35 1.70 19.20 6.90 22.55 13.25 3.10 5.85 4.10 11.15 4.05 21.20 -0.10 10.05 -2 17.95 -5.80 23.50 -6.95 10.25 -18.85 13.75 -49.40 14.65 l-10.90 0.35 0 -6.85z" />
              <path d="M103.40 105.65 l-6.40 -0.20 0 -33.70 0 -33.75 -21 0 -21 0 0 -7 0 -6.95 49.55 0.10 49.55 0.10 0 6.75 0 6.75 -21.05 0.15 -21.05 0.10 0 34 0 34 -1.10 -0.10 c-0.65 -0.05 -4 -0.20 -7.50 -0.25z" />
              <path d="M160.95 86.85 c-0.05 -0.05 -0.15 -1 -0.20 -2.10 -0.70 -8.15 -1.55 -11.20 -4 -14.50 -1.70 -2.15 -6.55 -4.75 -11.25 -5.95 -5.25 -1.35 -19.80 -2.75 -29.15 -2.80 l-2.90 0 0.15 -6.85 0.15 -6.80 7.75 0.05 c4.25 0.05 8.90 0.20 10.25 0.35 1.40 0.10 4.10 0.35 6 0.55 8.60 0.70 18.65 3.05 23.15 5.40 4.55 2.35 8.40 5.80 10.80 9.70 2.05 3.30 3.80 10.50 4.15 17.10 l0.30 5.75 -7.60 0.10 c-4.15 0.10 -7.55 0.10 -7.60 0z" />
            </g>
          </svg>
        </Link>
      </nav>
      <div className="flex justify-between items-center text-sm px-4 sm:px-8 w-full bg-background border-b border-solid border-black/20">
        <div className="lg:flex items-center gap-2 hidden">
          {categories?.map((item) => {
            return (
              <div key={"menu_categories_" + item._id} role="listitem" className="dropdown dropdown-hover">
                <div tabIndex={0} className="group py-4 cursor-pointer">
                  <Link
                    href={`/products?category=${item.name}`}
                    className="px-2 align-middle transition-colors group-hover:text-accent text-xs lg:text-sm"
                  >
                    {item.name}
                  </Link>
                  <svg
                    className="inline-block stroke-primary align-middle transition-transform group-hover:rotate-180 w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.92 8.95001L13.4 15.47C12.63 16.24 11.37 16.24 10.6 15.47L4.08002 8.95001"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {item.subs.map((sub, index) => {
                    return (
                      <li key={item._id + index}>
                        <Link href={`/products?category=${sub}`}>{sub}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div htmlFor="category-nav-drawer" className="drawer inline-block lg:hidden">
          <input id="category-nav-drawer" type="checkbox" className="drawer-toggle" hidden />
          <label
            htmlFor="category-nav-drawer"
            className="drawer-content swap btn btn-outline btn-circle border-none swap-rotate "
          >
            <svg className="fill-current" width="20" height="20" viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>

          <div className="drawer-side z-10">
            <label
              htmlFor="category-nav-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <div className="flex flex-col w-80 max-h-full h-full overflow-auto bg-background">
              <div className="px-4 py-2 flex justify-between items-center">
                <h4 className="text-2xl font-bold font-Lalezar">دسته‌بندی محصولات</h4>
                <label
                  htmlFor="category-nav-drawer"
                  aria-label="close sidebar"
                  className="btn btn-ghost btn-circle"
                >
                  ✕
                </label>
              </div>
              <hr />
              <div className="join join-vertical w-full">
                {categories.map((item) => {
                  return (
                    <div key={"drawer_categories_" + item._id} className="collapse collapse-arrow join-item">
                      <input type="radio" name="category-accordion" />
                      <h4 className="collapse-title">{item.name}</h4>
                      <ul className="collapse-content">
                        {item.subs.map((sub, index) => {
                          return (
                            <li key={"subs_categories_menu_" + index + sub}>
                              <Link
                                href={`/products?category=${sub}`}
                                className="border-r-2 border-solid border-black/20 px-4 py-1 flex justify-between items-center cursor-pointer transition-colors hover:text-accent"
                              >
                                {sub}
                                {/* <span className="text-xs badge border-primary">5</span> */}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Link href="/frequently-questions" className="min-w-fit">
          <span className="align-middle text-xs lg:text-sm">راهنمای خرید</span>
          <ShoppingHelp />
        </Link>
      </div>
    </>
  );
}
