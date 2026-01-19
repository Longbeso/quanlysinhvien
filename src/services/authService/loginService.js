import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import DB from "../../models/index.cjs";
import { AppError } from "../../ultils/appError.js";
import jwt from "jsonwebtoken";
const loginService = async ({ email, passWord }) => {
  // tìm xem có email trong db không
  const { User } = DB;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError("Email/Password không hợp lệ", 400);
  }

  const isMatch = await bcrypt.compare(passWord, user.password);
  if (isMatch) {
    // create access token

    const payload = {
      email: user.email,
      name: user.username,
    };
    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return {
      EC: 0,
      access_token,
      user: {
        email: user.email,
        name: user.username,
      },
    };
  } else {
    throw new AppError("Email/Password không hợp lệ", 400);
  }
};

export default loginService;
