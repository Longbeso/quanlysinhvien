import express from "express";
const app = express();
const port = 3000;
import ConnectDB from "./config/connectDB.js";
import routes from "./routes/index.route.js";
import cors from "cors";
app.use(cors());
// parse JSON
app.use(express.json());

// parse form
app.use(express.urlencoded({ extended: true }));

// connect to db
ConnectDB();
app.use("/v1/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
