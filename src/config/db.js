const mongoose = require("mongoose");
export default async function connectToDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }
    await mongoose
      .connect("mongodb://127.0.0.1:27017/Toolshop")
      .then(() => console.log("Connect To Database Successfully."));
  } catch (err) {
    console.log("Database Connected Error:", err);
  }
}
