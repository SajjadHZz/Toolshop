import connectToDB from "@/config/db";
import CategoryModel from "@/models/category";

export async function GET() {
  try {
    connectToDB();
    const categories = await CategoryModel.find();
    return Response.json(categories);
  } catch (err) {
    console.error(err);
    return Response.json([], { status: 500 });
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
