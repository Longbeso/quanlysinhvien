import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import DB from "../../models/index.cjs";
import jwt from "jsonwebtoken";
const refreshToken = async (token_check) => {
  const token = token_check;
  const decode = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  if (!decode) {
    throw new Error("No refresh_token");
  }
  // find roken in db
  const tokenInDB = await DB.Refresh_token.findOne({
    where: { user_id: decode?.user_id },
  });
  if (!tokenInDB) {
    throw new Error("không tồn tại refreshToken");
  }
  const isContain = await bcrypt.compare(token, tokenInDB.token);

  if (!isContain) {
    throw new Error("refreshToken không đúng");
  }

  // if has old tokon ===> delete
  if (tokenInDB) {
    await tokenInDB.destroy();
  }

  const payload = {
    email: decode.email,
    name: decode.name,
    user_id: decode.user_id,
    role: decode.role,
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

  // stored new refresh token
  const new_refresh_token_db = await DB.Refresh_token.create({
    user_id: decode.user_id,
    token: refresh_token_hash,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  return {
    EC: 0,
    access_token,
    refresh_token,
  };
};

export default refreshToken;
