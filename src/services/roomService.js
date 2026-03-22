import { where } from "sequelize";
import DB from "../models/index.cjs";

const createRoom = async (data) => {
  const { name, faculty_id, capacity } = data;

  const faculty = await DB.Faculty.findOne({ where: { id: faculty_id } });

  const isContainRoom = await DB.Room.findOne({ where: { name: name.trim() } });

  if (isContainRoom) {
    throw new Error("Room này đã tồn tại");
  }

  if (!faculty) {
    throw new Error("faculty không tồn tại");
  }

  const room = await DB.Room.create({
    name: name.trim(),
    faculty_id,
    capacity,
  });

  return {
    name: room.name,
    faculty: {
      name: faculty.name,
      code: faculty.code,
      id: faculty.id,
    },
    capacity: room.capacity,
  };
};

const getAllRoom = async () => {
  // eager loading
  const allRoom = await DB.Room.findAll({
    include: {
      model: DB.Faculty,
      attributes: ["id", "name", "code"],
    },
  });
  const listRoom = allRoom.map((room) => ({
    id: room.id,
    name: room.name,
    faculty: {
      id: room.Faculty.id,
      name: room.Faculty.name,
      code: room.Faculty.code,
    },
    capacity: room.capacity,
  }));

  return listRoom;
};

const getRoom = async (id) => {
  const room = await DB.Room.findOne({ where: { id } });
  if (!room) {
    throw new Error("room không tồn tại");
  }
  const faculty = await DB.Faculty.findOne({ where: { id: room?.faculty_id } });

  return {
    id: room.id,

    name: room.name,
    faculty: {
      id: faculty.id,
      name: faculty.name,
      code: faculty.code,
    },
  };
};

const deleteRoom = async (id) => {
  const room = await DB.Room.findOne({ where: { id } });

  if (!room) {
    throw new Error("room không tồn tại");
  }

  const resultDelete = await room.destroy();
  console.log("test dữ liệu: ", resultDelete);
  return "xóa thành công";
};

export default { createRoom, getAllRoom, getRoom, deleteRoom };
