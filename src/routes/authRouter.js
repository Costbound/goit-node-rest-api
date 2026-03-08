import { Router } from "express";
import validateBody from "../helpers/validation/validateBody.js";
import validateVerificationTokenUrlParam from "../helpers/validation/validateVerificationTokenUrlParam.js";
import {
  signUpSchema,
  signInSchema,
  updateSubscriptionSchema,
  sendVerificationEmailSchema,
} from "../schemas/authSchemas.js";
import {
  signUpController,
  signInController,
  signOutController,
  getCurrentUserController,
  updateSubscriptionController,
  updateAvatarController,
  verifyEmailController,
  sendVerificationEmailController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import { uploadAvatar } from "../middlewares/fileUpload.js";

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
authRouter.patch(
  "/avatars",
  authenticate,
  uploadAvatar.single("avatar"),
  updateAvatarController,
);
authRouter.get(
  "/verify/:verificationToken",
  validateVerificationTokenUrlParam,
  verifyEmailController,
);
authRouter.post(
  "/verify",
  validateBody(sendVerificationEmailSchema),
  sendVerificationEmailController,
);

export default authRouter;
