import studentService from "../services/studentService.js";

const createStudent = async (req, res) => {
  try {
    const { email, passWord, role, userName } = req.body;
    if (!email || !passWord || !role || !userName) {
      throw new Error("Dữ liệu người dùng không hợp lệ !!!");
    }

    const student = await studentService.createStudent();
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

export default { createStudent };
// here
