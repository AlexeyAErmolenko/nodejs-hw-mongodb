import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactsController,
  upsertContactController,
  patchContactController,
  deleteContactByIdController,
} from '../controllers/contacts.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

import validateBody from '../validation/validateBody.js';
import isValidId from '../validation/isValidId.js';
import {
  createContactSchema,
  changeContactSchema,
} from '../validation/ContactsSchemaJoi.js';

const router = Router();

router.use('/:contactId', isValidId);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);

router.put('/:contactId', ctrlWrapper(upsertContactController));

router.patch(
  '/:contactId',
  validateBody(changeContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default router;
