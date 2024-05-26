// import { discountCalculate } from "@/utils/calculates";
import { CloseCircleIcon, TickCircleIcon } from "@/components/modules/Svgs/Svgs";
import { ToastAlert } from "@/utils/sort";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const addProductToUserOrders = createAsyncThunk(
  "Orders/addProductToUserOrders",
  async ({ url, sumPrice, list }) => {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sumPrice, list }),
    });
    if (res.status === 200) {
      toast.custom((t) => (
        <ToastAlert
          title="سفارش شما با موفقیت ثبت شد"
          status="success"
          icon={<TickCircleIcon size="20" color="white" />}
        />
      ));
      const set = await fetch(url);
      return await set.json();
    } else if (res.status === 500) {
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

// export const deleteProductFromUserFavorite = createAsyncThunk(
//   "Orders/deleteProductFromUserFavorite",
//   async ({ url, productId }) => {
//     const res = await fetch(url, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ productId }),
//     });
//     if (res.status === 200) {
//       return await res.json();
//     }
//   }
// );

export const getOrdersFromUser = createAsyncThunk("Orders/getOrdersFromUser", async (url) => {
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 200) {
    return await res.json();
  } else {
    return {
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
      loading: false,
    };
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
    loading: true,
  },
  reducers: {
    // addFavoriteToLocalStorage: (state, action) => {
    //   const isDuplicateProduct = state.some((item) => item._id === action.payload._id);
    //   if (!isDuplicateProduct) {
    //     state.push(action.payload);
    //     window.localStorage.setItem("favorites", JSON.stringify(state));
    //   }
    // },
    // deleteFavoriteInLocalStorage: (state, action) => {
    //   const newBasket = state.filter((item) => item._id !== action.payload);
    //   state = newBasket;
    //   window.localStorage.setItem("favorites", JSON.stringify(state));
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToUserOrders.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      })
      .addCase(getOrdersFromUser.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      });
    // .addCase(deleteProductFromUserFavorite.fulfilled, (state, action) => {
    //   if (action.payload) {
    //     return action.payload;
    //   }
    // });
  },
});

// export const { addFavoriteToLocalStorage, deleteFavoriteInLocalStorage } = slice.actions;
export default slice.reducer;
