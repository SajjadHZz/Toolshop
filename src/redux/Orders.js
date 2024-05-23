import { discountCalculate } from "@/utils/calculates";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const addProductToUserFavorite = createAsyncThunk(
  "Favorite/addProductToUserFavorite",
  async ({ url, productId }) => {
    const set = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    if (set.status === 200) {
      const res = await fetch(url);
      return await res.json();
    }
  }
);

export const deleteProductFromUserFavorite = createAsyncThunk(
  "Favorite/deleteProductFromUserFavorite",
  async ({ url, productId }) => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    if (res.status === 200) {
      return await res.json();
    }
  }
);

export const getOrdersFromUser = createAsyncThunk("Orders/getOrdersFromUser", async (url) => {
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 200) {
    return await res.json();
  }
});

const slice = createSlice({
  name: "Orders",
  initialState: {
    current: {
      sumPrice: 0,
      list: [],
    },
    delivery: {
      sumPrice: 0,
      list: [],
    },
    return: {
      sumPrice: 0,
      list: [],
    },
    canceled: {
      sumPrice: 0,
      list: [],
    },
  },
  reducers: {
    addFavoriteToLocalStorage: (state, action) => {
      const isDuplicateProduct = state.some((item) => item._id === action.payload._id);
      if (!isDuplicateProduct) {
        state.push(action.payload);
        window.localStorage.setItem("favorites", JSON.stringify(state));
      }
    },
    deleteFavoriteInLocalStorage: (state, action) => {
      const newBasket = state.filter((item) => item._id !== action.payload);
      state = newBasket;
      window.localStorage.setItem("favorites", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToUserFavorite.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      })
      .addCase(getOrdersFromUser.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      })
      .addCase(deleteProductFromUserFavorite.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      });
  },
});

export const { addFavoriteToLocalStorage, deleteFavoriteInLocalStorage } = slice.actions;
export default slice.reducer;
