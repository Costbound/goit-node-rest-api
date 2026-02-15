import HttpError from "./HttpError.js";

const validateQueryParams = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateQueryParams;
