import express from "express";
import lecturerController from "../controller/lecturerController.js";
const lecturerRouter = express.Router();

lecturerRouter.post("/", lecturerController.createLecturer);
lecturerRouter.get("/:id", lecturerController.getLecturer);
lecturerRouter.get("/", lecturerController.getAllLecturer);
lecturerRouter.delete("/:id", lecturerController.deleteLecturer);

export default lecturerRouter;
