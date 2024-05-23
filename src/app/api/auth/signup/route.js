import UserModel from "@/models/users";
import connectToDB from "@/config/db";
import { hashPassword, generateToken } from "@/utils/auth";

export async function POST(req) {
  connectToDB();
  try {
    const { email, password, basket, checked } = await req.json();

    const isUserValid = await UserModel.findOne({ email });

    if (isUserValid) {
      return Response.json({ message: "Email Already Exist !" }, { status: 422 });
    }
    const hashedPassword = await hashPassword(password);
    const token = generateToken({ email });
    await UserModel.create({
      email,
      password: hashedPassword,
      basket,
    });
    return Response.json(
      { message: "Loggin User Successfully :)" },
      { status: 201, headers: { "Set-Cookie": checked ? `token=${token};path=/;httpOnly=true` : "" } }
    );
  } catch (err) {
    return Response.json({ message: `Server Internal Error: ${err}` }, { status: 500 });
  }
}
