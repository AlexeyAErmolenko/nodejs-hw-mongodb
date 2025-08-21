import { Router } from 'express';

import {
  getContactsController,
  getContactByIdController,
  createContactsController,
  upsertContactController,
  patchContactController,
  deleteContactByIdController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactsController));

router.put('/:contactId', ctrlWrapper(upsertContactController));

router.patch('/:contactId', ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default router;
