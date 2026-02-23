import refreshTokenService from "../../services/authService/refreshTokenService.js";
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
const refreshToken = async (req, res) => {
  try {
    const refresh_token_check = req?.cookies?.refresh_token;

    if (!refresh_token_check) {
      throw new Error("No refresh_token");
    }

    const new_token = await refreshTokenService(refresh_token_check);

    res.cookie("refresh_token", new_token.refresh_token, {
      httpOnly: true, // js không đọc được
      secure: false, // true nếu HTTPS
      sameSite: "lax", // "none" + secure:true nếu khác domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });
    res
      .status(200)
      .json({ Success: true, access_token: new_token.access_token });
  } catch (err) {
    res.status(400).json({ Success: true, MS: err.message });
  }
};

export default { refreshToken };
