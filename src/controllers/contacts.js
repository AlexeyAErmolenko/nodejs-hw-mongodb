import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContactById,
} from '../services/contacts.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';

import parseSortParams from '../utils/parseSortParams.js';

import parseFilterParams from '../utils/parseFilterParams.js';

const contactNotFound = () => createHttpError(404, 'Contact not found');

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user.id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user.id;

  const contact = await getContactById(contactId, userId);
  if (!contact) {
    throw contactNotFound();
  }

  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactsController = async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user.id,
  };
  const contact = await createContact(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  const filter = {
    _id: contactId,
    userId,
  };
  const result = await updateContact(filter, req.body, {
    upsert: true,
  });
  if (!result) {
    throw contactNotFound();
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  const filter = {
    _id: contactId,
    userId,
  };
  const result = await updateContact(filter, req.body);

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  const contact = await deleteContactById(contactId, userId);
  if (!contact) {
    throw contactNotFound();
  }

  res.status(204).send();
};
