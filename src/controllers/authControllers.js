import HttpError from "../helpers/HttpError.js";
import {
  findUserByEmail,
  createUser,
} from "../services/usersServices.js";

export const signUpController = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) return next(HttpError(409, "Email in use"));
  const newUser = await createUser({ email, password });
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
  await user.generateAndSaveToken();

  res.status(200).json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
