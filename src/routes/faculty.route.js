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
  facultyController.updateFaculty,
);
facultyRouter.get("/", facultyController.getAllFaculty);
facultyRouter.get("/:id", facultyController.getFaculty);

facultyRouter.delete("/", (req, res) => {
  res.status(400).json({
    success: false,
    message: "Thiếu id khoa",
  });
});

facultyRouter.delete("/:id", facultyController.deleteFaculty);

export default facultyRouter;
