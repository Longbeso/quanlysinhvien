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

const getAllMajor = async () => {
  const listMajor = await DB.Major.findAll({});

  const result = await Promise.all(
    listMajor.map(async (major) => {
      const faculty = await DB.Faculty.findOne({
        where: { id: major.faculty_id },
      });
      return {
        id: major.id,
        name: major.name,
        faculty: {
          name: faculty.name,
        },
        required_credits: major.required_credits,
        code: major.code,
      };
    }),
  );

  return result;
};

const getMajor = async (id) => {
  const major = await DB.Major.findOne({ where: { id } });

  if (!major) {
    throw new Error("Ngành học không tồn tại");
  }
  const faculty = await DB.Faculty.findOne({
    where: { id: major.faculty_id },
  });
  return {
    id: major.id,
    name: major.name,
    faculty: {
      name: faculty.name,
    },
    required_credits: major.required_credits,
    code: major.code,
  };
};

const updataMajor = async (dataUpdate) => {
  const allowedFields = ["name", "faculty_id", "code", "required_credits"];

  const id = dataUpdate?.id;

  const data = {};

  allowedFields.forEach((field) => {
    if (dataUpdate[field] != null) {
      data[field] = dataUpdate[field];
    }
  });

  const major = await DB.Major.findByPk(id);
  if (!major) {
    throw new Error("Ngành không tồn tại");
  }

  if (dataUpdate?.faculty_id) {
    const faculty = await DB.Faculty.findByPk(dataUpdate?.faculty_id);
    if (!faculty) {
      throw new Error("Khoa không tồn tại");
    }
  }

  await major.update(data);

  return major;
};

const deleteMajor = async (id) => {
  const major = await DB.Major.findByPk(id);
  if (!major) {
    throw new Error("Ngành không tồn tại ");
  }

  const studentClassCount = await DB.StudentClass.count({
    where: { major_id: id },
  });
  if (studentClassCount > 0) {
    throw new Error("vẫn còn lớp chuyên ngành, không thể xóa ngành");
  }

  return await major.destroy();
};

export default { createMajor, getAllMajor, getMajor, updataMajor, deleteMajor };
