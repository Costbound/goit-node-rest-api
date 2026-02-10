import HttpError from "./HttpError.js";

const validateContactIdUrlParam = (req, res, next) => {
  const { id: contactId } = req.params;

  if (!contactId) {
    return next(HttpError(400, "Contact ID is required"));
  }

  const contactIdNum = Number(contactId);

  if (!Number.isInteger(contactIdNum) || contactIdNum <= 0) {
    return next(HttpError(400, "Invalid contact ID format"));
  }

  next();
};

export default validateContactIdUrlParam;
