import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import getEnvVar from './utils/getEnvVar.js';
import ENV_VARS from './constants/env.js';

import contactsRouter from './routers/index.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

import cookieParser from 'cookie-parser';

import { UPLOAD_DIR } from './constants/path.js';

import swaggerDocs from './middlewares/swaggerDocs.js';

const startServer = () => {
  const app = express();

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());

  app.use(cookieParser());

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use(contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(getEnvVar(ENV_VARS.PORT, '3001'));
  app.listen(PORT, () => {
    console.log(`Server is running on port `, PORT);
  });
};

export default startServer;
