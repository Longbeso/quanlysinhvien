import DB from "../../models/index.cjs";
import bcrypt from "bcrypt";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const registerAccount = async (req, res) => {
  const { User } = DB;
  const { firstName, lastName, email, passWord } = req.body;
  // validate (email, passWord)
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
    firstName,
    lastName,
    email,
    password: hash,
  });
  return res.json({
    DATA: newUser,
    ErrorCode: 0,
    Message: "Tạo account thành công",
  });
};

export default { registerAccount };
