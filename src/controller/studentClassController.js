import studentClassService from "../services/studentClassService.js";

const createStudentClass = async (req, res) => {
  let { name, major_id, code } = req.body;
  name = name.trim();
  code = code.trim();
  try {
    if (!name) {
      throw new Error("name không hợp lệ");
    }
    if (!major_id || Number.isNaN(Number(major_id))) {
      throw new Error("major_id không hợp lệ");
    }
    if (!code) {
      throw new Error("code không hợp lệ");
    }
    const newClass = await studentClassService.createStudentClass({
      name,
      major_id,
      code,
    });
    res.json({ Success: true, Data: newClass });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const getAllStudentClass = async (req, res) => {
  const listStudentClass = await studentClassService.getAllClassStudent();
  res
    .status(200)
    .json({
      Success: true,
      Data: { quantity: listStudentClass.length, listStudentClass },
    });
};

const getStudentClass = async (req, res) => {
  try {
    const id = Number(req?.params?.id?.trim());
    if (isNaN(id)) {
      throw new Error("id không hợp lệ");
    }
    const studentClass = await studentClassService.getStudentClass(id);
    res.status(200).json({ Success: true, Data: studentClass });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const updataStudentClass = async (req, res) => {
  try {
    const isAccept = ["name", "code", "status"];
    let dataUpdate = {};
    let data = req.body;
    isAccept.forEach((field) => {
      if (data[field]) {
        dataUpdate[field] = data[field];
      }
    });

    const id = Number(req?.params?.id);
    if (isNaN(id)) {
      throw new Error("id không hợp lệ");
    }

    if (
      dataUpdate["status"] &&
      (isNaN(Number(dataUpdate["status"])) ||
        (Number(dataUpdate["status"]) !== 0 &&
          Number(dataUpdate["status"]) !== 1))
    ) {
      throw new Error("status không hợp lệ");
    }

    const result = await studentClassService.updataStudentClass({
      id,
      ...dataUpdate,
    });
    res.status(200).json({ Success: true, MS: "cập nhật thành công", result });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const deleteStudentClass = async (req, res) => {
  try {
    const id = req?.params?.id;
    if (isNaN(Number(id))) {
      throw new Error("id không hợp lệ");
    }

    const studentClass = await studentClassService.deleteStudentClass(id);
    res.status(200).json({ Success: true, DT: studentClass });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

export default {
  createStudentClass,
  getAllStudentClass,
  getStudentClass,
  updataStudentClass,
  deleteStudentClass,
};
