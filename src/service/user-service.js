import { validate } from "../validation/validation.js";
import { getUserValidation, loginUserValidation, registerUserValidation } from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username,
        },
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exist");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
        },
    });
};

const login = async (request) => {
    //proses validation
    const loginRequest = validate(loginUserValidation, request);

    //pengecekan data user
    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username,
        },
        select: {
            username: true,
            password: true,
        },
    });

    //kondisi jika tidak ada
    if (!user) {
        throw new ResponseError(401, "Username or password incorrect");
    }

    //jika ketemu maka akan di cek passnya
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    //jika pass tidak sama/valid
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password incorrect");
    }

    //jika password sesuai maka generate token agar user bisa login
    const token = uuid().toString();
    //simpan token ke database
    return prismaClient.user.update({
        data: {
            token: token,
        },
        where: {
            username: user.username,
        },
        select: {
            token: true,
        },
    });
};

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username,
        },
        select: {
            username: true,
            name: true,
        },
    });

    if (!user) {
        throw new ResponseError(404, "User is not found!");
    }

    return user;
};

const logout = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username,
        },
    });

    if (!user) {
        throw new ResponseError(404, "User is not found");
    }

    return prismaClient.user.update({
        where: {
            username: username,
        },
        data: {
            token: null,
        },
        select: {
            username: true,
        },
    });
};

export default {
    register,
    login,
    get,
    logout,
};