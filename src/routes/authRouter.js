import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import {
  signUpController,
  signInController,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/register", validateBody(signUpSchema), signUpController);
authRouter.post("/login", validateBody(signInSchema), signInController);

export default authRouter;
