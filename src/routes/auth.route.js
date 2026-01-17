import express from "express";
const authRouter = express.Router();
import registerController from "../controller/auth/register.js";
authRouter.post("/register", registerController.registerAccount);

export default authRouter;
