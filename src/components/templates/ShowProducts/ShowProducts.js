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

  useEffect(() => {
    if (search.get("category")) {
      dispatch(
        getProductsFromServer(`http://localhost:3000/api/products?category=${search.get("category")}`)
      );
    } else if (search.get("brand")) {
      dispatch(getProductsFromServer(`http://localhost:3000/api/products?brand=${search.get("brand")}`));
    } else {
      dispatch(getProductsFromServer(`http://localhost:3000/api/products`));
    }
  }, [search]);

  function sortProductsHandler(sort) {
    return () => {
      dispatch(sortProducts(sort));
    };
  }

  return (
    <>
      <ul className="p-4 bg-background rounded-3xl flex items-center gap-2">
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
            defaultChecked
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

      <ul className="grid grid-cols-4 gap-4 py-2 mb-4">
        {products.length ? (
          products.map((product) => (
            <li
              key={product._id}
              className="relative min-w-[200px] h-full border border-solid border-black/20 rounded-xl overflow-hidden bg-white shadow"
            >
              <ProductCard {...product} />
            </li>
          ))
        ) : (
          <li className="text-3xl text-center w-full block">محصولی وجود ندارد</li>
        )}
      </ul>
    </>
  );
}
