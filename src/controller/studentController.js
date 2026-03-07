import studentService from "../services/studentService.js";

const createStudent = async (req, res) => {
  try {
    const { email, passWord, role, userName, mssv, class_id, gender } =
      req.body;
    if (!email) {
      throw new Error("Email không hợp lệ !!!");
    }

    if (!passWord) {
      throw new Error("Mật khẩu không hợp lệ !!!");
    }

    if (!role) {
      throw new Error("Role không hợp lệ !!!");
    }

    if (!userName) {
      throw new Error("Tên người dùng không hợp lệ !!!");
    }

    if (!mssv) {
      throw new Error("MSSV không hợp lệ !!!");
    }

    if (!class_id) {
      throw new Error("class_id không hợp lệ !!!");
    }
    if (!gender) {
      throw new Error("gender không hợp lệ !!!");
    }

    const student = await studentService.createStudent({
      email,
      passWord,
      role,
      userName,
      mssv,
      class_id,
      gender,
    });

    res.status(200).json({ Success: true, dt: student });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const allStudent = await studentService.getAllStudent();
    res.status(200).json({
      Success: true,
      DT: { quantity: allStudent.length, listStudent: allStudent },
    });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const id = Number(req.params?.id);
    if (isNaN(id) || id <= 0) {
      throw new Error("id không hơp lệ");
    }
    const student = await studentService.getStudent(id);
    res.status(200).json({ Success: true, DT: student });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = Number(req?.params?.id);
    if (isNaN(id)) {
      throw new Error("id không hợp lệ");
    }
    const resultDeleteStudent = await studentService.deleteStudent(id);
    res.status(200).json({ Success: true, DT: resultDeleteStudent });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const getStudentDeleted = async (req, res) => {
  try {
    const listStudentDeleted = await studentService.getStudentDeleted();
    res
      .status(200)
      .json({
        Success: true,
        DT: { quantity: listStudentDeleted.length, listStudentDeleted },
      });
  } catch (err) {
    return res.status(400).json({ Success: false, MS: err.message });
  }
};

export default {
  createStudent,
  getAllStudent,
  getStudent,
  deleteStudent,
  getStudentDeleted,
};
// here
