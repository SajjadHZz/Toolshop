import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserAuth = createAsyncThunk("Basket/getUserAuth", async (url) => {
  const res = await fetch(url);
  if (res.status === 200) {
    return await res.json();
  }
});

export const signinUserToServer = createAsyncThunk(
  "Basket/signinUserToServer",
  async ({ url, email, password, basket }) => {
    if (!email.trim() || !password.trim()) {
      alert("Email or Password Is Empty !");
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
        return await res.json();
      case 404:
      case 422:
        alert("Email or Password Isn't Currect !");
        break;
      case 500:
        alert("Server Error !");
        break;
    }
  }
);

export const signupUserToServer = createAsyncThunk(
  "Basket/signupUserToServer",
  async ({ url, email, password, basket }) => {
    if (!email.trim() || !password.trim()) {
      alert("Email or Password Is Empty !");
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
        return await res.json();
      case 404:
      case 422:
        alert("Email or Password Isn't Currect !");
        break;
      case 500:
        alert("Server Error !");
        break;
    }
  }
);

const slice = createSlice({
  name: "User",
  initialState: { email: "" },
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
      });
  },
});

// export const { addProduct, removeProduct, addProductToLocalStorage } = slice.actions;
export default slice.reducer;
