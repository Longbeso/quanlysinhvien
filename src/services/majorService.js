import { where } from "sequelize";
import DB from "../models/index.cjs";

const createMajor = async (name, faculty_id, required_credits, code) => {
  const faculty = await DB.Faculty.findOne({ where: { id: faculty_id } });
  if (!faculty) {
    throw new Error("Mã khoa không hợp lệ");
  }
  const isContain = await DB.Major.findOne({ where: { code } });
  if (isContain) {
    throw new Error("Ngành này đã tồn tại");
  }

  const major = await DB.Major.create({
    name,
    faculty_id,
    required_credits,
    code,
  });

  if (major) {
    return {
      id: major.id,
      faculty: {
        id: faculty.id,
        code: faculty.code,
        name: faculty.name,
      },
      name: major.name,
      required_credits: major.required_credits,
      code: major.code,
    };
  }
};

export default { createMajor };
