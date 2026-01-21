import express from "express";
const authRouter = express.Router();
import registerController from "../controller/auth/registerController.js";
import loginController from "../controller/auth/loginController.js";
authRouter.post("/register", registerController.register);
authRouter.post("/login", loginController.login);
export default authRouter;
