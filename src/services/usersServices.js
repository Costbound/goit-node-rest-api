import { User } from "../db/models/index.js";

export const findUserById = async (id) => {
  return await User.findByPk(id);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const createUser = async ({ email, password }) => {
  return await User.create({ email, password });
};
