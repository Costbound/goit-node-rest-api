import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { id: userId } = req.user;
  const contacts = await contactsService.listContacts(userId);
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { id: userId } = req.user;
  const contact = await contactsService.getContactById(userId, contactId);
  if (!contact) return next(HttpError(404, "Not found"));
  res.status(200).json(contact);
};

export const deleteContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { id: userId } = req.user;
  const contact = await contactsService.removeContact(userId, contactId);
  if (!contact) return next(HttpError(404, "Not found"));
  res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const { id: userId } = req.user;
  const newContact = await contactsService.addContact(userId, req.body);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { id: userId } = req.user;
  const updatedContact = await contactsService.updateContact(
    userId,
    contactId,
    req.body,
  );
  if (!updatedContact) return next(HttpError(404, "Not found"));
  res.status(200).json(updatedContact);
};

export const updateStatusContact = async (req, res, next) => {
  const { id: contactId } = req.params;
  const { id: userId } = req.user;
  const { favorite } = req.body;
  const updatedContact = await contactsService.updateStatusContact(
    userId,
    contactId,
    favorite,
  );
  if (!updatedContact) return next(HttpError(404, "Not found"));
  res.status(200).json(updatedContact);
};
