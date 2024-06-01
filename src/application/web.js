import express from 'express';
import { publicRouter } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { userRouter } from '../route/api.js';
import 'dotenv/config';

const web = express();
const SECRET_KEY = process.env.SECRET_KEY;
const SENDGRID_API_KEY = process.env.SECRET_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;

web.use(express.json());
// code to use routers below
web.use(publicRouter);
web.use(userRouter);
//error middleware below
web.use(errorMiddleware);

export { web, SECRET_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID };
