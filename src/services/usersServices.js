import { User } from "../db/models/index.js";
import config from "../config.js";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import { AVATARS_DIR_PATH } from "../constants.js";
import { nanoid } from "nanoid";
import { sendEmail } from "../utils/emailUtil.js";

export const findUserById = async (id) => {
  return await User.findByPk(id);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const findUserByVerificationToken = async (verificationToken) => {
  return await User.findOne({ where: { verificationToken } });
};

export const createUser = async ({ email, password }) => {
  return await User.create({
    email,
    password,
    avatarURL: gravatar.url(email),
  });
};

export const updateUserAvatar = async (user, file) => {
  const ext = path.extname(file.originalname);
  const randomStr = Math.random().toString(36).substring(2, 8);
  const avatarFilename = `${Date.now()}_${randomStr}${ext}`;
  const avatarPath = path.join(AVATARS_DIR_PATH, avatarFilename);

  await fs.rename(file.path, avatarPath);
  user.avatarURL = `http://${config.server.host}:${config.server.port}/avatars/${avatarFilename}`;
  await user.save();
  return user;
};

export const verifyUserEmail = async (verificationToken) => {
  const user = await findUserByVerificationToken(verificationToken);
  if (!user) return null;

  user.verify = true;
  user.verificationToken = null;
  await user.save();
  return user;
};

const generateUserVerificationToken = async (user) => {
  user.verificationToken = nanoid(32);
  await user.save();
  return user.verificationToken;
};

export const sendVerificationEmail = async (user) => {
  await generateUserVerificationToken(user);
  const verificationLink = `http://${config.server.host}:${config.server.port}/api/auth/verify/${user.verificationToken}`;
  await sendEmail({
    from: config.smtpServer.from,
    to: user.email,
    subject: "Email Verification",
    text: `Please verify your email by clicking the following link: ${verificationLink}`,
  });
};
