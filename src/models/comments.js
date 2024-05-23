const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
});

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" }, // شناسه کاربری که کامنت را ارسال کرده است
    product: { type: Schema.Types.ObjectId, ref: "Product" }, // شناسه ابزاری که کامنت بر روی آن ارسال شده است
    content: { type: String, required: true },
    replies: [ReplySchema],
  },
  { timestamps: true }
);

const CommentModel = mongoose.models.Comment || mongoose.model("Comment", schema);

export default CommentModel;
