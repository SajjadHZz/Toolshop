import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "@/redux/Basket";
import productsReducer from "@/redux/Products";
import userReducer from "@/redux/User";
import quicklyReducer from "./QuicklyAccess";
import favoriteReducer from "./Favorite";
import ordersReducer from "./Orders";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    products: productsReducer,
    user: userReducer,
    quickly: quicklyReducer,
    favorite: favoriteReducer,
    orders: ordersReducer,
  },
});
