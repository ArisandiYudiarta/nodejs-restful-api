import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/users", userController.register);
publicRouter.all("/", (req, res, next) => {
    res.status(200).json({ data: "Response Success!" });
});
publicRouter.post("/users/login", userController.login);

export { publicRouter };
