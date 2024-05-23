import UserModel from "@/models/users";
import ProductModel from "@/models/products";
import connectToDB from "@/config/db";
import { isValidToken } from "@/utils/auth";
import { discountCalculate } from "@/utils/calculates";

export async function GET() {
  try {
    connectToDB();
    const tokenPayload = isValidToken();
    if (!tokenPayload) {
      return Response.json({ message: "You are't loggined" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: tokenPayload.email }, "favorites").populate("favorites");

    return Response.json(user.favorites, { status: 200 });
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

    const { productId } = await req.json();

    const user = await UserModel.findOne({ email: tokenPayload.email }, "favorites");

    const isDuplicateProduct = user.favorites.some((item) => item.toString() === productId);
    if (isDuplicateProduct) {
      return Response.json({ message: "Multiple Product In Your Favorite List" }, { status: 300 });
    }

    user.favorites.push(productId);
    user.save();

    return Response.json(user.favorites, { status: 200 });
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    connectToDB();
    const tokenPayload = isValidToken();
    if (!tokenPayload) {
      return Response.json({ message: "You are't loggined" }, { status: 401 });
    }

    const { productId } = await req.json();

    const user = await UserModel.findOne({ email: tokenPayload.email }, "favorites").populate("favorites");

    user.favorites = user.favorites.filter((item) => item._id.toString() !== productId);
    user.save();

    return Response.json(user.favorites, { status: 200 });
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
}
