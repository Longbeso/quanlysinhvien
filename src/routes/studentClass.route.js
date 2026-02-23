import express from "express";
const studentClassRouter = express.Router();

import studentClassController from "../controller/studentClassController.js";

studentClassRouter.post("/", studentClassController.createStudentClass);
studentClassRouter.get("/", studentClassController.getAllStudentClass);
studentClassRouter.get("/:id", studentClassController.getStudentClass);
studentClassRouter.patch("/:id", studentClassController.updataStudentClass);
studentClassRouter.delete("/:id", studentClassController.deleteStudentClass);

export default studentClassRouter;
