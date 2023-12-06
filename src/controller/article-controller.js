import articleService from "../service/article-service.js";

const getArticle = async (req, res, next) => {
    try {
        const articleTag = req.body.tag;
        console.log(articleTag);
        const result = await articleService.getArticle(articleTag);
        res.status(200).json({
            error: "false",
            message: result,
        });
    } catch (e) {
        next(e);
    }
};

export default {
    getArticle,
};
