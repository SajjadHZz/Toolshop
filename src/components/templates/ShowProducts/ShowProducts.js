"use client";
import ProductCard from "@/components/modules/ProductCard/ProductCard";
import { getProductsFromServer, sortProducts } from "@/redux/Products";
import {
  bestSellingProducts,
  cheapestProducts,
  expensiveProducts,
  latestProducts,
  oldestProducts,
} from "@/utils/sort";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ShowProducts() {
  const search = useSearchParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [pagination, setPagination] = useState(1);
  const paginationSize = 8;

  useEffect(() => {
    if (search.get("category")) {
      dispatch(getProductsFromServer(`/api/products?category=${search.get("category")}`));
    } else if (search.get("brand")) {
      dispatch(getProductsFromServer(`/api/products?brand=${search.get("brand")}`));
    } else {
      dispatch(getProductsFromServer(`/api/products`));
    }
  }, [search]);

  function sortProductsHandler(sort) {
    return () => {
      dispatch(sortProducts(sort));
    };
  }

  return (
    <>
      <ul className="p-4 bg-background rounded-3xl flex items-center gap-2 overflow-auto text-nowrap [&::-webkit-scrollbar]:hidden">
        <li>
          <h4 className="font-bold mx-2">مرتب سازی براساس :</h4>
        </li>
        <li>
          <input
            className="peer"
            type="radio"
            name="sort-products"
            id="sort-products-latest"
            onChange={sortProductsHandler(latestProducts)}
            hidden
          />
          <label
            className="p-2 rounded inline-block cursor-pointer transition-colors peer-checked:text-accent peer-checked:bg-accent/10"
            htmlFor="sort-products-latest"
          >
            جدیدترین
          </label>
        </li>
        <li>
          <input
            className="peer"
            type="radio"
            name="sort-products"
            id="sort-products-bestselling"
            onChange={sortProductsHandler(bestSellingProducts)}
            hidden
          />
          <label
            className="p-2 rounded inline-block cursor-pointer transition-colors peer-checked:text-accent peer-checked:bg-accent/10"
            htmlFor="sort-products-bestselling"
          >
            پرفروش ترین
          </label>
        </li>
        <li>
          <input
            className="peer"
            type="radio"
            name="sort-products"
            id="sort-products-cheapest"
            onChange={sortProductsHandler(cheapestProducts)}
            hidden
          />
          <label
            className="p-2 rounded inline-block cursor-pointer transition-colors peer-checked:text-accent peer-checked:bg-accent/10"
            htmlFor="sort-products-cheapest"
          >
            ارزان ترین
          </label>
        </li>
        <li>
          <input
            className="peer"
            type="radio"
            name="sort-products"
            id="sort-products-expensive"
            onChange={sortProductsHandler(expensiveProducts)}
            hidden
          />
          <label
            className="p-2 rounded inline-block cursor-pointer transition-colors peer-checked:text-accent peer-checked:bg-accent/10"
            htmlFor="sort-products-expensive"
          >
            گران ترین
          </label>
        </li>
        <li>
          <input
            className="peer"
            type="radio"
            name="sort-products"
            id="sort-products-populare"
            onChange={sortProductsHandler(oldestProducts)}
            defaultChecked
            hidden
          />
          <label
            className="p-2 rounded inline-block cursor-pointer transition-colors peer-checked:text-accent peer-checked:bg-accent/10"
            htmlFor="sort-products-populare"
          >
            قدیمی ترین
          </label>
        </li>
      </ul>

      <ul className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4 py-2 mb-4">
        {products.length ? (
          products.slice((pagination - 1) * paginationSize, pagination * paginationSize).map((product) => (
            <li
              key={product._id}
              className="relative min-w-[200px] h-full border border-solid border-black/20 rounded-xl overflow-hidden bg-white shadow"
            >
              <ProductCard {...product} />
            </li>
          ))
        ) : (
          <li className="w-full h-80 col-span-4 flex justify-center items-center relative">
            <svg
              className="fill-primary/80 absolute top-0 -z-[1]"
              viewBox="0 0 345 345"
              width="345"
              height="345"
            >
              <path d="m227 248.9c4.5-0.8 10 0.6 13.8 2.7 5.8 3.2 10 9 11.6 15 1.8 7.1-0.1 14-4.1 20.1-3.5 5.3-9.3 7.7-15.6 9.2-5.9 0.8-11.8-0.7-16.7-3.9-5.5-3.6-8.8-9.6-9.9-15.7-1.2-6.4 0.8-13.7 4.8-18.9 3.9-5 9.7-7.5 16.1-8.5z" />
              <path d="m165.4 248.9c4.7-0.7 9.9 0.5 14 2.7 5.7 3.1 9.7 8.7 11.3 14.4 1.8 6.5 0.7 13.8-3 19.5-3.8 5.8-9.5 8.7-16.4 10.3-5.5 0.9-11.3-0.3-16-3.3-5.4-3.4-9.5-9.3-10.6-15.3-1.4-6.8 0.2-13.8 4.5-19.4 3.9-5.1 9.7-7.8 16.2-8.9z" />
              <path d="m45.6 85.9c4.2-0.1 8.6 0.9 12.6 1.7 5.5 1.1 10.9 2.2 16.4 3.3 6.1 1.2 13.3 1.5 18.8 4.3 2.8 3.7 3.4 8.8 4.6 13.2q2 7.4 4 14.8c3-0.3 6.3-0.1 9.3-0.1q8.9 0 17.7 0l5 13.7-28.1 0.3c1.8 5.6 3 11.5 4.7 17.1 4.4 14.9 9.2 29.6 13.7 44.3 1.2 3.9 2.4 7.7 3.5 11.6 1 3.6 1.8 7.4 3.4 10.8 0.9 1.9 2.3 3.1 4 4.4 9.2 0.5 18.6 0.1 27.8 0.1 17.3 0 34.6 0 51.9 0 6.6 0.1 13.2 0 19.8 0.1q7.8 0.2 15.7 0.2c3.5 0 7.1 0.1 10.6-0.4 1.5-0.2 3.1-1.4 4-2.5 0.7-1 1.2-2.2 1.6-3.4 1.5-4.2 2.5-8.6 3.8-12.9 4.8-15.5 9.5-31.1 14.3-46.6 1-3.3 6.9-20.8 6.5-23l-28.4-0.1 0.4-0.3c0.7-0.7 4.6-12.1 4.6-13.4 3.4-0.3 7-0.1 10.4-0.1 5.9 0 13.4-0.9 18.7 1.6 3.6 1.7 6.1 4.4 7.3 8 1 3 1 6.7 0.3 9.9-0.8 3.8-2.2 7.6-3.4 11.3-1.7 5.2-3.4 10.5-4.9 15.8-3.8 12.4-7.6 24.7-11.3 37.1-2.2 7.3-3.6 15.7-7.5 22.4-2.7 4.6-7.3 8.2-12.8 9.6-3.7 0.9-7.9 0.6-11.7 0.5-4.6 0-9.1 0-13.7 0q-24.4 0-48.8 0c-11.9 0-23.9 0.1-35.8 0.1-6.1 0-12.5 0.3-18.6-0.1-2.8-0.1-5.6-1-8-2.3-3.7-1.9-6.9-5.1-8.7-8.6-2.3-4.6-3.2-9.7-4.7-14.5-2.3-8.1-4.8-16.2-7.1-24.3-4.5-15.6-9.3-31.1-13.8-46.7-3.6-12.1-6.8-24.3-10.6-36.4l-30.3-5.4c-3.5-0.6-8.7-1.2-10.8-4.1-1.1-1.5-1.8-3.4-1.4-5.2 0.7-2.7 2.6-4.4 5-5.8z" />
              <path
                fillRule="evenodd"
                d="m193 48.3c13.6-1 26.3 1.9 37.5 9 13.7 8.7 22.5 23 25.6 37.9 3.5 17.2-1.3 33.6-11.9 47.9-9.4 12.7-24 18.8-39.8 21.5l-0.4 0.1c-13 1.5-28.1-2.4-38.5-10-13.9-10.1-22.8-24.4-24.9-40.9-2-16.3 2.7-33 13.8-45.8 9.5-11 23.6-18.2 38.6-19.7zm2.5 12.8c-13.7 2-24.5 7-32.7 17.5-8 10.2-10.9 23.1-8.7 35.5 1.2 7 4.4 13 8.1 19.2l11.1-11 52.4-52.3c-8.8-5.8-19.1-10-30.2-8.9zm39.4 18.4c-2.5 2.9-5.3 5.4-7.9 8.1-7.8 8-15.8 15.8-23.7 23.7-7.8 7.9-15.6 15.9-23.5 23.6-2.8 2.7-5.1 5.6-8.2 8 3.8 2.5 7.5 4.9 11.9 6.3 11.4 3.3 23.4 3.7 34.2-1.6 11.8-5.7 20-15.2 23.9-26.9 4.3-12.8 2.4-26.3-4.3-38-0.6-1-1.4-2.5-2.4-3.2z"
              />
            </svg>
            <p className="text-4xl font-bold text-primary text-border-white">درحال حاضر محصولی وجود ندارد</p>
          </li>
        )}
      </ul>
      {!!products.length && (
        <div className="text-center" dir="ltr">
          {Array.from(Array(Math.ceil(products.length / paginationSize)).keys()).map((item) => {
            return (
              <button
                key={item}
                onClick={() => setPagination(item + 1)}
                className={pagination === item + 1 ? "btn btn-primary ms-1" : "btn btn-ghost ms-1"}
              >
                {(item + 1).toLocaleString("fa-ir")}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
