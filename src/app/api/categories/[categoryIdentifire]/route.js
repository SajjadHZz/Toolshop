import connectToDB from "@/config/db";
import CategoryModel from "@/models/category";

export async function GET(_, { params }) {
  connectToDB();
  try {
    const categories = await CategoryModel.findOne(
      {
        $or: [{ subs: { $in: [params.categoryIdentifire] } }, { name: params.categoryIdentifire }],
      },
      "name"
    );
    return Response.json(categories);
  } catch (err) {
    console.error(err);
    return Response.json([], { status: 500 });
  }
}
