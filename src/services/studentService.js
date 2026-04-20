import { where } from "sequelize";
import DB from "../models/index.cjs";
import registerService from "./authService/registerService.js";
const createStudent = async (data) => {
  // const user = await DB.User.create({});
  const { email, passWord, userName, mssv, class_id, gender } = data;
  const currentYear = new Date().getFullYear();
  const isConstainClass = await DB.StudentClass.findByPk(class_id);

  if (!isConstainClass) {
    throw new Error("Lớp chuyên ngành không tồn tại");
  }

  // thêm phần check mã số sinh viên khác nhau
  const isContainMssv = await DB.Student.findOne({ where: { mssv } });

  if (isContainMssv) {
    throw new Error("Mssv đã tồn tại");
  }

  const user = await registerService({
    email,
    passWord,
    role: "STUDENT",
    userName,
  });

  let student;

  if (user) {
    student = await DB.Student.create({
      user_id: user.id,
      mssv,
      class_id,
      enroll_year: currentYear,
      gender,
    });
  }

  // here / not done / check lại đang lỗi khi test tạo student

  return {
    ...user,
    status: student.status,
    user_id: student.user_id,
    mssv: student.mssv,
    class_id: student.class_id,
    enroll_year: student.enroll_year,
    gender: student.gender == 1 ? "Nam" : "Nữ",
  };
};

const getAllStudent = async () => {
  const allStudent = await DB.Student.findAll({});
  // 1 studying | 2 deferred (bảo lưu) | 3 Graduated / 0 dismissed (bị đuổi)
  const statusExplain = [
    "Buộc thôi học",
    "Đang học",
    "Bảo lưu",
    "Đã tốt nghiệp",
  ];
  const listStudent = await Promise.all(
    allStudent.map(async (student) => {
      const user = await DB.User.findOne({ where: { id: student.user_id } });
      const role_user = await DB.Role.findOne({ where: { id: user?.role_id } });
      return {
        id: student.id,
        enable: user.enable,
        username: user.username,
        email: user.email,
        mssv: student.mssv,
        role: role_user.name,
        class_id: student.class_id,
        gender: student.gender == 1 ? "Nam" : "Nữ",
        phone: student.phone,
        address: student.address,
        enroll_year: student.enroll_year,
        status: statusExplain[student.status],
      };
    }),
  );

  return { quantity: allStudent.length, listStudent };
};

const getStudent = async (id) => {
  const student = await DB.Student.findOne({ where: { id: id } });
  const statusExplain = [
    "Buộc thôi học",
    "Đang học",
    "Bảo lưu",
    "Đã tốt nghiệp",
  ];
  if (!student) {
    throw new Error("Student không tồn tại");
  }
  const user = await DB.User.findOne({ where: { id: student.user_id } });

  if (!user) {
    throw new Error("user không tồn tại");
  }

  return {
    id: student.id,
    enable: user.enable,
    username: user.username,
    email: user.email,
    mssv: student.mssv,
    role: "STUDENT",
    class_id: student.class_id,
    gender: student.gender == 1 ? "Nam" : "Nữ",
    phone: student.phone,
    address: student.address,
    enroll_year: student.enroll_year,
    status: statusExplain[student.status],
  };
};

// not completed
const getStudentDeleted = async () => {
  const statusExplain = [
    "Buộc thôi học",
    "Đang học",
    "Bảo lưu",
    "Đã tốt nghiệp",
  ];
  const allStudentDeleted = await DB.Student.findAll({ paranoid: false });

  const listStudentDeleted = await Promise.all(
    allStudentDeleted.map(async (student) => {
      const user = DB.User.findOne({ where: { id: student.user_id } });

      return {
        id: student.id,
        enable: user.enable,
        username: user.username,
        email: user.email,
        mssv: student.mssv,
        role: "STUDENT",
        class_id: student.class_id,
        gender: student.gender == 1 ? "Nam" : "Nữ",
        phone: student.phone,
        address: student.address,
        enroll_year: student.enroll_year,
        status: statusExplain[student.status],
      };
    }),
  );
  return listStudentDeleted;
};

// soft delete
const deleteStudent = async (id) => {
  const student = await DB.Student.findOne({ where: { id } });
  console.log(student);
  if (!student) {
    throw new Error("Student không tồn tại");
  }

  const resultDelete = await student.destroy();
  //await post.restore();
  return resultDelete;
};

const updateStudent = async (data) => {
  const { phone, userName, id, address } = data;

  const student = await DB.Student.findOne({ where: { id } });

  if (!student) {
    throw new Error("student không tồn tại");
  }

  const user = await DB.User.findOne({
    where: { id: student.user_id },
  });

  if (!user) {
    throw new Error("User không tồn tại");
  }

  await student.update({ phone, address });
  await user.update({ username: userName });

  return true;
};

export default {
  createStudent,
  getAllStudent,
  getStudent,
  deleteStudent,
  getStudentDeleted,
  updateStudent,
};
