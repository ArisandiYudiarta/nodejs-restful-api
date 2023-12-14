import Joi from "joi";

const inputFeederValidation = Joi.object({
    id: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
});

const getFeederValidation = Joi.string().email().required();

export { inputFeederValidation, getFeederValidation };
