import { MulterError } from "multer";

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof MulterError) {
    const status = [
      "LIMIT_FILE_SIZE",
      "LIMIT_FILE_COUNT",
      "LIMIT_PART_COUNT",
    ].includes(err.code)
      ? 413
      : 400;
    return res.status(status).json({ message: err.message });
  }
  const { status = 500, message = "Server error" } = err;
  res
    .status(status)
    .json({ message: status === 500 ? "Internal Server Error" : message });
};

export default errorHandler;
