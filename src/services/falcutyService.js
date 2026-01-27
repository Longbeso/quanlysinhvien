import { where } from "sequelize";
import DB from "../models/index.cjs";

const createFaculty = async (name, imageUrl, publicId, code) => {
  const isContain = await DB.Faculty.findOne({ where: { code } });
  if (isContain) {
    throw new Error("Khoa đã tồn tại");
  }
  const faculty = await DB.Faculty.create({
    name,
    img: imageUrl,
    image_public_id: publicId,
    code,
    status: 1,
  });

  if (!faculty) {
    throw new Error("tạo khoa thất bại");
  }
  return faculty;
};

const updateFaculty = (code, updata) => {
  const { name, img, status } = updata;
  const data = {};
  if (name) {
    data.name = name;
  }

  // here
};

const deleteFaculty = async (id) => {
  if (!id && id != 0) {
    res.json("id không hợp lệ");
  }
  const faculty = await DB.Faculty.findOne({ where: { id } });
  if (!faculty) {
    throw new Error("mã khoa không hợp lệ / không tồn tại");
  }
  return faculty.destroy();
};

const getAllFaculty = async () => {
  return await DB.Faculty.findAll({
    attributes: ["id", "name", "code", "img"],
  });
};

export default { createFaculty, getAllFaculty, deleteFaculty };
