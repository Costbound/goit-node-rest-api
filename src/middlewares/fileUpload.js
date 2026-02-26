import multer from "multer";
import { TEMP_DIR_PATH } from "../constants.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

export const uploadAvatar = multer({ storage });
