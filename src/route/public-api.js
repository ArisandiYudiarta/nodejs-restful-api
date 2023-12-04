import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/users", userController.register);
publicRouter.all("/", (req, res, next) => {
    res.status(200).json({ data: "Response Success!" });
});
// TODO: implement and test the untested response below if the user reqeust other than POST method for above endpoint
// publicRouter.all("/api/users", (req, res, next) => {
//     // Custom response for unsupported methods
//     res.status(405).json({ error: "Method Not Allowed", allowedMethods: ["POST"] });
//   });
publicRouter.post("/users/login", userController.login);

export { publicRouter };
