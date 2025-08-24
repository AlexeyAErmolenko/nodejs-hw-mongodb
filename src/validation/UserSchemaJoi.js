import Joi from 'joi';

const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.min': 'Min {#limit} characters long.',
    'string.max': 'Max {#limit} characters.',
    'any.required': 'Name is required!',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required!',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required!',
  }),
});
export default registerUserSchema;
