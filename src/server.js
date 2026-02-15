import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
import config from "./config.js";

const setupExpressServer = () => {
  const app = express();

  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.use("/api/contacts", contactsRouter);

  app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
  });

  app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res
      .status(status)
      .json({ message: status === 500 ? "Internal Server Error" : message });
  });

  app.listen(config.port || 3000, () => {
    console.log(
      `Server is running. Use our API on port: ${config.port || 3000}`,
    );
  });
};
export default setupExpressServer;
