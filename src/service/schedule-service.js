import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getScheduleValidation, inputScheduleValidation, updateScheduleValidation } from "../validation/schedule-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
    const schedule = validate(inputScheduleValidation, request);

    const checkIdFeeder = await prismaClient.feeder.count({
        where: {
            id: schedule.feeder_id,
        },
    });

    if (checkIdFeeder != 1) {
        throw new ResponseError(400, "ID feeder tidak valid!");
    }

    return prismaClient.schedule.create({
        data: schedule,
        select: {
            hour: true,
            minute: true,
            portion: true,
            is_active: true,
            feeder_id: true,
        },
    });
};

const get = async (id) => {
    const feederId = validate(getScheduleValidation, id);

    const checkSchedule = await prismaClient.schedule.findFirst({
        where: {
            feeder_id: feederId,
        },
    });

    if (!checkSchedule) {
        throw new ResponseError(404, "Tidak ada schedule yang ditemukan");
    }

    const schedules = await prismaClient.schedule.findMany({
        where: {
            feeder_id: feederId,
        },
        select: {
            id: true,
            hour: true,
            minute: true,
            portion: true,
            is_active: true,
        },
    });

    return schedules;
};

const update = async (request) => {
    const schedule = validate(updateScheduleValidation, request);

    const totalScheduleInDatabase = await prismaClient.schedule.count({
        where: {
            id: schedule.id,
            feeder_id: schedule.feeder_id,
        },
    });

    if (totalScheduleInDatabase !== 1) {
        throw new ResponseError(404, "Schedule tidak ditemukan");
    }

    return prismaClient.schedule.update({
        where: {
            id: schedule.id,
        },
        data: {
            hour: schedule.hour,
            minute: schedule.minute,
            portion: schedule.portion,
            is_active: schedule.is_active,
        },
        select: {
            id: true,
            hour: true,
            minute: true,
            portion: true,
            is_active: true,
            feeder_id: true,
        },
    });
};

export default {
    create,
    get,
    update,
};
