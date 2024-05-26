import { CloseCircleIcon, TickCircleIcon } from "@/components/modules/Svgs/Svgs";
import { ToastAlert } from "@/utils/sort";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const getUserAuth = createAsyncThunk("User/getUserAuth", async (url) => {
  const res = await fetch(url);
  if (res.status === 200) {
    return await res.json();
  } else {
    return { email: "", username: "", loading: false };
  }
});

export const signinUserToServer = createAsyncThunk(
  "User/signinUserToServer",
  async ({ url, email, password, basket }) => {
    if (!email.trim() || !password.trim()) {
      toast.custom((t) => (
        <ToastAlert
          title="لطفا فیلدهای مورد نظر را پر کنید"
          status="error"
          icon={<CloseCircleIcon size="20" color="white" />}
        />
      ));
      return;
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, basket }),
    });
    switch (res.status) {
      case 200:
        location.assign("/my-account");
        toast.custom((t) => (
          <ToastAlert
            title="شما با موفقیت وارد شدید"
            status="success"
            icon={<TickCircleIcon size="20" color="white" />}
          />
        ));
        return await res.json();
      case 404:
      case 422:
        toast.custom((t) => (
          <ToastAlert
            title="ایمیل یا پسورد شما نادرست می باشد"
            status="error"
            icon={<CloseCircleIcon size="20" color="white" />}
          />
        ));
        break;
      case 500:
        toast.custom((t) => (
          <ToastAlert
            title="سرور با مشکل مواجه شده. لطفا بعدا تلاش کنید"
            status="error"
            icon={<CloseCircleIcon size="20" color="white" />}
          />
        ));
        break;
    }
  }
);

export const signupUserToServer = createAsyncThunk(
  "User/signupUserToServer",
  async ({ url, email, password, basket }) => {
    if (!email.trim() || !password.trim()) {
      toast.custom((t) => (
        <ToastAlert
          title="لطفا فیلدهای مورد نظر را پر کنید"
          status="error"
          icon={<CloseCircleIcon size="20" color="white" />}
        />
      ));
      return;
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, basket }),
    });
    switch (res.status) {
      case 201:
        location.assign("/my-account");
        toast.custom((t) => (
          <ToastAlert
            title="شما با موفقیت ثبت نام شدید"
            status="success"
            icon={<TickCircleIcon size="20" color="white" />}
          />
        ));
        return await res.json();
      case 422:
        toast.custom((t) => (
          <ToastAlert
            title="ایمیلی از قبل با همین نام وجود دارد"
            status="error"
            icon={<CloseCircleIcon size="20" color="white" />}
          />
        ));
        break;
      case 500:
        toast.custom((t) => (
          <ToastAlert
            title="سرور با مشکل مواجه شده. لطفا بعدا تلاش کنید"
            status="error"
            icon={<CloseCircleIcon size="20" color="white" />}
          />
        ));
        break;
    }
  }
);

export const signoutUserFromServer = createAsyncThunk("User/signoutUserFromServer", async (url) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  switch (res.status) {
    case 200:
      location.assign("/");
      toast.custom((t) => (
        <ToastAlert
          title="شما با موفقیت خارج شدید"
          status="success"
          icon={<TickCircleIcon size="20" color="white" />}
        />
      ));
      return { email: "", username: "", loading: true };
    case 500:
      toast.custom((t) => (
        <ToastAlert
          title="سرور با مشکل مواجه شده. لطفا بعدا تلاش کنید"
          status="error"
          icon={<CloseCircleIcon size="20" color="white" />}
        />
      ));
      break;
  }
});

const slice = createSlice({
  name: "User",
  initialState: { email: "", username: "", loading: true },
  reducers: {
    // addProduct: (state, action) => {
    //   state.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAuth.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      })
      .addCase(signinUserToServer.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      })
      .addCase(signupUserToServer.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      })
      .addCase(signoutUserFromServer.fulfilled, (state, action) => {
        if (action.payload) {
          return action.payload;
        }
      });
  },
});

// export const { addProduct, removeProduct, addProductToLocalStorage } = slice.actions;
export default slice.reducer;
