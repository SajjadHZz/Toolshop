import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bestSellingProducts,
  cheapestProducts,
  expensiveProducts,
  latestProducts,
  oldestProducts,
} from "@/utils/sort";

const filterList = [];

export const addProductsToServer = createAsyncThunk("Products/addProductsToServer", async ({ url, body }) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then(() => body);
});

export const getProductsFromServer = createAsyncThunk("Products/getProductsFromServer", async (url) => {
  const res = await fetch(url);
  if (res.status === 200) {
    return res.json();
  }
});

const slice = createSlice({
  name: "Products",
  initialState: [],
  reducers: {
    filterProducts: (state, action) => {
      return filterList.filter((item) => item.price < action.payload);
    },
    sortProducts: (state, action) => {
      switch (action.payload) {
        case latestProducts:
          return state.sort(
            (firstProduct, secondeProduct) =>
              new Date(firstProduct.updatedAt).getTime() - new Date(secondeProduct.updatedAt).getTime()
          );
        case oldestProducts:
          return state.sort(
            (firstProduct, secondeProduct) =>
              new Date(secondeProduct.updatedAt).getTime() - new Date(firstProduct.updatedAt).getTime()
          );

        case bestSellingProducts:
          return state.sort((firstProduct, secondeProduct) => secondeProduct.sales - firstProduct.sales);
        case cheapestProducts:
          return state.sort((firstProduct, secondeProduct) => firstProduct.price - secondeProduct.price);
        case expensiveProducts:
          return state.sort((firstProduct, secondeProduct) => secondeProduct.price - firstProduct.price);
        default:
          return state;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsFromServer.fulfilled, (state, action) => {
        if (action.payload) {
          filterList.push(...action.payload);
          return action.payload;
        }
      })
      .addCase(addProductsToServer.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const { filterProducts, sortProducts } = slice.actions;
export default slice.reducer;
