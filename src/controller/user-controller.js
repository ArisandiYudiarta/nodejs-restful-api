import userService from '../service/user-service.js';

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        if (result == 'unverified') {
            res.status(403).json({
                error: 'unverified',
                message: 'User is Unverified, please proceed to the email verification process',
            });
        } else {
            res.status(200).json({
                error: 'false',
                message: 'User Created',
            });
        }
    } catch (e) {
        next(e);
    }
};

const sendOtp = async (req, res, next) => {
    const email = req.params.email;
    console.log(email);
    try {
        const result = await userService.sendEmailOtp(email);
        if (result == 1) {
            res.status(200).json({
                error: 'false',
                message: 'OTP Code is sent, Check the corresponding email',
            });
        }
    } catch (e) {
        next(e);
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const result = await userService.verifyOtp(req.body);
        if (result == 1) {
            res.status(200).json({
                error: 'false',
                message: 'Email is Verified',
            });
        }
    } catch (e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            error: 'false',
            message: 'Login Successfully',
            bearerToken: result,
        });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const email = req.user.email;
        // console.log(email);
        const result = await userService.get(email);
        res.status(200).json({
            error: 'false',
            message: 'Data Retrieved',
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const logout = async (req, res, next) => {
    try {
        // await userService.logout(req.user.email);
        res.status(200).json({
            error: 'false',
            message: 'Berhasil Logout!',
        });
    } catch (e) {
        next(e);
    }
};

export default { register, sendOtp, verifyEmail, login, get, logout };
