import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

const web = express();
web.use(express.json());
// code to use routers below
web.use(publicRouter);
//error middleware below
web.use(errorMiddleware);

export { web };
