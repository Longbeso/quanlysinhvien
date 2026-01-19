import registerService from "../../services/authService/registerService.js";

const register = async (req, res) => {
  try {
    const user = await registerService(req?.body);
    return res.status(200).json({ success: true, DATA: user });
  } catch (err) {
    return res
      .status(err.statusCode || 500)
      .json({ success: false, MessageError: err.message });
  }
};

export default { register };
