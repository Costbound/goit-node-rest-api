import { Contact } from "../db/models/index.js";

export const listContacts = async (userId, options = {}) => {
  const { page = 1, limit = 10 } = options.pagination || {};
  const { onlyFavorites } = options;
  const offset = (page - 1) * limit;
  const where = { owner: userId };
  if (onlyFavorites) {
    where.favorite = true;
  }
  return await Contact.findAll({
    where,
    limit,
    offset,
    order: [["id", "ASC"]],
  });
};

export const getContactById = async (userId, contactId) => {
  return await Contact.findOne({
    where: { id: contactId, owner: userId },
  });
};

export const addContact = async (userId, newContactData) => {
  const createdContact = await Contact.create({
    ...newContactData,
    owner: userId,
  });
  return createdContact;
};

export const removeContact = async (userId, contactId) => {
  const contactToDelete = await Contact.findOne({
    where: { id: contactId, owner: userId },
  });
  if (!contactToDelete) return null;
  await contactToDelete.destroy();
  return contactToDelete;
};

export const updateContact = async (userId, contactId, updatedFields) => {
  const contactToUpdate = await Contact.findOne({
    where: { id: contactId, owner: userId },
  });
  if (!contactToUpdate) return null;
  await contactToUpdate.update(updatedFields);
  return contactToUpdate;
};

export const updateStatusContact = async (userId, contactId, favorite) => {
  const contactToUpdate = await Contact.findOne({
    where: { id: contactId, owner: userId },
  });
  if (!contactToUpdate) return null;
  await contactToUpdate.update({ favorite });
  return contactToUpdate;
};
