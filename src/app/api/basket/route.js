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

    const user = await UserModel.findOne({ email: tokenPayload.email }, "basket").populate(
      "basket.list.product"
    );

    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json({ message: `Server Internal Error: ${err}` }, { status: 500 });
  }
}

export async function POST() {
  try {
    connectToDB();
    const tokenPayload = isValidToken();
    if (!tokenPayload) {
      return Response.json({ message: "You are't loggined" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: tokenPayload.email }, "basket").populate(
      "basket.list.product"
    );

    user.basket.sumPrice = 0;
    user.basket.list = [];
    user.save();

    return Response.json(user.basket, { status: 200 });
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    connectToDB();
    const tokenPayload = isValidToken();
    if (!tokenPayload) {
      return Response.json({ message: "You are't loggined" }, { status: 401 });
    }

    const { productId, count = 1 } = await req.json();

    const user = await UserModel.findOne({ email: tokenPayload.email }, "basket").populate(
      "basket.list.product"
    );

    const isDuplicateProduct = user.basket.list.some((item) => item.product._id.toString() === productId);
    if (isDuplicateProduct) {
      return Response.json({ message: "Multiple Product In Your Basket" }, { status: 300 });
    }

    user.basket.list.push({ product: productId, count });

    const product = await ProductModel.findOne({ _id: productId }, "price wholesale discount");

    let totalPrice = 0;
    if (count >= product.wholesale.number) {
      totalPrice = discountCalculate(product.wholesale.price, product.discount) * count;
    } else {
      totalPrice = discountCalculate(product.price, product.discount) * count;
    }

    user.basket.sumPrice += totalPrice;
    user.save();

    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json({ message: `${err}` }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    connectToDB();
    const tokenPayload = isValidToken();
    if (!tokenPayload) {
      return Response.json({ message: "You are't loggined" }, { status: 401 });
    }

    const { productId, count } = await req.json();

    const user = await UserModel.findOne({ email: tokenPayload.email }, "basket").populate(
      "basket.list.product"
    );

    user.basket.list.forEach((item) => {
      if (item.product._id.toString() == productId) {
        item.count = count;
        user.save();
      }
    });

    let totalPrice = 0;
    user.basket.list.forEach((item) => {
      if (item.count >= item.product.wholesale.number) {
        totalPrice += discountCalculate(item.product.wholesale.price, item.product.discount) * item.count;
      } else {
        totalPrice += discountCalculate(item.product.price, item.product.discount) * item.count;
      }
    });
    user.basket.sumPrice = totalPrice;
    user.save();

    return Response.json(user.basket, { status: 200 });
  } catch (err) {
    return Response.json(err, { status: 500 });
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

    const user = await UserModel.findOne({ email: tokenPayload.email }, "basket").populate(
      "basket.list.product"
    );

    const product = user.basket.list.find((item) => item.product._id.toString() === productId);

    let totalPriceProduct = 0;
    if (product.count >= product.product.wholesale.number) {
      totalPriceProduct =
        discountCalculate(product.product.wholesale.price, product.product.discount) * product.count;
    } else {
      totalPriceProduct = discountCalculate(product.product.price, product.product.discount) * product.count;
    }

    user.basket.sumPrice -= totalPriceProduct;
    user.basket.list = user.basket.list.filter((item) => item.product._id.toString() !== productId);
    user.save();

    return Response.json(user.basket, { status: 200 });
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
}
