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
      discount: Number,
      date: {
        type: Date,
        default: Date.now,
      },
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
    required: [true, "رایانامه ضروری است"],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})$/, "لطفا یک رایانامه صحیح وارد کنید"],
  },
  password: {
    type: String,
    required: [true, "رمز ضروری است"],
    minlegth: 5,
    select: false,
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
  postalCode: String,
  numberPhone: {
    type: String,
    match: [
      /((0?9)|(\+?989))((14)|(13)|(12)|(19)|(18)|(17)|(15)|(16)|(11)|(10)|(90)|(91)|(92)|(93)|(94)|(95)|(96)|(32)|(30)|(33)|(35)|(36)|(37)|(38)|(39)|(00)|(01)|(02)|(03)|(04)|(05)|(41)|(20)|(21)|(22)|(23)|(31)|(34)|(9910)|(9911)|(9913)|(9914)|(9999)|(999)|(990)|(9810)|(9811)|(9812)|(9813)|(9814)|(9815)|(9816)|(9817)|(998))\d{7}/g,
      "لطفا شماره درست وارد کنید.",
    ],
  },
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
