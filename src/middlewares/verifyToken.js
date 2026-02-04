import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")?.[1]; // lấy access_token
  if (!token) {
    return res.status(401);
  }
  const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  req.user = decode;
  next();
};

export default verifyToken;
