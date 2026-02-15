import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import {
  signUpController,
  signInController,
  signOutController,
  getCurrentUserController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", validateBody(signUpSchema), signUpController);
authRouter.post("/login", validateBody(signInSchema), signInController);
authRouter.post("/logout", authenticate, signOutController);
authRouter.get("/current", authenticate, getCurrentUserController);

export default authRouter;
