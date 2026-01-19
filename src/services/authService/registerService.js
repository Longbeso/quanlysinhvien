import bcrypt from "bcrypt";
import DB from "../../models/index.cjs";
import { AppError } from "../../ultils/appError.js";
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
const registerService = async ({ userName, email, passWord }) => {
  const { User, Role } = DB;
  // validate (email, passWord)

  // kiểm tra xem db role có USER không
  const defaultRole = await Role.findOne({
    where: { name: "USER" },
  });

  // lỗi
  if (!defaultRole) {
    throw new Error("Role USER chưa được khởi tạo");
  }

  if (!validateEmail(email)) {
    throw new Error("email không đúng định dạng!!!");
  }

  // kiểm tra email đã tồn tại chưa
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error("email này đã tồn tại", 409);
  }

  // validate password
  if (!passWord || passWord.length < 6) {
    throw new Error("Mật khẩu phải có ít 6 ký tự", 400);
  }

  // hash password
  const saltRounds = 10;
  const hash = await bcrypt.hash(passWord, saltRounds);

  // thêm vào đb
  const newUser = await User.create({
    username: userName,
    email: email,
    role_id: defaultRole.id,
    password: hash,
  });

  return { username: userName, email: email, role: defaultRole.name };
};

export default registerService;
