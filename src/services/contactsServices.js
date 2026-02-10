import { Contact } from "../db/models/index.js";

export const listContacts = async () => {
  return await Contact.findAll();
};

export const getContactById = async (contactId) => {
  return await Contact.findByPk(contactId);
};

export const addContact = async (newContactData) => {
  const createdContact = await Contact.create(newContactData);
  return createdContact;
};

export const removeContact = async (contactId) => {
  const contactToDelete = await Contact.findByPk(contactId);
  if (!contactToDelete) return null;
  await contactToDelete.destroy();
  return contactToDelete;
};

export const updateContact = async (contactId, updatedFields) => {
  const contactToUpdate = await Contact.findByPk(contactId);
  if (!contactToUpdate) return null;
  await contactToUpdate.update(updatedFields);
  return contactToUpdate;
};

export const updateStatusContact = async (contactId, favorite) => {
  const contactToUpdate = await Contact.findByPk(contactId);
  if (!contactToUpdate) return null;
  await contactToUpdate.update({ favorite });
  return contactToUpdate;
};
