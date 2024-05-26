import { CloseCircleIcon, TickCircleIcon } from "@/components/modules/Svgs/Svgs";
import { discountCalculate } from "@/utils/calculates";
import { ToastAlert } from "@/utils/sort";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const addProductToUserBasket = createAsyncThunk(
  "Basket/addProductToUserBasket",
  async ({ url, productId, count }) => {
    const set = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, count }),
    });
    if (set.status === 200) {
      toast.custom((t) => (
        <ToastAlert
          title="محصول با موفقیت به سبدخرید اضافه شد"
          status="success"
          icon={<TickCircleIcon size="20" color="white" />}
        />
      ));
      const res = await fetch(url);
      return await res.json();
    } else if (set.status === 300) {
      toast.custom((t) => (
        <ToastAlert
          title="محصول موردنظر در سبدخرید شما وجود دارد"
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

export const deleteProductFromUserBasket = createAsyncThunk(
  "Basket/deleteProductFromUserBasket",
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
          title="محصول با موفقیت از سبدخرید حذف شد"
          status="success"
          icon={<TickCircleIcon size="20" color="white" />}
        />
      ));
      return await res.json();
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

export const updateProductInUserBasket = createAsyncThunk(
  "Basket/updateProductInUserBasket",
  async ({ url, productId, counter }) => {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, count: counter }),
    });
    if (res.status === 200) {
      return res.json();
    }
  }
);

export const getProductFromUserBasket = createAsyncThunk("Basket/getProductFromUserBasket", async (url) => {
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 200) {
    return await res.json();
  } else {
    const basket = window.localStorage.getItem("basket");
    if (basket) {
      return JSON.parse(basket);
    } else {
      window.localStorage.setItem(
        "basket",
        JSON.stringify({
          basket: {
            sumPrice: 0,
            list: [],
          },
        })
      );
    }
  }
});

const slice = createSlice({
  name: "Basket",
  initialState: {
    sumPrice: 0,
    list: [],
  },
  reducers: {
    addProductToLocalStorage: (state, action) => {
      const { product, count } = action.payload;
      const isDuplicateProduct = state.list.some((item) => item.product._id === product._id);
      if (!isDuplicateProduct) {
        let totalPrice = 0;
        if (count >= product.wholesale.number) {
          totalPrice = discountCalculate(product.wholesale.price, product.discount) * count;
        } else {
          totalPrice = discountCalculate(product.price, product.discount) * count;
        }
        state.sumPrice += totalPrice;
        state.list.push(action.payload);
        toast.custom((t) => (
          <ToastAlert
            title="محصول با موفقیت به سبدخرید اضافه شد"
            status="success"
            icon={<TickCircleIcon size="20" color="white" />}
          />
        ));
        window.localStorage.setItem("basket", JSON.stringify({ basket: state }));
      } else {
        toast.custom((t) => (
          <ToastAlert
            title="محصول موردنظر در سبدخرید شما وجود دارد"
            status="error"
            icon={<CloseCircleIcon size="20" color="white" />}
          />
        ));
      }
    },
    updateProductInLocalStorage: (state, action) => {
      const { productId, count } = action.payload;
      const product = [...state.list].find((item) => item.product._id === productId);
      product.count = count;
      let totalPrice = 0;
      state.list.forEach((item) => {
        if (item.count >= item.product.wholesale.number) {
          totalPrice += discountCalculate(item.product.wholesale.price, item.product.discount) * item.count;
        } else {
          totalPrice += discountCalculate(item.product.price, item.product.discount) * item.count;
        }
      });
      state.sumPrice = totalPrice;
      window.localStorage.setItem("basket", JSON.stringify({ basket: state }));
    },
    deleteProductInLocalStorage: (state, action) => {
      const product = [...state.list].find((item) => item.product._id === action.payload);

      let productTotalPrice = 0;
      if (product.count >= product.product.wholesale.number) {
        productTotalPrice =
          discountCalculate(product.product.wholesale.price, product.product.discount) * product.count;
      } else {
        productTotalPrice =
          discountCalculate(product.product.price, product.product.discount) * product.count;
      }

      state.sumPrice -= productTotalPrice;
      const newBasket = [...state.list].filter((item) => item.product._id !== action.payload);
      state.list = newBasket;
      toast.custom((t) => (
        <ToastAlert
          title="محصول با موفقیت از سبدخرید حذف شد"
          status="success"
          icon={<TickCircleIcon size="20" color="white" />}
        />
      ));
      window.localStorage.setItem("basket", JSON.stringify({ basket: state }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToUserBasket.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload.basket;
        }
      })
      .addCase(updateProductInUserBasket.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      })
      .addCase(getProductFromUserBasket.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload.basket;
        }
      })
      .addCase(deleteProductFromUserBasket.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      });
  },
});

export const { addProductToLocalStorage, updateProductInLocalStorage, deleteProductInLocalStorage } =
  slice.actions;
export default slice.reducer;
