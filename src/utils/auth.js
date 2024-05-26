import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

export const generateToken = (data) => {
  const token = sign({ ...data }, process.env.PRIVATE_KEY, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
  return token;
};

export const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.PRIVATE_ACCESS_KEY, {
    algorithm: "HS256",
    expiresIn: "15d",
  });
  return token;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValidPassword = await compare(password, hashedPassword);
  return isValidPassword;
};

export const verifyToken = (token) => {
  try {
    const validationResult = verify(token, process.env.PRIVATE_KEY);
    return validationResult;
  } catch (err) {
    console.log("Token Error =>", err);
    return false;
  }
};

export const isValidToken = () => {
  const token = cookies().get("token")?.value;
  if (!token) {
    return "";
  }

  const tokenPayload = verifyToken(token);
  if (!tokenPayload) {
    return "";
  }

  return tokenPayload;
};
