import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryInstance from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryInstance,
  params: {
    folder: "faculties", // folder trên Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;
