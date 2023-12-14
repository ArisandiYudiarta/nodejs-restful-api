import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getFeederValidation, inputFeederValidation } from "../validation/feeder-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {
    const feeder = validate(inputFeederValidation, request);
    feeder.email = user.email;

    const checkIdFeeder = await prismaClient.feeder.count({
        where: {
            id: feeder.id,
        },
    });

    if (checkIdFeeder === 1) {
        throw new ResponseError(400, "ID Feeder Sudah Terpakai");
    }

    return prismaClient.feeder.create({
        data: feeder,
        select: {
            id: true,
            name: true,
        },
    });
};

const get = async (email) => {
    const userEmail = validate(getFeederValidation, email);

    const feeder = await prismaClient.feeder.findFirst({
        where: {
            email: userEmail,
        },
        select: {
            id: true,
            name: true,
        },
    });

    if (!feeder) {
        throw new ResponseError(404, "Tidak ada feeder yang ditemukan");
    }

    return feeder;
};

export default { create, get };
