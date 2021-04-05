import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = String(process.env.TOKEN_SECRET);
// console.log(secret);

const maxAge = 7 * 24 * 60 * 60; // 7 days

export const createToken = (id: bigint) => {
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
};
