import scheduleService from "../service/schedule-service.js";

const createSchedule = async (req, res, next) => {
    try {
        const result = await scheduleService.create(req.body);
        res.status(200).json({
            message: "Schedule successfully created!",
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const getSchedules = async (req, res, next) => {
    try {
        const feederId = req.params.feeder_id;

        const result = await scheduleService.get(feederId);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const updateSchedule = async (req, res, next) => {
    try {
        const scheduleId = req.params.schedule_id;
        const feederId = req.params.feeder_id;

        const request = req.body;

        request.id = scheduleId;
        request.feeder_id = feederId;

        const result = await scheduleService.update(request);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default {
    createSchedule,
    getSchedules,
    updateSchedule,
};
