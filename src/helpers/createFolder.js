import fs from "fs";

export const createFolderIfNotExist = async (folderPath) => {
  try {
    await fs.promises.access(folderPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.promises.mkdir(folderPath, { recursive: true });
    } else {
      throw error;
    }
  }
};
