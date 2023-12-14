import express from "express";
import userController from "../controller/user-controller.js";
import scheduleController from "../controller/schedule-controller.js";

const publicRouter = new express.Router();

//User Router
publicRouter.post("/users", userController.register);
publicRouter.all("/", (req, res, next) => {
    res.status(200).json({ data: "Response Success!" });
});
publicRouter.post("/users/login", userController.login);

//Schedule Router
publicRouter.get("/schedule/get/:feeder_id", scheduleController.getSchedules);

export { publicRouter };
