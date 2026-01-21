import express from "express";
const longRouter = express.Router();

longRouter.post("/long", (req, res) => {
  return res.json({ ms: "Long ne" });
});
export default longRouter;
