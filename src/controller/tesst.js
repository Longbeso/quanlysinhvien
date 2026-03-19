import DB from "../models/index.cjs";

const showUser = (req, res) => {
  const listUser = DB.User.findAll({});

  console.log("Test listUser ", listUser);

  res.status(200).json({ listUser });
};

export default { showUser };
