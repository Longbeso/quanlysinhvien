import express from "express";
// const indexRouter = express.Router();
import auth from "../middlewares/auth.js";
import authRouter from "./auth.route.js";
import facultyRouter from "./faculty.route.js";
import studentClassRouter from "./studentClass.route.js";
// import  from "./student.route.js";
import majorRouter from "./student.route.js";
import studentRouter from "./student.route.js";
const indexRouter = (app) => {
  app.use(auth);
  app.use("/v1/api/auth", authRouter);
  app.use("/v1/api/faculty", facultyRouter);
  app.use("/v1/api/major", majorRouter);
  app.use("/v1/api/studentClass", studentClassRouter);
  app.use("/v1/api/student", studentRouter);

  // app.use("/v1/api/studentClass", studentClassRouter);
  //   app.use("/v1/api/", auth);
};

export default indexRouter;
