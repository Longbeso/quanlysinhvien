import express from "express";
import roomController from "../controller/roomController.js";
const roomRouter = express.Router();

roomRouter.post("/", roomController.createRoom);
// roomRouter.patch("/:id", roomController.updateLecturer);
roomRouter.get("/:id", roomController.getRoom);
roomRouter.get("/", roomController.getAllRoom);
roomRouter.delete("/:id", roomController.deleteRoom);

export default roomRouter;
