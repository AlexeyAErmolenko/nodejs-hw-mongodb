import createHttpError from 'http-errors';

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(createHttpError(400, 'Bad Request', { errors: error.details }));
  }
};
export default validateBody;
