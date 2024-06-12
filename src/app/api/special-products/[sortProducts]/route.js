import connectToDB from "@/config/db";
import ProductModel from "@/models/products";

export async function GET(_, { params }) {
  try {
    connectToDB();
    switch (params.sortProducts) {
      case "seller": {
        const product = await ProductModel.find({}, "name discount price wholesale attributes sales img");
        return Response.json(product.sort((a, b) => b.sales - a.sales).slice(0, 10));
      }

      case "news": {
        const product = await ProductModel.find({}, "name discount price wholesale attributes img updatedAt");
        return Response.json(
          product
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 10)
        );
      }
    }
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}
