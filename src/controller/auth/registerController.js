import registerService from "../../services/authService/registerService.js";

const register = async (req, res) => {
  try {
    const user = await registerService(req?.body);
    res.status(200).json({ success: true, DATA: user });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, MessageError: err.message });
  }
};

export default { register };
