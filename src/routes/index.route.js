import express from "express";
const indexRouter = express.Router();
import authRouter from "./auth.route.js";

//   app.get("/", useController.test);
indexRouter.use("/auth", authRouter);

export default indexRouter;
