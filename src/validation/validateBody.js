import Joi from 'joi';

// "name": "Dmytro Boykov",
// "phoneNumber": "+380000000002",
// "email": null,
// "isFavourite": false,
// "contactType": "personal",
export const createContactSchema = Joi.object({
  name: Joi.string().min(5).max(20).required().messages({
    'string.min': 'Min 5 characters long.',
    'string.max': 'Max 20 characters.',
    'any.required': 'Name is required!',
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required!',
  }),

  phone: Joi.string().length(10).pattern(/^\d+$/).required().messages({
    'string.length': 'Phone must be exactly 10 digits!',
    'string.pattern.base': 'Phone only digits!',
    'any.required': 'Phone is required!',
  }),
  favorite: Joi.boolean(),
});
