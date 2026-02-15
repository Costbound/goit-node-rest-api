import HttpError from "./HttpError.js";

const validateGetContactsQueryParams = (req, _, next) => {
  const { page, limit, favorite } = req.query;

  if (!page && !limit && !favorite) return next();

  if (page) {
    const pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return next(
        HttpError(400, "Page query parameter must be a positive integer"),
      );
    }
  }
  if (limit) {
    const limitNum = Number(limit);
    if (isNaN(limitNum) || limitNum < 1) {
      return next(
        HttpError(400, "Limit query parameter must be a positive integer"),
      );
    }
  }

  if (favorite !== undefined) {
    if (favorite !== "true" && favorite !== "false")
      return next(
        HttpError(400, "Favorite query parameter must be 'true' or 'false'"),
      );
  }

  next();
};

export default validateGetContactsQueryParams;
