import feederService from "../service/feeder-service.js";

const createFeeder = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;

        const result = await feederService.create(user, request);

        res.status(200).json({
            message: "Feeder berhasil ditambahkan!",
            data: result.name,
        });
    } catch (e) {
        next(e);
    }
};

const getFeeder = async (req, res, next) => {
    try {
        const userEmail = req.params.email;

        const result = await feederService.get(userEmail);
        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

export default {
    createFeeder,
    getFeeder,
};
