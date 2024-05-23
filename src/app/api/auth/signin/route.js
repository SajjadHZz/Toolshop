import UserModel from "@/models/users";
import connectToDB from "@/config/db";
import { generateToken, verifyPassword } from "@/utils/auth";

export async function POST(req) {
  try {
    connectToDB();
    const { email, password, basket } = await req.json();

    const user = await UserModel.findOne({ email }, "email");

    if (!user) {
      return Response.json({ message: "Email or Password is not currect !" }, { status: 404 });
    }

    const isValidPassword = verifyPassword(password, user.password);
    if (!isValidPassword) {
      return Response.json({ message: "Email or Password is not currect !" }, { status: 422 });
    }

    const token = generateToken({ email: user.email });
    user.basket = basket;
    user.save();

    return Response.json(user, {
      status: 200,
      headers: { "Set-Cookie": `token=${token};path=/;httpOnly=true` },
    });
  } catch (err) {
    return Response.json({ message: `Server Internal Error: ${err}` }, { status: 500 });
  }
}
