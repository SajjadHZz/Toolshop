import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "QuicklyAccess",
  initialState: {
    _id: "",
    name: "",
    attributes: [],
    price: 0,
    wholesale: {
      price: 0,
      number: 0,
    },
    discount: 0,
    img: [],
  },
  reducers: {
    quicklyAccessProduct: (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    },
  },
});

export const { quicklyAccessProduct } = slice.actions;
export default slice.reducer;
