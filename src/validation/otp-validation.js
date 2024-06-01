import Joi from 'joi';

const otpValidation = Joi.object({
    email: Joi.string().max(100).required(),
    code: Joi.string().max(6).required(),
});

export { otpValidation };
