import express from "express";
const majorRouter = express.Router();

import majorController from "../controller/majorController.js";

majorRouter.post("/", majorController.createMajor);
majorRouter.get("/", majorController.getAllMajor);
majorRouter.get("/:id", majorController.getMajor);
majorRouter.patch("/:id", majorController.updataMajor);
majorRouter.delete("/:id", majorController.deleteMajor);

export default majorRouter;
