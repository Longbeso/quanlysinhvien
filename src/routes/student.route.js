import express from "express";
import studentController from "../controller/studentController.js";
const studentRouter = express.Router();

studentRouter.use("/create", studentController.createStudent);

export default studentRouter;
