import express from "express";
import studentController from "../controller/studentController.js";
const studentRouter = express.Router();

studentRouter.post("/", studentController.createStudent);
studentRouter.get("/deleted", studentController.getStudentDeleted);
studentRouter.get("/:id", studentController.getStudent);
studentRouter.get("/", studentController.getAllStudent);
studentRouter.delete("/:id", studentController.deleteStudent);

export default studentRouter;
