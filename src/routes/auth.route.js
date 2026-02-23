import express from "express";
const authRouter = express.Router();
import registerController from "../controller/auth/registerController.js";
import loginController from "../controller/auth/loginController.js";
import refreshTokenController from "../controller/auth/refreshTokenController.js";
authRouter.post("/register", registerController.register);
authRouter.post("/login", loginController.login);
authRouter.post("/refreshToken", refreshTokenController.refreshToken);

export default authRouter;
