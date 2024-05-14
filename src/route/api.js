import express from 'express';
import userController from '../controller/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
import articleController from '../controller/article-controller.js';
import feederController from '../controller/feeder-controller.js';
import scheduleController from '../controller/schedule-controller.js';

const userRouter = new express.Router();

//telling this router to use the auth middleware (confirming the token);
userRouter.use(authMiddleware);

// User Route
userRouter.get('/users/current', userController.get);
userRouter.delete('/users/logout', userController.logout);

// Article Route
userRouter.get('/article/get/:id', articleController.get);
userRouter.get('/article/getall', articleController.getAll);
userRouter.post('/article/input', articleController.input);
userRouter.delete('/article/delete/:id_article', articleController.remove);

//Feeder Route
userRouter.post('/feeder/input', feederController.createFeeder);
userRouter.get('/feeder/get/', feederController.getFeeder);
userRouter.get('/feeder/get/first/', feederController.getFirstFeeder);

//Schedule Route
userRouter.post('/schedule/input', scheduleController.createSchedule);
userRouter.put('/schedule/edit/:schedule_id/:feeder_id', scheduleController.updateSchedule);
userRouter.delete('/schedule/delete/:schedule_id/:feeder_id', scheduleController.deleteSchedule);

export { userRouter };
