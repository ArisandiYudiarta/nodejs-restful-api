import Joi from "joi";

const getArticleValidation = Joi.number().required();
const inputArticleValidation = Joi.object({
    title: Joi.string().max(100).required(),
    tag: Joi.string().max(50).required(),
    content: Joi.string().max(300).required(),
    author_name: Joi.string().max(100).required(),
    photo_url: Joi.string().max(300).required(),
});

export { getArticleValidation, inputArticleValidation };
