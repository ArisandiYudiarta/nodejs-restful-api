import Joi from "joi";

const getArticleValidation = Joi.number().required();
const getAllArticlesValidation = Joi.any();

export { getArticleValidation, getAllArticlesValidation };
