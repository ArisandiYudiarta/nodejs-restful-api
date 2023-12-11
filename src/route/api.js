import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import articleController from "../controller/article-controller.js";

const userRouter = new express.Router();

// User Route
userRouter.use(authMiddleware);
userRouter.get("/users/current", userController.get);
userRouter.delete("/users/logout", userController.logout);

// Article Route
userRouter.get("/article/get/:id", articleController.get);
userRouter.get("/article/getall", articleController.getAll);

export { userRouter };
