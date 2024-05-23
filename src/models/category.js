const mongoose = require("mongoose");

// const subTitles = {
//   name: String,
// };

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  subs: [String],
});

const CategoryModel = mongoose.models.Category || mongoose.model("Category", schema);

export default CategoryModel;
