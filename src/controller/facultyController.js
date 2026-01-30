import facultyService from "../services/falcutyService.js";
const createFaculty = async (req, res, next) => {
  try {
    const { name, code } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const publicId = req.file ? req.file.filename : null;

    const faculty = await facultyService.createFaculty(
      name,
      imageUrl,
      publicId,
      code,
    );
    return res.status(201).json({ Success: true, Data: faculty });
  } catch (err) {
    return res.status(400).json({ Success: false, MS: err.message });
  }
};

// const patchFaculty = async (req, res) => {
//   // res.json({ ms: "ok", data });
//   try {
//     const result = await facultyService.updateFaculty(req);
//     if (result) {
//       res.json({ kq: result });
//     } else {
//       res.json("loi");
//     }
//   } catch (err) {
//     res.json({ ER: err.message });
//   }
// };

const patchFaculty = async (req, res) => {
  try {
    const faculty = await facultyService.updateFaculty(req);
    return res.status(200).json({
      success: true,
      // data: faculty.get({ plain: true }),
      data: faculty,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
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
  try {
    const data = await facultyService.getAllFaculty();
    return res.status(200).json({ success: true, DT: data });
  } catch (err) {
    return res.status(400).json({ Success: false, MS: err.message });
  }
};
const getFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await facultyService.getFaculty(id);
    return res.status(200).json({ success: true, DT: data });
  } catch (err) {
    return res.status(400).json({ Success: false, MS: err.message });
  }
};

export default {
  createFaculty,
  patchFaculty,
  getAllFaculty,
  deleteFaculty,
  getFaculty,
};
