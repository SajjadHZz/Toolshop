import connectToDB from "@/config/db";
import BrandModel from "@/models/brands";

export async function GET() {
  try {
    connectToDB();
    const brands = await BrandModel.find({}, "-__v");
    return Response.json(brands, { status: 200 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    await BrandModel.create(body);
    return Response.json({ message: "Create Brand Successfully" }, { status: 201 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
