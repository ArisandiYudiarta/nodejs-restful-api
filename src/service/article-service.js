import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getArticleValidation, inputArticleValidation } from "../validation/article-validation.js";
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

const inputArticle = async (input) => {
    const article = validate(inputArticleValidation, input);
    console.log(article);
    const checkTitle = await prismaClient.article.count({
        where: {
            title: article.title,
        },
    });

    if (checkTitle === 1) {
        throw new ResponseError(400, "The title you inserted has already been taken");
    }

    return prismaClient.article.create({
        data: article,
        select: {
            title: true,
            tag: true,
            content: true,
            author_name: true,
            photo_url: true,
        },
    });
};

export default {
    getArticle,
    getAllArticles,
    inputArticle,
};
