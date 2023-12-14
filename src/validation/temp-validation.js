import Joi from "joi";

const createTemperatureValidation = Joi.object({
    temperature: Joi.number().max(100).required(),
    feeder_id: Joi.string().max(100).required(),
});

const getTemperatureValidation = Joi.string().required();

export { createTemperatureValidation, getTemperatureValidation };
