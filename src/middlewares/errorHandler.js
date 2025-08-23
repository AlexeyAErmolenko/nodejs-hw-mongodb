import { HttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
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
    return res.status(err.status).json({
      status: err.status,
      message: err.name,
      name: 'Validation error',
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    error: err.message,
  });
};
