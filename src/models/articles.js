const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    single: {
      type: Number,
      required: true,
    },
    wholesale: Number,
  },
  attributes: [String],
  discount: Number,
  brand: String,
  labels: [String],
  img: {
    type: String,
    required: true,
  },
});

const model = mongoose.models.Article || mongoose.model("Article", schema);

export default model;
