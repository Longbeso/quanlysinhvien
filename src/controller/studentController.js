import studentService from "../services/studentService.js";

const createStudent = (req, res) => {
  const { email, passWord, role, userName } = req.body;
  return res.json({ dt: { email, passWord, role, userName } });
};

export default { createStudent };
// here
