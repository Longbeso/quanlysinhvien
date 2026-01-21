import express from "express";
// const indexRouter = express.Router();
import authRouter from "./auth.route.js";
import auth from "../middlewares/auth.js";
import longRouter from "./long.route.js";
const indexRouter = (app) => {
  app.use(auth);
  app.use("/v1/api/auth", authRouter);
  app.use("/long", longRouter);

  //   app.use("/v1/api/", auth);
};

export default indexRouter;
