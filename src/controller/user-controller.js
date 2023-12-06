import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            error: "false",
            message: "User Created",
            // data: result,
        });
    } catch (e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            error: "false",
            message: "Login Successfully",
            loginResult: result,
        });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const email = req.user.email;
        console.log(email);
        const result = await userService.get(email);
        res.status(200).json({
            error: "false",
            message: "Data Retrieved",
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.email);
        res.status(200).json({
            error: "false",
            message: "Berhasil Logout!",
        });
    } catch (e) {
        next(e);
    }
};

export default { register, login, get, logout };
