import { connectDB } from "./db/connect.js";
import { createFolderIfNotExist } from "./helpers/createFolder.js";
import setupExpressServer from "./server.js";
import { AVATARS_DIR_PATH } from "./constants.js";

const bootstrap = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
  await createFolderIfNotExist(AVATARS_DIR_PATH);
  setupExpressServer();
};

bootstrap();
