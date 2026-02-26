import { Router } from "express";
import contactsRouter from "./contactsRouter.js";
import authRouter from "./authRouter.js";

const router = new Router();

router.use("/api/contacts", contactsRouter);
router.use("/api/auth", authRouter);

export default router;
