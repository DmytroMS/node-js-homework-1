const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const getContactsList = await listContacts();
    const result = getContactsList.find(
      (item) => item.id === String(contactId)
    );
    console.table(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const removeContactById = contactsList.filter(contact => contact.id !== String(contactId));
    await fs.writeFile(
      contactsPath,
      JSON.stringify(removeContactById, null, 2)
    );
    return console.table(removeContactById);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };
  try {
    const newContactList = await listContacts();
    newContactList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
    return console.table(newContact);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
