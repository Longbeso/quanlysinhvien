import loginService from "../../services/authService/loginService.js";
const login = async (req, res) => {
  try {
    const { email, passWord } = req.body;
    const loginAccount = await loginService({ email, passWord });
    return res.status(200).json(loginAccount);
  } catch (err) {
    return res
      .status(err.statusCode || 500)
      .json({ EC: 1, MessageError: err.message });
  }
};

export default { login };
