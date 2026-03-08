import HttpError from "../HttpError.js";

const validateVerificationTokenUrlParam = (req, res, next) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    return next(HttpError(400, "Verification token is required"));
  }

  next();
};

export default validateVerificationTokenUrlParam;
