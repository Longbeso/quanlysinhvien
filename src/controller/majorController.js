import majorService from "../services/majorService.js";

const createMajor = async (req, res) => {
  try {
    let { name, faculty_id, required_credits, code } = req.body;

    faculty_id = Number(faculty_id);
    required_credits = Number(required_credits);

    if (required_credits <= 0) {
      throw new Error("Số tín chỉ phải lớn hơn 0");
    }
    /** 
     * if (
      !name ||
      !code ||
      Number.isNaN(faculty_id) ||
      Number.isNaN(required_credits) ||
      !Number.isInteger(faculty_id) ||
      !Number.isInteger(required_credits)
    ) {
      throw new Error("Dữ liệu không được để trống");
    }
    */

    if (!name) {
      throw new Error("Tên không được để trống");
    }

    if (!code) {
      throw new Error("Mã không được để trống");
    }

    if (Number.isNaN(faculty_id)) {
      throw new Error("faculty_id phải là số");
    }

    if (!Number.isInteger(faculty_id)) {
      throw new Error("faculty_id phải là số nguyên");
    }

    if (Number.isNaN(required_credits)) {
      throw new Error("required_credits phải là số");
    }

    if (!Number.isInteger(required_credits)) {
      throw new Error("required_credits phải là số nguyên");
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

const getAllMajor = async (req, res) => {
  try {
    const listMajor = await majorService.getAllMajor();
    res.status(200).json({ Success: true, Data: listMajor });
  } catch (err) {
    (400).json({ Success: false, MS: err.message });
  }
};

const getMajor = async (req, res) => {
  try {
    const id = Number(req?.params?.id);
    if (Number.isNaN(id)) {
      throw new Error("id không hợp lệ");
    }
    const major = await majorService.getMajor(id);
    res.status(200).json({ Success: true, Data: major });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

// update name code faculty_id , required id
const updataMajor = async (req, res) => {
  try {
    const { name, code } = req.body;
    let data = {};

    const id = Number(req?.params?.id);

    if (!Number.isInteger(id) || id < 1) {
      throw new Error("id ngành không hợp lệ");
    }

    if (name) {
      data.name = name;
    }
    // if (faculty_id) {
    //   data.faculty_id = faculty_id;
    // }

    if (req.body.faculty_id !== undefined && req.body.faculty_id !== "") {
      const faculty_id = Number(req.body.faculty_id);

      if (!Number.isInteger(faculty_id) || faculty_id < 1) {
        throw new Error("id khoa không hợp lệ");
      }

      data.faculty_id = faculty_id;
    }
    if (
      req.body.required_credits !== undefined &&
      req.body.required_credits !== ""
    ) {
      const required_credits = Number(req.body.required_credits);

      if (!Number.isInteger(required_credits) || required_credits < 1) {
        throw new Error("id khoa không hợp lệ");
      }

      data.required_credits = required_credits;
    }

    if (code) {
      data.code = code;
    }

    if (Object.keys(data).length === 0) {
      throw new Error("Dữ liệu cập nhật không được để trống");
    }

    const major = await majorService.updataMajor({ id, ...data });
    res
      .status(200)
      .json({ Success: true, MS: "Cập nhật thành công", DataUPdate: data });
  } catch (err) {
    res.status(200).json({ Success: false, MS: err.message });
  }
};

const deleteMajor = async (req, res) => {
  try {
    const id = Number(req?.params?.id);
    if (Number.isNaN(id) || id < 0) {
      throw new Error("id không hợp lệ");
    }
    const major = await majorService.deleteMajor(id);
    res.status(200).json({ Success: true, MS: "Xóa thành công" });
  } catch (err) {
    res.status(200).json({ Success: false, MS: err.message });
  }
};

export default { createMajor, getAllMajor, getMajor, updataMajor, deleteMajor };
