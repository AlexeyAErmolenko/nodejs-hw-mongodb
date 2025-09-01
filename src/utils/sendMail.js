import nodemailer from 'nodemailer';

import createHttpError from 'http-errors';

import ENV_VARS from '../constants/env.js';
import getEnvVar from '../utils/getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar(ENV_VARS.SMTP_HOST),
  port: Number(getEnvVar(ENV_VARS.SMTP_PORT)),
  auth: {
    user: getEnvVar(ENV_VARS.SMTP_USER),
    pass: getEnvVar(ENV_VARS.SMTP_PASSWORD),
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (options) => {
  try {
    return await transporter.sendMail(options);
  } catch (error) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export default sendEmail;
