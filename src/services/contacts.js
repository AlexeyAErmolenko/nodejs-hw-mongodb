import Contact from '../db/models/contacts.js';
import validateBody from '../validation/validateBody.js';
import {
  createContactSchema,
  changeContactSchema,
} from '../validation/ContactsSchemaJoi.js';

import calculatePaginationData from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId = '',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId }).select(
    '-createdAt -updatedAt',
  );

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.countDocuments(contactsQuery.getFilter()),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (contactId, userId) =>
  Contact.findOne({ _id: contactId, userId: userId }).select(
    '-createdAt -updatedAt',
  );

export const createContact = async (payload) => {
  return await Contact.create(payload);
};

export const updateContact = async (filter, payload, options = {}) => {
  options?.upsert === true
    ? validateBody(createContactSchema)
    : validateBody(changeContactSchema);

  const rawResult = await Contact.findOneAndUpdate(
    { _id: filter._id, userId: filter.userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContactById = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId: userId });
};
