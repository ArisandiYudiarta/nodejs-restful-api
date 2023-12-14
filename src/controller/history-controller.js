import { prismaClient } from "../application/database.js";
import historyService from "../service/history-service.js";

const createHistory = async (req, res, next) => {
    try {
        const result = await historyService.create(req.body);
        res.status(200).json({
            message: "History Created",
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const getHistory = async (req, res, next) => {
    try {
        const feederId = req.params.feeder_id;

        const result = await historyService.get(feederId);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default { createHistory, getHistory };
