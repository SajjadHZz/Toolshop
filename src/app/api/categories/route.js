import connectToDB from "@/config/db";
import CategoryModel from "@/models/category";

export async function GET() {
  connectToDB();
  //   const search = req.nextUrl.searchParams;
  //   const category = search.get("category");
  //   const price = search.get("price");
  //   if (category) {
  //     const products = await ProductModel.find({ labels: { $in: [category] } });
  //     return Response.json(products);
  //   } else if (price) {
  //     const products = await ProductModel.find({ "price.single": { $lte: +price } });
  //     return Response.json(products);
  //   } else if (!req.nextUrl.search) {
  //     const products = await ProductModel.find();
  //     return Response.json(products);
  //   } else {
  //     return Response.json([]);
  //   }
  try {
    const categories = await CategoryModel.find();
    return Response.json(categories);
  } catch (err) {
    return Response.json({ massage: `${err}` }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    await CategoryModel.create(body);
    return Response.json({ message: "Create Category Successfully" }, { status: 201 });
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}
