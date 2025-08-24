import { MongooseError } from 'mongoose';
import { isHttpError } from 'http-errors';

const errorHandler = (err, req, res, next) => {
  const {
    status = 500,
    message = 'Internal Server Error',
    name = 'ServerError',
  } = err;

  if (isHttpError(err)) {
    return res.status(status).json({
      status,
      message,
      data: err.data,
    });
  }

  if (err instanceof MongooseError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.name,
      name: 'Mongoose error',
    });
  }

  if (err.isJoi) {
    return res.status(400).json({
      status: 400,
      message: 'Bad Request',
      data: err.details,
    });
  }

  res.status(status).json({
    status,
    message,
    name,
  });
};

export default errorHandler;
