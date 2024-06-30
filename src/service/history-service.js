import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { createHistoryValidation, getHistoryValidation } from '../validation/history-validation.js';
import { validate } from '../validation/validation.js';

const create = async (request) => {
    const history = validate(createHistoryValidation, request);

    const feederId = request.feeder_id;

    console.log(feederId);

    const checkIdFeeder = await prismaClient.feeder.findFirst({
        where: {
            id: feederId,
        },
    });

    if (!checkIdFeeder) {
        throw new ResponseError(404, 'Feeder ID tidak ditemukan');
    }

    return prismaClient.history.create({
        data: history,
        select: {
            date_time: true,
            hour: true,
            minute: true,
            portion: true,
            feeder_id: true,
            timezone: true,
        },
    });
};

const get = async (id) => {
    const feederId = validate(getHistoryValidation, id);

    const checkHistory = await prismaClient.history.findFirst({
        where: {
            feeder_id: feederId,
        },
    });

    if (!checkHistory) {
        throw new ResponseError(404, 'Tidak ada history yang ditemukan');
    }

    const history = await prismaClient.history.findMany({
        orderBy: {
            id: 'desc',
        },
        where: {
            feeder_id: feederId,
        },
        select: {
            date_time: true,
            hour: true,
            minute: true,
            portion: true,
            timezone: true,
        },
    });

    return history;
};

export default { create, get };
