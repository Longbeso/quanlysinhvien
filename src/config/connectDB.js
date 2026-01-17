import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("quanlysinhvienctu", "root", "Long2006@", {
  host: "localhost",
  dialect: "mysql",
});

const ConnectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default ConnectDB;
