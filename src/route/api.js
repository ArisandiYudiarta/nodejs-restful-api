import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import articleController from "../controller/article-controller.js";

const userRouter = new express.Router();

// User Route
userRouter.use(authMiddleware);
userRouter.get("/users/current", userController.get);
userRouter.delete("/users/logout", userController.logout);
// TODO: implement and test the untested response below if the user reqeust other than POST method for above endpoint
// userRouter.all("/api/users", (req, res, next) => {
//     // Custom response for unsupported methods
//     res.status(405).json({ error: "Method Not Allowed", allowedMethods: ["POST"] });
//   });

// Article Route
userRouter.get("/article/get", articleController.getArticle);

export { userRouter };
