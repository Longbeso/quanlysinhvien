import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
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
    // create access toke
    const payload = {
      email: user.email,
      name: user.username,
      user_id: user.id,
      role: user.role_id,
    };
    const access_token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      // expiresIn: process.env.JWT_EXPIRE,
      expiresIn: "1h",
    });
    const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      // expiresIn: process.env.JWT_EXPIRE,
      expiresIn: "7d",
    });

    const saltRounds = 10;
    const refresh_token_hash = await bcrypt.hash(refresh_token, saltRounds);

    const new_refresh_token_db = await DB.Refresh_token.create({
      user_id: user.id,
      token: refresh_token_hash,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    const user_role = await DB.Role.findByPk(user.role_id);
    // lưu refresh token vào db
    return {
      EC: 0,
      access_token,
      refresh_token,
      user: {
        email: user.email,
        name: user.username,
        role: user_role.name,
      },
    };
  } else {
    throw new AppError("Email/Password không hợp lệ", 400);
  }
};

export default loginService;
