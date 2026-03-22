import roomService from "../services/roomService.js";

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    const faculty_id = Number(req.body.faculty_id);
    const capacity = Number(req.body.capacity);

    if (!name.trim()) {
      throw new Error("name không được rỗng");
    }

    if (isNaN(Number(faculty_id)) || faculty_id <= 0) {
      throw new Error("faculty_id không hợp lệ");
    }

    if (isNaN(Number(capacity)) || capacity <= 0) {
      throw new Error("capacity không hợp lệ");
    }

    const room = await roomService.createRoom({ name, faculty_id, capacity });
    res.status(200).json({ Success: true, room });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const getAllRoom = async (req, res) => {
  try {
    const listRoom = await roomService.getAllRoom();
    res.status(200).json({ Success: true, listRoom });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const getRoom = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id < 0) {
      throw new Error("id không hợp lệ");
    }
    const room = await roomService.getRoom(id);
    res.status(200).json({ Success: true, room });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id < 0) {
      throw new Error("id không hợp lệ");
    }

    const roomDelete = await roomService.deleteRoom(id);

    res.status(200).json({ Success: true, MS: roomDelete });
  } catch (err) {
    res.status(400).json({ Success: false, MS: err.message });
  }
};
export default { createRoom, getAllRoom, getRoom, deleteRoom };
