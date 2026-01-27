import facultyService from "../services/falcutyService.js";
const createFaculty = async (req, res, next) => {
  try {
    const { name, code } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const publicId = req.file ? req.file.filename : null;

    const entity = await facultyService.createFaculty(
      name,
      imageUrl,
      publicId,
      code,
    );
    return res
      .status(201)
      .json({ Success: true, name: entity.name, img_url: entity.img });
  } catch (err) {
    return res.status(400).json({ Success: false, MS: err.message });
  }
};

const patchFaculty = (req, res) => {
  const { code } = req.params;
  const allowedFields = ["name", "status", "img"];
  const data = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      data[field] = req.body[field];
    }
  });
  const result = facultyService.createFaculty(code, data);
};

const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await facultyService.deleteFaculty(id);
    console.log("file facultyController >>>", result);
    res.json({ MS: "Xóa thành công" });
  } catch (err) {}
};

const getAllFaculty = async (req, res) => {
  const data = await facultyService.getAllFaculty();
  return res.status(200).json({ success: true, DT: data });
};

export default { createFaculty, patchFaculty, getAllFaculty, deleteFaculty };
