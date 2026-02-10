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

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", validateContactIdUrlParam, getOneContact);

contactsRouter.delete("/:id", validateContactIdUrlParam, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id",
  validateContactIdUrlParam,
  validateBody(updateContactSchema),
  updateContact,
);

contactsRouter.patch(
  "/:id/favorite",
  validateContactIdUrlParam,
  validateBody(updateStatusContactSchema),
  updateStatusContact,
);

export default contactsRouter;
