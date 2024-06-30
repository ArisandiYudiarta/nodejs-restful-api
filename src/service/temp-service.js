import { prismaClient } from '../application/database.js';
import { createTemperatureValidation, getTemperatureValidation } from '../validation/temp-validation.js';
import { validate } from '../validation/validation.js';

const create = async (request) => {
    const temp = validate(createTemperatureValidation, request);

    return prismaClient.temperature.create({
        data: temp,
        select: {
            temperature: true,
            feeder_id: true,
        },
    });
};

const get = async (id) => {
    const FeederId = validate(getTemperatureValidation, id);

    console.log(FeederId);

    const temperature = await prismaClient.temperature.findFirst({
        where: {
            feeder_id: FeederId,
        },
        select: {
            temperature: true,
            feeder_id: true,
        },
    });

    if (!temperature) {
        throw new ResponseError(404, 'Tidak ada Temperature yang ditemukan');
    }

    return temperature;
};

export default { create, get };
