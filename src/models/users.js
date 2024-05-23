const mongoose = require("mongoose");
import ProductModel from "./products";
const { Schema } = mongoose;

const productSchema = {
  list: [
    {
      price: Number,
      name: String,
      img: String,
      count: Number,
    },
  ],
  sumPrice: {
    type: Number,
    default: 0,
  },
};

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  basket: {
    list: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        count: { type: Number, default: 1 },
      },
    ],
    sumPrice: {
      type: Number,
      default: 0,
    },
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  // tickets:{},
  orders: {
    current: productSchema,
    delivery: productSchema,
    return: productSchema,
    canceled: productSchema,
  },
  username: String,
  firstname: String,
  lastname: String,
  state: String,
  city: String,
  address: String,
  numberPhone: String,
  landline: String,
  nationalityCode: String,
  numberCard: String,
  shabaCard: String,
  job: String,
  company: String,

  role: {
    type: String,
    default: "USER",
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", schema);
export default UserModel;
