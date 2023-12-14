import Joi from "joi";

const inputScheduleValidation = Joi.object({
    hour: Joi.number().positive().max(100).required(),
    minute: Joi.number().positive().max(100).required(),
    portion: Joi.number().positive().max(500).required(),
    is_active: Joi.boolean().required(),
    feeder_id: Joi.string().max(100).required(),
});

const getScheduleValidation = Joi.string().max(100).required();

const updateScheduleValidation = Joi.object({
    id: Joi.number().positive().required(),
    hour: Joi.number().positive().max(100).required(),
    minute: Joi.number().positive().max(100).required(),
    portion: Joi.number().positive().max(500).required(),
    is_active: Joi.boolean().required(),
    feeder_id: Joi.string().max(100).required(),
});

export { inputScheduleValidation, getScheduleValidation, updateScheduleValidation };
