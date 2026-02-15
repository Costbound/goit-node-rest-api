import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateContactIdUrlParam from "../helpers/validateContactIdUrlParam.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import validateGetContactsQueryParams from "../helpers/validateGetContactsQueryParams.js";

const contactsRouter = express.Router();

contactsRouter.get(
  "/",
  validateGetContactsQueryParams,
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
