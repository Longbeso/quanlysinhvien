import majorService from "../services/majorService.js";

const createMajor = async (req, res) => {
  try {
    let { name, faculty_id, required_credits, code } = req.body;

    faculty_id = Number(faculty_id);
    required_credits = Number(required_credits);

    if (required_credits <= 0) {
      throw new Error("Số tín chỉ phải lớn hơn 0");
    }

    if (
      !name ||
      !code ||
      Number.isNaN(faculty_id) ||
      Number.isNaN(required_credits) ||
      !Number.isInteger(faculty_id) ||
      !Number.isInteger(required_credits)
    ) {
      throw new Error("Dữ liệu không được để trống");
    }
    const major = await majorService.createMajor(
      name,
      faculty_id,
      required_credits,
      code,
    );
    res.status(200).json({ Success: true, Data: major });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const getAllMajor = (req, res) => {};

export default { createMajor };
