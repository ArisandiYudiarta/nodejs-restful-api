import express from "express";
import userController from "../controller/user-controller.js";
import scheduleController from "../controller/schedule-controller.js";
import historyController from "../controller/history-controller.js";
import tempController from "../controller/temp-controller.js";

const publicRouter = new express.Router();

//User Router
publicRouter.post("/users", userController.register);
publicRouter.all("/", (req, res, next) => {
    res.status(200).json({ data: "Response Success!" });
});
publicRouter.post("/users/login", userController.login);

//Schedule Router
publicRouter.get("/schedule/get/:feeder_id", scheduleController.getSchedules);

//History Router
publicRouter.post("/history/input", historyController.createHistory);
publicRouter.get("/history/get/:feeder_id", historyController.getHistory);

//Temperature Router
publicRouter.post("/temperature/input", tempController.createTemperature);
publicRouter.get("/temperature/get/:feeder_id", tempController.getTemperature);

export { publicRouter };
