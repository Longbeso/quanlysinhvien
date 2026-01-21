import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const white_lists = ["/", "/auth/register", "/auth/login"];
  // const url = req.url;
  const url = req.originalUrl;
  if (white_lists.find((item) => "/v1/api" + item === url)) {
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1]; // lấy access_token
      // verify => coi có hợp lệ không
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        next(); // token hợp lệ ==> pass
      } catch (err) {
        return res.status(401).json({ MS: "Token không hợp lệ/ hết hạn" });
      }
    } else {
      return res
        .status(401)
        .json({ MS: "Bạn chưa truyền access_token ở header/token hết hạn" });
    }
  }
};

export default auth;
