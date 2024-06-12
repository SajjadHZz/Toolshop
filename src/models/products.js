import mongoose from "mongoose";
import BrandModel from "./brands";

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    wholesale: {
      price: Number,
      number: Number,
    },
    attributes: [String],
    discount: {
      type: Number,
      default: 0,
    },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    category: {
      main: String,
      sub: String,
    },
    labels: [String],
    img: [
      {
        type: String,
        required: true,
      },
    ],
    sales: {
      type: Number,
      default: 0,
    },
    specifications: [{ key: String, value: String }],
    describtion: String,
  },
  { timestamps: true }
);

const ProductModel = mongoose.models.Product || mongoose.model("Product", schema);

export default ProductModel;
