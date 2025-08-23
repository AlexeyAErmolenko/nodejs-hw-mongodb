import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Min {#limit} characters long.',
    'string.max': 'Max {#limit} characters.',
    'any.required': 'Name is required!',
  }),

  phoneNumber: Joi.string()
    .length(13)
    .pattern(/^\+\d{12}$/)
    .required()
    .messages({
      'string.length': 'Phone must be exactly {#limit} digits!',
      'string.pattern.base':
        'Phone number must start with a "+" and be followed by 12 digits.',
      'any.required': 'Phone is required!',
    }),

  email: Joi.string().min(3).max(20).email().messages({
    'string.email': 'Email must be a valid email address.',
    'string.min': 'Min {#limit} characters long.',
    'string.max': 'Max {#limit} characters.',
  }),

  isFavourite: Joi.boolean(),

  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.min': 'Min {#limit} characters long.',
      'string.max': 'Max {#limit} characters.',
      'any.required': 'Set contactType for contact!',
    }),
});

export const changeContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Min {#limit} characters long.',
    'string.max': 'Max {#limit} characters.',
  }),

  phoneNumber: Joi.string()
    .length(13)
    .pattern(/^\+\d{12}$/)
    .messages({
      'string.length': 'Phone must be exactly {#limit} digits!',
      'string.pattern.base':
        'Phone number must start with a "+" and be followed by 12 digits.',
    }),

  email: Joi.string().min(3).max(20).email().messages({
    'string.email': 'Email must be a valid email address.',
    'string.min': 'Min {#limit} characters long.',
    'string.max': 'Max {#limit} characters.',
  }),

  isFavourite: Joi.boolean(),

  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .messages({
      'string.min': 'Min {#limit} characters long.',
      'string.max': 'Max {#limit} characters.',
    }),
});
