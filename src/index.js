import "dotenv/config";
import { connectDB } from "./db/connect.js";
import setupExpressServer from "./server.js";

const bootstrap = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
  setupExpressServer();
};

bootstrap();
