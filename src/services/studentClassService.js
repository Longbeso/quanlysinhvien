import DB from "../models/index.cjs";
import { Op } from "sequelize";
const createStudentClass = async ({ name, major_id, code }) => {
  const isContainMajor = await DB.Major.findByPk(major_id);
  if (!isContainMajor) {
    throw new Error("Ngành học không tồn tại, vui lòng xem lại mã Ngành");
  }
  const isContainClass = await DB.StudentClass.findOne({ where: { code } });
  if (isContainClass) {
    throw new Error("Lớp chuyên ngành đã tồn tại");
  }

  const student_class = await DB.StudentClass.create({
    name,
    major_id,
    code,
  });
  return {
    name: student_class.name,
    major: {
      code: isContainMajor.code,
      name: isContainMajor.name,
    },
    code: student_class.code,
  };
};

const getAllClassStudent = async () => {
  let listStudentClass = await DB.StudentClass.findAll({});
  const result = await Promise.all(
    listStudentClass.map(async (studentClass) => {
      const major = await DB.Major.findByPk(studentClass.major_id);
      return {
        id: studentClass.id,
        code: studentClass.code,
        name: studentClass.name,
        status: studentClass.status,
        major:
          {
            name: major.name,
            code: major.code,
          } ?? null,
      };
    }),
  );
  return result;
};

const getStudentClass = async (id) => {
  const studentClass = await DB.StudentClass.findByPk(id);
  if (!studentClass) {
    throw new Error("Class không tồn tại");
  }
  const major = await DB.Major.findByPk(studentClass.major_id);

  return {
    id: studentClass.id,
    name: studentClass.name,
    major:
      {
        name: major.name,
        code: major.code,
      } ?? null,

    code: studentClass.code,
    status: studentClass.status,
  };
};

const updataStudentClass = async ({ id, ...data }) => {
  const studentClass = await DB.StudentClass.findByPk(id);

  if (!studentClass) {
    throw new Error("không tồn tại class, vui lòng xem lại id");
  }

  const resultUpdate = await studentClass.update(data);

  return {
    name: resultUpdate.name,
    status: resultUpdate.status,
    code: resultUpdate.code,
  };
};

const deleteStudentClass = async (id) => {
  const studentClass = await DB.StudentClass.findByPk(id);
  if (!studentClass) {
    throw new Error("Class không tồn tại");
  }
  const countStudent = await DB.Student.count({
    // status: 1: studying, 2 deferred (bảo lưu)
    where: { class_id: id, status: { [Op.in]: [1, 2] } },
  });

  if (countStudent > 0) {
    throw new Error("Còn sinh viên đang học lớp chuyên ngành này");
  }

  const resultDelete = await studentClass.destroy();
  return {
    id: resultDelete.id,
    name: resultDelete.name,
    major_id: resultDelete.major_id,
    code: resultDelete.code,
  };
};
export default {
  createStudentClass,
  getAllClassStudent,
  getStudentClass,
  updataStudentClass,
  deleteStudentClass,
};
