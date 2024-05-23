const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const BrandModel = mongoose.models.Brand || mongoose.model("Brand", schema);

export default BrandModel;
