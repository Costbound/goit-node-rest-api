import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateContactIdUrlParam from "../helpers/validation/validateContactIdUrlParam.js";
import validateBody from "../helpers/validation/validateBody.js";
import validateQueryParams from "../helpers/validation/validateQueryParams.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
  getAllContactsParamsSchema,
} from "../schemas/contactsSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get(
  "/",
  validateQueryParams(getAllContactsParamsSchema),
  authenticate,
  getAllContacts,
);

contactsRouter.get(
  "/:id",
  validateContactIdUrlParam,
  authenticate,
  getOneContact,
);

contactsRouter.delete(
  "/:id",
  validateContactIdUrlParam,
  authenticate,
  deleteContact,
);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  authenticate,
  createContact,
);

contactsRouter.put(
  "/:id",
  validateContactIdUrlParam,
  validateBody(updateContactSchema),
  authenticate,
  updateContact,
);

contactsRouter.patch(
  "/:id/favorite",
  validateContactIdUrlParam,
  validateBody(updateStatusContactSchema),
  authenticate,
  updateStatusContact,
);

export default contactsRouter;
