import tempService from "../service/temp-service.js";

const createTemperature = async (req, res, next) => {
    try {
        const result = await tempService.create(req.body);
        res.status(200).json({
            message: "Temperature has successfully created",
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const getTemperature = async (req, res, next) => {
    try {
        const feederId = req.params.feeder_id;

        const result = await tempService.get(feederId);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default { createTemperature, getTemperature };
