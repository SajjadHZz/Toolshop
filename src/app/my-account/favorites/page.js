"use client";

import FavoriteBox from "@/components/modules/FavoriteBox/FavoriteBox";
import { HeartFillIcon } from "@/components/modules/Svgs/Svgs";
import { getProductFromUserFavorite } from "@/redux/Favorite";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Favorites() {
  const [isLoading, setIsLoading] = useState(true);
  const favorites = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductFromUserFavorite("/api/favorite"));
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [favorites]);

  return (
    <div className="bg-background flex-1 w-2/3 relative rounded-3xl">
      <h3 className="text-3xl lg:text-4xl font-Lalezar m-4 flex gap-4 items-center">
        <HeartFillIcon size="30" color="primary" />
        لیست علاقه‌مندی ها
      </h3>
      <hr />
      <div className="p-2 min-h-60">
        {isLoading ? (
          <div className="flex gap-4 items-center border border-solid border-text/5 p-2 rounded-xl mb-2 animate-pulse">
            <div className="relative group animate-pulse">
              <div className="w-40 h-40 bg-gray-200 mask mask-squircle"></div>
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-2"></div>
            </div>
            <div className="w-full">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="flex gap-4">
                <div className="flex-1 flex justify-center items-center border border-solid border-text/20 my-4 bg-background rounded-xl py-2">
                  <div className="px-4 w-1/2">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded my-1"></div>
                  </div>
                  <div className="px-4 w-1/2 min-w-fit">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded my-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : favorites.length ? (
          favorites.map((item) => (
            <FavoriteBox
              key={item._id}
              _id={item._id}
              img={item.img}
              name={item.name}
              discount={item.discount}
              price={item.price}
              wholesale={item.wholesale}
              attributes={item.attributes}
            />
          ))
        ) : (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-nowrap">
            هیچ محصولی یافت نشد !
          </p>
        )}
      </div>
    </div>
  );
}
