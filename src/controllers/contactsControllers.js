import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) return next(HttpError(404, "Not found"));
  res.status(200).json(contact);
};

export const deleteContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const contact = await contactsService.removeContact(contactId);
  if (!contact) return next(HttpError(404, "Not found"));
  res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
    req.body,
  );
  if (!updatedContact) return next(HttpError(404, "Not found"));
  res.status(200).json(updatedContact);
};

export const updateStatusContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { favorite } = req.body;
  const updatedContact = await contactsService.updateStatusContact(
    contactId,
    favorite,
  );
  if (!updatedContact) return next(HttpError(404, "Not found"));
  res.status(200).json(updatedContact);
};
