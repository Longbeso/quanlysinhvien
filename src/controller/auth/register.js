import DB from "../../models/index.cjs";
import bcrypt from "bcrypt";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

const registerAccount = async (req, res) => {
  const { User, Role } = DB;
  const { userName, email, passWord } = req.body;
  // validate (email, passWord)

  // kiểm tra xem db role có USER không
  const defaultRole = await Role.findOne({
    where: { name: "USER" },
  });

  // lỗi
  if (!defaultRole) {
    return res.status(500).json({
      ErrorCode: -1,
      ErrorMessage: "Role USER chưa được khởi tạo",
    });
  }

  if (!validateEmail(email)) {
    return res.json({
      success: false,
      message: "Email không đúng định dạng",
      data: {},
    });
  }
  // kiểm tra email đã tồn tại chưa
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return res.json({
      DATA: "",
      ErrorCode: -1,
      ErrorMessage: "email đã tồn tại rồi bạn ơi",
    });
  }

  // validate password
  if (!passWord || passWord.length < 6) {
    return res.json({
      ErrorCode: -1,
      ErrorMessage: "Password phải có ít nhất 6 ký tự",
    });
  }
  // hash password

  // thêm vào đb
  const saltRounds = 10;
  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   bcrypt.hash(passWord, salt, async function (err, hash) {
  //     newUser = await User.create({
  //       firstName,
  //       lastName,
  //       email,
  //       password: hash,
  //     });
  //   });
  // });
  const hash = await bcrypt.hash(passWord, saltRounds);
  const newUser = await User.create({
    username: userName,
    email: email,
    role_id: defaultRole.id,
    password: hash,
  });

  return res.json({
    DATA: { username: userName, email: email, role: defaultRole.name },
    ErrorCode: 0,
    Message: "Tạo account thành công",
  });
};

export default { registerAccount };
