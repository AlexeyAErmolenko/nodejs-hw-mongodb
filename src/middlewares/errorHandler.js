import { HttpError } from 'http-errors';

export const errorHandler = (err, _, res) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    error: err.message,
  });
};
