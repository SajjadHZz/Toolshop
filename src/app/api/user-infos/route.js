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

    const user = await UserModel.findOne(
      { email: tokenPayload.email },
      `username
    firstname
    lastname
    state
    city
    address
    postalCode
    numberPhone
    landline
    nationalityCode
    numberCard
    shabaCard
    job
    company`
    );

    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json({ message: `Server Internal Error: ${err}` }, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    connectToDB();
    const tokenPayload = isValidToken();

    if (!tokenPayload) {
      return Response.json({ message: "You are't loggined" }, { status: 401 });
    }
    const body = await req.json();
    const user = await UserModel.findOneAndUpdate({ email: tokenPayload.email }, body, { new: true });

    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json({ message: `Server Internal Error: ${err}` }, { status: 500 });
  }
}
