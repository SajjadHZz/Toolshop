import connectToDB from "@/config/db";
import ProductModel from "@/models/products";

export async function GET(req) {
  connectToDB();
  try {
    const search = req.nextUrl.searchParams;
    const category = search.get("category");
    const brand = search.get("brand");

    if (category) {
      const products = await ProductModel.find({
        $or: [{ "category.main": category }, { "category.sub": category }],
      });
      return Response.json(products);
    } else if (brand) {
      const products = await ProductModel.find().populate("brand");
      const filterProductsBrand = products.filter((item) => item.brand.name === brand);
      return Response.json(filterProductsBrand);
    } else if (!req.nextUrl.search) {
      const products = await ProductModel.find();
      return Response.json(products);
    } else {
      return Response.json([]);
    }
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    await ProductModel.create(body);
    return Response.json({ message: "Create Product Successfully" }, { status: 201 });
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}
