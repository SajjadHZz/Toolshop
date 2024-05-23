import UserModel from "@/models/users";
import connectToDB from "@/config/db";
import { isValidToken } from "@/utils/auth";

export async function GET() {
  try {
    connectToDB();
    const tokenPayload = isValidToken();

    if (!tokenPayload) {
      return Response.json({ message: "You are't loggined" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: tokenPayload.email }, "email");

    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json({ message: `Server Internal Error: ${err}` }, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    connectToDB();
    // const tokenPayload = isValidToken();

    // if (!tokenPayload) {
    //   return Response.json({ message: "You are't loggined" }, { status: 401 });
    // }
    const body = await req.json();
    // const user = await UserModel.findOneAndUpdate({ email: "ali@gmail.com" }, body);

    return Response.json(body, { status: 200 });
  } catch (err) {
    return Response.json({ message: `Server Internal Error: ${err}` }, { status: 500 });
  }
}
