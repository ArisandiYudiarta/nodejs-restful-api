import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getArticleValidation } from "../validation/article-validation.js";
import { validate } from "../validation/validation.js";

const getArticle = async (tag) => {
    const articleTag = validate(getArticleValidation, tag);

    const article = await prismaClient.article.findFirst({
        where: {
            tag: articleTag,
        },
        select: {
            article_id: true,
            title: true,
            tag: true,
            content: true,
            author_name: true,
            photo_url: true,
        },
    });

    if (!article) {
        throw new ResponseError(404, "Contact tidak ditemukan");
    }

    return article;
};

export default {
    getArticle,
};
