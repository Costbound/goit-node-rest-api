import HttpError from "./HttpError.js";

const validateContactIdUrlParam = (req, res, next) => {
  const { id: contactId } = req.params;

  if (!contactId) {
    return next(HttpError(400, "Contact ID is required"));
  }

  const nanoidPattern = /^[A-Za-z0-9_-]{21}$/;

  if (!nanoidPattern.test(contactId)) {
    return next(HttpError(400, "Invalid contact ID format"));
  }

  next();
};

export default validateContactIdUrlParam;
