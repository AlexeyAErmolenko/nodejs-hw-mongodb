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

import upload from '../middlewares/multer.js';

const router = Router();

router.use('/:contactId', isValidId);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);

router.put(
  '/:contactId',
  upload.single('photo'),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(changeContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default router;
