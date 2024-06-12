import connectToDB from "@/config/db";
import ProductModel from "@/models/products";

export async function GET() {
  try {
    connectToDB();
    const product = await ProductModel.find(
      { discount: { $ne: 0 } },
      "name discount price wholesale attributes img"
    );
    return Response.json(product);
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}
