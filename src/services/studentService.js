import DB from "../models/index.cjs";
const createStudent = async (Data) => {
  const user = await DB.User.create({});
};

export default { createStudent };
