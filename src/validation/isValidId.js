import Joi from 'joi';

export const idContactSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[a-f0-9]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Id must be a 24-character hexadecimal string!',
      'any.required': 'id is required!',
    }),
});
