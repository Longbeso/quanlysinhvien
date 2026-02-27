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
const registerService = async ({ userName, email, passWord, role }) => {
  // validate (email, passWord)

  // kiểm tra xem db role có USER không

  let role_id = 2; // STUDENT 2
  let findRole;
  if (role) {
    findRole = await DB.Role.findOne({
      where: { name: role },
    });
    if (!findRole) {
      // lỗi
      throw new Error("role không hợp lệ");
    } else {
      role_id = findRole?.id;
    }
  } else {
    throw new Error("Role không hợp lệ");
  }

  if (!userName) {
    throw new Error("userName không hợp lệ");
  }

  if (!validateEmail(email)) {
    throw new Error("email không hợp lệ");
  }

  // kiểm tra email đã tồn tại chưa
  const user = await DB.User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error("email này đã tồn tại");
  }

  // validate password
  if (!passWord || passWord.length < 6) {
    throw new Error("Mật khẩu không hợp lệ");
  }

  // hash password
  const saltRounds = 10;
  const hash = await bcrypt.hash(passWord, saltRounds);

  // thêm vào đb
  const newUser = await DB.User.create({
    username: userName,
    email: email,
    role_id,
    password: hash,
  });

  return {
    username: newUser.username,
    email: newUser.email,
    role: findRole.name,
    id: newUser.id,
  };
};

export default registerService;
