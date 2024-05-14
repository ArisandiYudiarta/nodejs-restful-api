import express from 'express';
import { publicRouter } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { userRouter } from '../route/api.js';
import 'dotenv/config';

const web = express();
const SECRET_KEY = process.env.SECRET_KEY;

web.use(express.json());
// code to use routers below
web.use(publicRouter);
web.use(userRouter);
//error middleware below
web.use(errorMiddleware);

export { web, SECRET_KEY };
