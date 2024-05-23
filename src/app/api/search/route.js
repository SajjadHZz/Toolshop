import connectToDB from "@/config/db";
import ProductModel from "@/models/products";

export async function GET(req) {
  try {
    connectToDB();
    const search = req.nextUrl.searchParams;
    const name = search.get("name");

    const product = await ProductModel.find({ name: RegExp(name) });

    return Response.json(product, { status: 200 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
