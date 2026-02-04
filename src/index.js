import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT;
import ConnectDB from "./config/connectDB.js";
import cors from "cors";
import indexRouter from "./routes/index.route.js";
app.use(cors());
// parse JSON
app.use(express.json());

// parse form
app.use(express.urlencoded({ extended: true }));

// connect to db
// ConnectDB.ConnectDB_mySQL();
ConnectDB.connectPostgreSQL();
indexRouter(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
