import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import getEnvVar from './utils/getEnvVar.js';
import { ENV_VARS } from './constants/env.js';

import contactsRouter from './routers/index.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use(contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(getEnvVar(ENV_VARS.PORT, '3001'));
  app.listen(PORT, () => {
    console.log(`Server is running on port `, PORT);
  });
};
