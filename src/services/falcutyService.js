import DB from "../models/index.cjs";
import cloudinary from "../config/cloudinary.js";

const createFaculty = async (name, imageUrl, publicId, code) => {
  if (!code) {
    throw new Error("code không hợp lệ");
  }
  const isContain = await DB.Faculty.findOne({ where: { code } });
  if (isContain) {
    throw new Error("Khoa đã tồn tại");
  }
  const faculty = await DB.Faculty.create({
    name,
    img: imageUrl,
    code,
    status: 1,
  });

  if (!faculty) {
    throw new Error("tạo khoa thất bại");
  }
  return {
    id: faculty.id,
    name: faculty.name,
    status: faculty.status,
    img: faculty.img,
    code: faculty.code,
  };
};

const updateFaculty = async (req) => {
  const { id } = req.params;

  const allowedFields = ["name", "status"];

  const data = {};
  // nếu có ảnh mới
  if (req.file) {
    data.img = req.file.path;
    data.image_public_id = req.file.filename;
  }
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      data[field] = req.body[field];
    }
  });
  const faculty = await DB.Faculty.findOne({ where: { id } });

  if (!faculty) {
    throw new Error("không tồn tại khoa");
  }

  const oldPublicId = faculty.image_public_id;

  if (Object.keys(data).length === 0) {
    throw new Error("Không có dữ liệu để cập nhật");
  }
  await faculty.update(data);
  // nếu có upload ảnh mới thì xóa ảnh cũ
  if (req.file && oldPublicId) {
    await cloudinary.uploader.destroy(oldPublicId);
  }

  if (faculty) {
    return {
      id: faculty.id,
      name: faculty.name,
      status: faculty.status,
      img: faculty.img,
      code: faculty.code,
    };
  }
};

const deleteFaculty = async (id) => {
  if (!id && id != 0) {
    res.json("id không hợp lệ");
  }
  const faculty = await DB.Faculty.findOne({ where: { id } });
  if (!faculty) {
    throw new Error("mã khoa không hợp lệ / không tồn tại");
  }

  await faculty.destroy();

  return {
    id: faculty.id,
    name: faculty.name,
    status: faculty.status,
    img: faculty.img,
    code: faculty.code,
  };
};

const getAllFaculty = async () => {
  return await DB.Faculty.findAll({
    attributes: ["id", "name", "status", "img", "code"],
  });
};
const getFaculty = async (id) => {
  if (!id) {
    throw new Error("id không hợp lệ");
  }

  const faculty = await DB.Faculty.findOne({ where: { id } });

  if (!faculty) {
    throw new Error("id không hợp lệ");
  }

  return {
    id: faculty.id,
    name: faculty.name,
    status: faculty.status,
    img: faculty.img,
    code: faculty.code,
  };
};

export default {
  createFaculty,
  getAllFaculty,
  deleteFaculty,
  updateFaculty,
  getFaculty,
};
