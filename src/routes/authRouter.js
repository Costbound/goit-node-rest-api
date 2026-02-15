import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import {
  signUpSchema,
  signInSchema,
  updateSubscriptionSchema,
} from "../schemas/authSchemas.js";
import {
  signUpController,
  signInController,
  signOutController,
  getCurrentUserController,
  updateSubscriptionController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", validateBody(signUpSchema), signUpController);
authRouter.post("/login", validateBody(signInSchema), signInController);
authRouter.post("/logout", authenticate, signOutController);
authRouter.get("/current", authenticate, getCurrentUserController);
authRouter.patch(
  "/subscription",
  validateBody(updateSubscriptionSchema),
  authenticate,
  updateSubscriptionController,
);

export default authRouter;
