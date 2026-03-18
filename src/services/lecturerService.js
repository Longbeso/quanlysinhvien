import DB from "../models/index.cjs";
import registerService from "./authService/registerService.js";

const createLecturer = async (data) => {
  const { email, passWord, userName, faculty_id, phone } = data;
  let { gender } = data;
  const isContainFaculty = await DB.Faculty.findOne({
    where: { id: faculty_id },
  });

  if (gender !== "Nam" && gender !== "Nu") {
    throw new Error("gender phải là Nam hoặc Nu");
  } else {
    gender = gender === "Nam" ? 1 : 0;
  }

  if (!isContainFaculty) {
    throw new Error("id khoa không hợp lệ");
  }

  const user = await registerService({
    email,
    passWord,
    role: "LECTURER",
    userName,
  });

  let lecturer;

  if (user) {
    lecturer = await DB.Lecturer.create({
      faculty_id,
      user_id: user.id,
      gender,
      phone,
    });
  }

  return {
    id: lecturer.id,
    userName: user.username,
    email: user.email,
    role: "LECTURER",
    phone: lecturer.phone,
    gender: lecturer.gender == 1 ? "Nam" : "Nữ",
  };
};

const getAllLecturer = async () => {
  const allLecturer = await DB.Lecturer.findAll({});
  const listLecturer = await Promise.all(
    await allLecturer.map(async (lecturer) => {
      const faculty = await DB.Faculty.findOne({
        where: { id: lecturer.faculty_id },
      });
      const user = await DB.User.findOne({ where: { id: lecturer.user_id } });
      return {
        id: lecturer.id,
        name: user.username,
        email: user.email,
        faculty: {
          name: faculty.name,
          code: faculty.code,
        },
        gender: lecturer.gender == 1 ? "Nam" : "Nữ",
        phone: lecturer.phone,
      };
    }),
  );
  return listLecturer;
};

const getLecturer = async (id) => {
  const lecturer = await DB.Lecturer.findOne({
    where: { id },
  });

  if (!lecturer) {
    throw new Error("lecturer không tồn tại");
  }

  const faculty = await DB.Faculty.findOne({
    where: { id: lecturer.faculty_id },
  });
  const user = await DB.User.findOne({ where: { id: lecturer.user_id } });
  return {
    id: lecturer.id,
    name: user.username,
    email: user.email,
    faculty: {
      name: faculty.name,
      code: faculty.code,
    },
    gender: lecturer.gender == 1 ? "Nam" : "Nữ",
    phone: lecturer.phone,
  };
};

// soft delete
const deleteLecturer = async (id) => {
  const lecturer = await DB.Lecturer.findOne({ where: { id } });

  if (!lecturer) {
    throw new Error("lecturer không tồn tại");
  }

  const resultDelete = await lecturer.destroy();
  //await post.restore();
  return resultDelete;
};

// const updateLecturer = async (data) => {
//   const { phone, userName, id } = data;

//   const lecturer = await DB.Lecturer.findOne({ where: { id } });

//   let user;

//   if (lecturer) {
//     user = await DB.User.findOne({ where: { id: lecturer.user_id } });
//     await lecturer.update({ phone });
//   } else {
//     throw new Error("lecturer không tồn tại");
//   }

//   if (user) {
//     await user.update({ username: userName });
//   } else {
//     throw new Error("User không tồn tại");
//   }

//   return "Update thành công";
// };

const updateLecturer = async (data) => {
  const { phone, userName, id } = data;

  const lecturer = await DB.Lecturer.findOne({ where: { id } });

  if (!lecturer) {
    throw new Error("Lecturer không tồn tại");
  }

  const user = await DB.User.findOne({
    where: { id: lecturer.user_id },
  });

  if (!user) {
    throw new Error("User không tồn tại");
  }

  await lecturer.update({ phone });
  await user.update({ username: userName });

  return true;
};

export default {
  createLecturer,
  getAllLecturer,
  getLecturer,
  deleteLecturer,
  updateLecturer,
};
