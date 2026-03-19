import express from "express";
const longRouter = express.Router();
import DB from "../models/index.cjs";

longRouter.get("/", async (req, res) => {
  const listUser = await DB.User.findAll({});

  console.log("Test listUser ", listUser);

  await DB.User.destroy({
    where: {
      role_id: 3,
    },
  });

  res.status(200).json({ listUser });
});
export default longRouter;
