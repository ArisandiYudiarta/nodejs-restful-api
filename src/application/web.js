import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";

const web = express();
web.use(express.json());
// code to use routers below
web.use(publicRouter);
web.use(userRouter);
//error middleware below
web.use(errorMiddleware);

export { web };
