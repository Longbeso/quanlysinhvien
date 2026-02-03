import loginService from "../../services/authService/loginService.js";
const login = async (req, res) => {
  try {
    const { email, passWord } = req.body;
    const loginAccount = await loginService({ email, passWord });

    res.cookie("refresh_token", loginAccount.refresh_token, {
      httpOnly: true, // js không đọc được
      secure: false, // true nếu HTTPS
      sameSite: "lax", // "none" + secure:true nếu khác domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    res.status(200).json({
      EC: 0,
      access_token: loginAccount.access_token,
      user: loginAccount.user,
    });
  } catch (err) {
    return res
      .status(err.statusCode || 500)
      .json({ EC: 1, MessageError: err.message });
  }
};

export default { login };
