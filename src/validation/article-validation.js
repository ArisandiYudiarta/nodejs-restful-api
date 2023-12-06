import Joi from "joi";

const getArticleValidation = Joi.string().max(50).required();

export { getArticleValidation };
