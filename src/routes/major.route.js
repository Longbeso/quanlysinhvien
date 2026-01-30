import express from "express";
const majorRouter = express.Router();

import majorController from "../controller/majorController.js";

majorRouter.post("/", majorController.createMajor);

export default majorRouter;
