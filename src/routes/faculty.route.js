import express from "express";
const facultyRouter = express.Router();
import upload from "../middlewares/uploadCloud.js";
// import uploadMiddleware from "../middlewares/uploadCloud.js";
import facultyController from "../controller/facultyController.js";

facultyRouter.post(
  "/",
  upload.single("image"),
  facultyController.createFaculty,
);
facultyRouter.patch(
  "/:id",
  upload.single("image"),
  facultyController.patchFaculty,
);
facultyRouter.get("/", facultyController.getAllFaculty);
facultyRouter.get("/:id", facultyController.getFaculty);

facultyRouter.delete("/:id", facultyController.deleteFaculty);

export default facultyRouter;
