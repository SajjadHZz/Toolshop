import connectToDB from "@/config/db";
import ProductModel from "@/models/products";

export async function GET(_, { params }) {
  try {
    connectToDB();
    const product = await ProductModel.findOne({ name: params.productIdentifire }, "-__v").populate("brand");
    return Response.json(product);
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}
