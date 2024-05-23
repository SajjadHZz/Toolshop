"use client";
import { filterProducts, getProductsFromServer } from "@/redux/Products";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductsPriceFilter() {
  const minimumPrice = 1_000_000,
    stepPrice = 1_000_000,
    maximumPrice = 100_000_000;

  const dispatch = useDispatch();

  const [priceRenge, setPriceRenge] = useState(maximumPrice);
  function filterPriceHandler() {
    dispatch(filterProducts(priceRenge));
  }
  return (
    <div className="bg-background rounded-3xl p-4 mb-4">
      <h4 className="text-2xl font-bold mb-4">فیلتر براساس قیمت</h4>
      <hr />
      <div className="my-4">
        <input
          type="range"
          min={minimumPrice}
          value={priceRenge}
          max={maximumPrice}
          className="range range-xs [--range-shdw:#1352A2]"
          dir="ltr"
          step={stepPrice}
          onChange={(e) => setPriceRenge(e.target.value)}
        />
      </div>
      <div className="flex items-center mb-4">
        <span className="text-xs font-bold w-fit">فیلتر قیمت از 1.000 تومان تا</span>
        <input
          min={minimumPrice}
          value={priceRenge}
          max={maximumPrice}
          type="number"
          step={stepPrice}
          onChange={(e) => setPriceRenge(e.target.value)}
          className="inline-block w-32 mr-4 bg-secondary px-2 py-1 rounded-xl"
        />
      </div>
      <button onClick={filterPriceHandler} type="button" className="btn btn-block btn-accent">
        فیلتر
      </button>
    </div>
  );
}
