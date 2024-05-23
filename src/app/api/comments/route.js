import connectToDB from "@/config/db";
import CommentModel from "@/models/comments";

export async function GET() {}
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    await CommentModel.create(body);
    return Response.json({ message: "Create Comment Successfully" }, { status: 201 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
