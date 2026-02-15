import { Sequelize } from "sequelize";
import config from "../config.js";

const {
  database: { host, port, dbName, user, password },
} = config;

const sequelize = new Sequelize(dbName, user, password, {
  dialect: "postgres",
  host,
  port: port || 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const connectDB = async () => {
  // Import models to ensure they are registered with Sequelize
  await import("./models/index.js");
  await sequelize.authenticate();
  if (config.nodeEnv === "development") {
    await sequelize.sync({ alter: true });
  }
  console.log("Database connection successful");
};

export default sequelize;
