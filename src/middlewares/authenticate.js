import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import { findUserById } from "../services/usersServices.js";

const NOT_AUTHORIZED_ERROR = HttpError(401, "Not authorized");

const authenticate = async (req, _, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(NOT_AUTHORIZED_ERROR);

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) return next(NOT_AUTHORIZED_ERROR);

  let userId;
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    userId = id;
  } catch (err) {
    return next(NOT_AUTHORIZED_ERROR);
  }
  if (!userId) return next(NOT_AUTHORIZED_ERROR);

  const user = await findUserById(userId);
  if (!user || user.token !== token) return next(NOT_AUTHORIZED_ERROR);

  req.user = user;
  next();
};

export default authenticate;
