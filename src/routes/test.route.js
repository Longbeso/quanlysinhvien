import express from "express";
const testRouter = express.Router();

testRouter.use("/test", (req, res) => {
  return res.json({ MS: "success" });
});

export default testRouter;
