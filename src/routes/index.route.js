import express from "express";
// const indexRouter = express.Router();
import auth from "../middlewares/auth.js";
import authRouter from "./auth.route.js";
import facultyRouter from "./faculty.route.js";
import studentClassRouter from "./studentClass.route.js";
// import  from "./student.route.js";
import majorRouter from "./major.route.js";
import studentRouter from "./student.route.js";
import lecturerRouter from "./lecturer.route.js";
import verifyToken from "../middlewares/verifyToken.js";
import allowRoles from "../middlewares/allowRoles.js";

import refreshTokenController from "../controller/auth/refreshTokenController.js";

const indexRouter = (app) => {
  app.use(auth);
  app.use("/v1/api/auth", authRouter);
  // allowRoles("ADMIN"),
  app.use("/v1/api/faculty", verifyToken, allowRoles(1), facultyRouter);
  app.use("/v1/api/major", majorRouter);
  app.use("/v1/api/studentClass", studentClassRouter);
  app.use("/v1/api/student", studentRouter);
  app.use("/v1/api/lecturer", lecturerRouter);
  // app.use("/v1/api/studentClass", studentClassRouter);
  //   app.use("/v1/api/", auth);
};

export default indexRouter;
