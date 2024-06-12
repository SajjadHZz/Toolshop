"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchBoxNav({ modal = false }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [focus, setFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    search.length > 2 ? searchProduct() : setProducts([]);
  }, [search]);

  async function searchProduct() {
    setIsLoading(true);
    const res = await fetch(`/api/search?name=${search}`, { cache: "no-store" });
    if (res.status === 200) {
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="relative z-[1] group hidden lg:block">
        <ul className="absolute top-[90%] left-0 w-full bg-secondary shadow-xl rounded-b-xl overflow-hidden">
          {focus && search.length > 2 ? (
            isLoading ? (
              <div className="w-full flex justify-center items-center h-16">
                <span className="loading loading-dots loading-md"></span>
              </div>
            ) : products.length ? (
              products.map((item) => {
                return (
                  <li key={item._id}>
                    <Link
                      onClick={() => setSearch("")}
                      href={`/products/${item.name}`}
                      className="flex items-center gap-2 p-2 hover:bg-primary hover:text-white"
                    >
                      <div className="w-14 mask mask-squircle">
                        <img src={item.img[0]} />
                      </div>
                      <div className="text-xs leading-loose">
                        <p>{item.name}</p>
                        <p>{item.price.toLocaleString("fa-ir")} تومان</p>
                      </div>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="w-full text-center py-2 mt-2">هیچ محصولی پیدا نشد !</li>
            )
          ) : (
            ""
          )}
        </ul>
        <div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onFocus={() => setFocus(true)}
            onBlur={() => {
              if (!products.length) {
                setFocus(false);
              }
            }}
            type="search"
            placeholder="جستجو ..."
            autoComplete="off"
            id="search-navbar-input"
            className="relative text-sm w-96 px-4 py-3 bg-secondary border border-solid border-black/20 rounded-lg outline-none placeholder:text-xs focus:bg-background focus:border-primary transition-colors"
          />
          <svg
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-accent rounded-full p-2 overflow-visible cursor-pointer transition-colors hover:bg-accent-active"
            width="35"
            height="35"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0856 25.678C20.4221 25.678 25.5589 20.5412 25.5589 14.2047C25.5589 7.86813 20.4221 2.73135 14.0856 2.73135C7.74902 2.73135 2.61225 7.86813 2.61225 14.2047C2.61225 20.5412 7.74902 25.678 14.0856 25.678Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.1947 26.5574C24.8704 28.5971 26.4129 28.801 27.5985 27.0163C28.6821 25.3845 27.9682 24.046 26.005 24.046C24.5517 24.0332 23.7358 25.1678 24.1947 26.5574Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {!modal && (
        <label
          htmlFor="search-navbar-modal"
          className="lg:hidden btn btn-primary btn-outline btn-circle cursor-pointer group border-text/20 border-solid border"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 31 31"
            fill="none"
            className="group-hover:stroke-primary-content stroke-primary"
          >
            <path
              d="M14.0856 25.678C20.4221 25.678 25.5589 20.5412 25.5589 14.2047C25.5589 7.86813 20.4221 2.73135 14.0856 2.73135C7.74902 2.73135 2.61225 7.86813 2.61225 14.2047C2.61225 20.5412 7.74902 25.678 14.0856 25.678Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24.1947 26.5574C24.8704 28.5971 26.4129 28.801 27.5985 27.0163C28.6821 25.3845 27.9682 24.046 26.005 24.046C24.5517 24.0332 23.7358 25.1678 24.1947 26.5574Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
      )}
      {modal && (
        <>
          <ul className="absolute top-[90%] left-0 w-full bg-secondary shadow-xl rounded-b-xl overflow-hidden">
            {focus && search.length > 2 ? (
              isLoading ? (
                <div className="w-full flex justify-center items-center h-16">
                  <span className="loading loading-dots loading-md"></span>
                </div>
              ) : products.length ? (
                products.map((item) => {
                  return (
                    <li key={"search_prodcuts_" + item._id}>
                      <Link
                        onClick={() => setSearch("")}
                        href={`/products/${item.name}`}
                        className="flex items-center gap-2 p-2 hover:bg-primary hover:text-white"
                      >
                        <div className="w-14 mask mask-squircle">
                          <img src={item.img[0]} />
                        </div>
                        <div className="text-xs leading-loose">
                          <p>{item.name}</p>
                          <p>{item.price.toLocaleString("fa-ir")} تومان</p>
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li className="w-full text-center py-2 mt-2">هیچ محصولی پیدا نشد !</li>
              )
            ) : (
              ""
            )}
          </ul>
          <div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                if (!products.length) {
                  setFocus(false);
                }
              }}
              type="search"
              placeholder="جستجو ..."
              autoComplete="off"
              id="search-navbar-input"
              className="relative text-sm w-full px-4 py-3 bg-secondary border border-solid border-black/20 rounded-lg outline-none placeholder:text-xs focus:bg-background focus:border-primary transition-colors"
            />
          </div>
        </>
      )}
    </>
  );
}
