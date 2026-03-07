import lecturerService from "../services/lecturerService.js";
const createLecturer = async (req, res) => {
  try {
    const { email, passWord, userName, faculty_id, gender } = req?.body;
    const phone = req?.body?.phone.trim();
    if (!email) {
      throw new Error("Email không hợp lệ !!!");
    }

    if (!passWord) {
      throw new Error("Mật khẩu không hợp lệ !!!");
    }

    if (!userName) {
      throw new Error("Tên người dùng không hợp lệ !!!");
    }

    if (!faculty_id) {
      throw new Error("faculty_id không hợp lệ !!!");
    }
    if (!gender) {
      throw new Error("gender không hợp lệ !!!");
    }

    if (phone) {
      const phoneRegex = /^0\d{9}$/;
      const isValidPhone = phoneRegex.test(phone);
      if (!isValidPhone) {
        throw new Error("phone không hợp lệ !!!");
      }
    }

    const lecturer = await lecturerService.createLecturer({
      email,
      passWord,
      userName,
      faculty_id,
      gender,
      phone,
    });
    return res.status(201).json({ Success: true, lecturer });
  } catch (err) {
    return res.status(400).json({ Success: false, MS: err.message });
  }
};

const updateLecturer = async (req, res) => {
  try {
    const { phone, userName } = req.body;
    const id = Number(req.params?.id);
    let data = {};
    if (isNaN(id)) {
      throw new Error("id không hợp lệ");
    }

    data.id = id;

    if (phone) {
      const phoneRegex = /^0\d{9}$/;
      const isValidPhone = phoneRegex.test(phone);
      if (!isValidPhone) {
        throw new Error("phone không hợp lệ !!!");
      }
      data.phone = phone;
    }

    if (userName) {
      data.userName = userName;
    }

    const updateResult = await lecturerService.updateLecturer(data);

    res.status(200).json({ Success: updateResult, MS: "Cập nhật thành công" });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const deleteLecturer = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      throw new Error("id không hợp lệ");
    }

    const lecturerDeleteResult = await lecturerService.deleteLecturer(id);

    let newMs = "xóa thất bại";
    if (lecturerDeleteResult) {
      newMs = "Xóa thành công";
    }
    res.status(200).json({ Success: true, MS: newMs });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const getAllLecturer = async (req, res) => {
  try {
    const listLecturer = await lecturerService.getAllLecturer();
    res.status(200).json({
      Success: true,
      DATA: { quantity: listLecturer.length, listLecturer },
    });
  } catch (err) {
    return res.status(400).json({ Success: false, MS: err.message });
  }
};
const getLecturer = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      throw new Error("id không hợp lệ");
    }
    const lecturer = await lecturerService.deleteLecturer(id);

    return res.status(200).json({ Success: true, DATA: lecturer });
  } catch (err) {
    return res.status(400).json({ Success: false, MS: err.message });
  }
};

export default {
  createLecturer,
  updateLecturer,
  getAllLecturer,
  deleteLecturer,
  getLecturer,
};
