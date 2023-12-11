import articleService from "../service/article-service.js";

const get = async (req, res, next) => {
    try {
        const articleId = req.params.id;
        // console.log(articleId);
        const result = await articleService.getArticle(articleId);
        res.status(200).json({
            error: "false",
            message: result,
        });
    } catch (e) {
        next(e);
    }
};

const getAll = async (req, res, next) => {
    try {
        const result = await articleService.getAllArticles();
        res.status(200).json({
            error: "false",
            message: result,
        });
    } catch (e) {
        next(e);
    }
};

const input = async (req, res, next) => {
    try {
        const result = await articleService.inputArticle(req.body);
        res.status(200).json({
            error: "false",
            message: "Article successfully created!",
        });
    } catch (e) {
        next(e);
    }
};

export default {
    get,
    getAll,
    input,
};
