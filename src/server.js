import express from "express";
import morgan from "morgan";
import cors from "cors";

import config from "./config.js";
import { AVATARS_DIR_PATH } from "./constants.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const setupExpressServer = () => {
  const app = express();

  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());

  app.use(router);
  app.use("/avatars", express.static(AVATARS_DIR_PATH));

  app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use(errorHandler);

  app.listen(config.server.port, () => {
    console.log(
      `Server is running. Use our API on port: ${config.server.port}`,
    );
  });
};
export default setupExpressServer;
