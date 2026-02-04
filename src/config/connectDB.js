import { Sequelize } from "sequelize";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const sequelize_MY = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
);

const ConnectDB_mySQL = async () => {
  try {
    await sequelize_MY.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const sequelize_Post = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
// const sequelize_Post = new Sequelize(
//   process.env.database,
//   process.env.user,
//   process.env.password,
//   {
//     host: process.env.host,
//     port: process.env.port,
//     dialect: "postgres",
//   },
// );
// Hàm kết nối
const connectPostgreSQL = async () => {
  try {
    await sequelize_Post.authenticate();
    console.log("✅ Kết nối PostgreSQL thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối PostgreSQL:", error.message);
  }
};

export default { ConnectDB_mySQL, connectPostgreSQL };

// tạo lại dự án khac tren render s
