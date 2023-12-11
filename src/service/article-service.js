import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getArticleValidation, getAllArticlesValidation } from "../validation/article-validation.js";
import { validate } from "../validation/validation.js";

const getArticle = async (id) => {
    const articleId = validate(getArticleValidation, id);

    const article = await prismaClient.article.findFirst({
        where: {
            article_id: articleId,
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
        throw new ResponseError(404, "Article tidak ditemukan");
    }

    return article;
};

const getAllArticles = async () => {
    const articles = await prismaClient.article.findMany({
        select: {
            article_id: true,
            title: true,
            tag: true,
            content: true,
            author_name: true,
            photo_url: true,
        },
    });

    if (!articles) {
        throw new ResponseError(404, "Tidak ada Article");
    }

    return articles;
};

export default {
    getArticle,
    getAllArticles,
};
