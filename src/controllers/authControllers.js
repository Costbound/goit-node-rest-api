import HttpError from "../helpers/HttpError.js";
import {
  findUserByEmail,
  createUser,
  updateUserAvatar,
  verifyUserEmail,
  sendVerificationEmail,
} from "../services/usersServices.js";
import fs from "fs/promises";

export const signUpController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) return next(HttpError(409, "Email in use"));
  const newUser = await createUser({ email, password });
  try {
    await sendVerificationEmail(newUser);
  } catch (error) {
    console.log("Failed to send verification email:", error);
  }
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export const signInController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await user.validatePassword(password)))
    return next(HttpError(401, "Email or password is wrong"));
  if (!user.verify) return next(HttpError(403, "Email not verified"));
  await user.generateToken();

  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export const signOutController = async (req, res) => {
  const { user } = req;
  await user.deleteToken();
  res.status(204).send();
};

export const getCurrentUserController = async (req, res) => {
  const { user } = req;
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

export const updateSubscriptionController = async (req, res, next) => {
  const { subscription } = req.body;
  const { user } = req;
  user.subscription = subscription;
  await user.save();
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

export const updateAvatarController = async (req, res, next) => {
  const { user, file } = req;
  if (!file) return next(HttpError(400, "Avatar file is required"));

  try {
    const updatedUser = await updateUserAvatar(user, file);
    res.status(200).json({ avatarURL: updatedUser.avatarURL });
  } catch (error) {
    if (file && file.path) {
      await fs.unlink(file.path);
    }
    next(error);
  }
};

export const verifyEmailController = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await verifyUserEmail(verificationToken);
  if (!user) return next(HttpError(404, "User not found"));
  res.status(200).json({ message: "Verification successful" });
};

export const sendVerificationEmailController = async (req, res, next) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return next(HttpError(404, "User not found"));
  if (user.verify)
    return next(HttpError(400, "Verification has already been passed"));
  try {
    await sendVerificationEmail(user);
  } catch (error) {
    console.log("Failed to send verification email:", error);
  }
  res.status(200).json({ message: "Verification email sent" });
};
