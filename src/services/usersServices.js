import { User } from "../db/models/index.js";
import config from "../config.js";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import { AVATARS_DIR_PATH } from "../constants.js";

export const findUserById = async (id) => {
  return await User.findByPk(id);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
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
