import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import articleController from "../controller/article-controller.js";
import feederController from "../controller/feeder-controller.js";
import scheduleController from "../controller/schedule-controller.js";

const userRouter = new express.Router();

// User Route
userRouter.use(authMiddleware);
userRouter.get("/users/current", userController.get);
userRouter.delete("/users/logout", userController.logout);

// Article Route
userRouter.get("/article/get/:id", articleController.get);
userRouter.get("/article/getall", articleController.getAll);
userRouter.post("/article/input", articleController.input);

//Feeder Route
userRouter.post("/feeder/input", feederController.createFeeder);
userRouter.get("/feeder/get/", feederController.getFeeder);

//Schedule Route
userRouter.post("/schedule/input", scheduleController.createSchedule);
userRouter.put("/schedule/edit/:schedule_id/:feeder_id", scheduleController.updateSchedule);

export { userRouter };
