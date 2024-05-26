import { CloseCircleIcon, TickCircleIcon } from "@/components/modules/Svgs/Svgs";
import { ToastAlert } from "@/utils/sort";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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
      toast.custom((t) => (
        <ToastAlert
          title="محصول با موفقیت به علاقه‌مندی ها اضافه شد"
          status="success"
          icon={<TickCircleIcon size="20" color="white" />}
        />
      ));
      const res = await fetch(url);
      return await res.json();
    } else if (set.status === 300) {
      toast.custom((t) => (
        <ToastAlert
          title="این محصول از قبل در علاقه‌مندی ها ثبت شده"
          status="error"
          icon={<CloseCircleIcon size="20" color="white" />}
        />
      ));
    } else if (set.status === 500) {
      toast.custom((t) => (
        <ToastAlert
          title="سرور با مشکل مواجه شده. لطفا بعدا تلاش کنید"
          status="error"
          icon={<CloseCircleIcon size="20" color="white" />}
        />
      ));
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
      toast.custom((t) => (
        <ToastAlert
          title="محصول با موفقیت حذف شد"
          status="success"
          icon={<TickCircleIcon size="20" color="white" />}
        />
      ));
      return await res.json();
    } else {
      toast.custom((t) => (
        <ToastAlert
          title="سرور با مشکل مواجه شده. لطفا بعدا تلاش کنید"
          status="error"
          icon={<CloseCircleIcon size="20" color="white" />}
        />
      ));
    }
  }
);

export const getProductFromUserFavorite = createAsyncThunk(
  "Favorite/getProductFromUserFavorite",
  async (url) => {
    const res = await fetch(url, { cache: "no-store" });
    if (res.status === 200) {
      return await res.json();
    } else {
      const favorites = window.localStorage.getItem("favorites");
      if (favorites) {
        return JSON.parse(favorites);
      } else {
        window.localStorage.setItem("favorites", JSON.stringify([]));
      }
    }
  }
);

const slice = createSlice({
  name: "Favorite",
  initialState: [],
  reducers: {
    addFavoriteToLocalStorage: (state, action) => {
      const isDuplicateProduct = state.some((item) => item._id === action.payload._id);
      if (!isDuplicateProduct) {
        state.push(action.payload);
        toast.custom((t) => (
          <ToastAlert
            title="محصول با موفقیت به علاقه‌مندی ها اضافه شد"
            status="success"
            icon={<TickCircleIcon size="20" color="white" />}
          />
        ));
        window.localStorage.setItem("favorites", JSON.stringify(state));
      } else {
        toast.custom((t) => (
          <ToastAlert
            title="این محصول از قبل در علاقه‌مندی ها ثبت شده"
            status="error"
            icon={<CloseCircleIcon size="20" color="white" />}
          />
        ));
      }
    },
    deleteFavoriteInLocalStorage: (state, action) => {
      const newBasket = state.filter((item) => item._id !== action.payload);
      state = newBasket;
      toast.custom((t) => (
        <ToastAlert
          title="محصول با موفقیت از علاقه‌مندی ها حذف شد"
          status="success"
          icon={<TickCircleIcon size="20" color="white" />}
        />
      ));
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
      .addCase(getProductFromUserFavorite.fulfilled, (state, action) => {
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
