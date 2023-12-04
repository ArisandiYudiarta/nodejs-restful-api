const getArticle = async (req, res, next) => {
    try {
        const email = req.user.email;
        const result = await userService.get(email);
        res.status(200).json({
            error: "false",
            message: result,
        });
    } catch (e) {
        next(e);
    }
};
