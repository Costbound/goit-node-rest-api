import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export const listContacts = async () => {
  const rawData = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(rawData);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) ?? null;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(21),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.find((contact) => contact.id === contactId);
  if (!contactToRemove) return null;
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId,
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return contactToRemove;
};

export const updateContact = async (contactId, updatedFields) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId,
  );
  if (contactIndex === -1) return null;
  const updatedContact = { ...contacts[contactIndex], ...updatedFields };
  contacts[contactIndex] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updatedContact;
};
