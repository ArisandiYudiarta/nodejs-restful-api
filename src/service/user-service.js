import { validate } from '../validation/validation.js';
import { getUserValidation, loginUserValidation, registerUserValidation } from '../validation/user-validation.js';
import { otpValidation } from '../validation/otp-validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { SECRET_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } from '../application/web.js';
// import { SENDGRID_API_KEY } from '../application/web.js';
// import { sgMail } from '@sendgrid/mail';
import twilio from 'twilio';

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countVerifiedUser = await prismaClient.user.count({
        where: {
            email: user.email,
            status: 'verified',
        },
    });

    const countUnverifiedUser = await prismaClient.user.count({
        where: {
            email: user.email,
            status: 'unverified',
        },
    });
    if (countUnverifiedUser === 1) {
        return 'unverified';
    } else if (countVerifiedUser === 1) {
        throw new ResponseError(400, 'Email Address already exist');
    }

    await sendEmailOtp(user.email);

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            email: true,
            name: true,
        },
    });
};

const sendEmailOtp = async (email) => {
    const accountSid = TWILIO_ACCOUNT_SID;
    const authToken = TWILIO_AUTH_TOKEN;
    const serviceSid = TWILIO_SERVICE_SID;

    const client = twilio(accountSid, authToken);
    try {
        await client.verify.v2.services(serviceSid).verifications.create({
            channelConfiguration: {
                template_id: 'd-e171c5cce5ef4ad9b961714c394e5406',
                from: 'cs@rekanikan.com',
                from_name: 'Rekanikan',
            },
            to: email,
            channel: 'email',
        });
    } catch (e) {
        console.log(e);
        if (e.status === 429 && e.code === 20429) {
            const retryAfter = e.response?.headers['retry-after'];
            console.error('Too many requests. Retry after:', retryAfter);
            throw new ResponseError(429, 'Max check attempts reached. Please try again later after a few minutes', retryAfter);
        } else {
            throw new ResponseError(e.status, e);
        }
    }

    return 1;
    //TODO: THIS CODE BELOW IS WITH SENDGRID ONLY WITHOUT TWILIO

    // sgMail.setApiKey(SENDGRID_API_KEY);
    // const otpKey = Math.floor(100000 + Math.random() * 900000);

    // const msg = {
    //     to: user.email,
    //     from: 'cs@rekanikan.com',
    //     subject: 'Test Email sending with sendgrid',
    //     text: `and easy to do anywhere, even with Node.js, this is your key for rekanikan` + { otpKey },
    //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // };

    // await sgMail
    //     .send(msg)
    //     .then(() => {
    //         console.log('Email sent');
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

    //TODO: somehow user need to send a code here and get validated and we need to receive it

    //end code for otp email
};

//TODO: verify email otp (this part need some work, figure out how to catch all the error so that your app dont break)
const verifyOtp = async (request) => {
    const user = validate(otpValidation, request);

    const accountSid = TWILIO_ACCOUNT_SID;
    const authToken = TWILIO_AUTH_TOKEN;
    const serviceSid = TWILIO_SERVICE_SID;

    try {
        const client = twilio(accountSid, authToken);

        //TODO: return this after making sure that the status changes on the database
        const verificationCheck = await client.verify.v2.services(serviceSid).verificationChecks.create({ to: user.email, code: user.code });

        console.log(verificationCheck);

        if (verificationCheck.status === 'approved') {
            console.log(verificationCheck.status);

            const findUser = await prismaClient.user.count({
                where: {
                    email: user.email,
                },
            });

            console.log(findUser);
            if (findUser !== 1) {
                throw new ResponseError(500, 'user not found');
            }

            try {
                const updatedUser = await prismaClient.user.update({
                    where: {
                        email: user.email,
                        status: 'unverified',
                    },
                    data: {
                        email: user.email,
                        status: 'verified',
                    },
                    select: {
                        email: true,
                        status: true,
                    },
                });

                if (updatedUser) {
                    console.log('Update successful:', updatedUser);
                    return 1;
                } else {
                    console.log('Update failed: No user matched the criteria.');
                    throw new ResponseError(401, 'User credential not found');
                }
            } catch (e) {
                console.error('Error updating user:', e);
                throw new ResponseError(500, 'Failed to update user status.');
            }
        }
    } catch (e) {
        if (e.status === 429 && e.code === 60202) {
            console.error('Max check attempts reached:', e);
            throw new ResponseError(429, 'Max check attempts reached. Please try again later.');
        } else if (e.status === 429 && e.code === 20429) {
            const retryAfter = e.response?.headers['retry-after'];
            console.error('Too many requests. Retry after:', retryAfter);
            throw new ResponseError(429, 'Max check attempts reached. Please try again later after.', retryAfter);
        } else if (e.status === 401) {
            console.log('Incorrect Verification Code:', e);
            throw new ResponseError(401, 'Incorrect Verification Code');
        } else {
            console.error('Error verifying OTP:', e);
            throw new ResponseError(e.status, e);
        }
    }
};

const login = async (request) => {
    //proses validation
    const loginRequest = validate(loginUserValidation, request);
    let token;

    //pengecekan data user
    // TODO: tambahin condition juga cuma akun yang statusnya verified aj bisa login, tambah response errornya juga untuk ini
    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email,
        },
        select: {
            email: true,
            name: true,
            password: true,
        },
    });

    if (!user) {
        throw new ResponseError(401, 'Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    if (!isPasswordValid) {
        throw new ResponseError(401, 'Email or password is incorrect');
    }

    try {
        token = jwt.sign(
            {
                userName: user.name,
                email: user.email,
            },
            SECRET_KEY,
            {
                expiresIn: '1h',
            }
        );
    } catch (e) {
        console.log(e);
        throw new ResponseError(500, 'Faulty at signing Token');
    }

    return token;
};

const get = async (email) => {
    email = validate(getUserValidation, email);

    const user = await prismaClient.user.findUnique({
        where: {
            email: email,
        },
        select: {
            email: true,
            name: true,
        },
    });

    if (!user) {
        throw new ResponseError(404, 'User is not found!');
    }

    return user;
};

const logout = async (email) => {
    email = validate(getUserValidation, email);

    const user = await prismaClient.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        throw new ResponseError(404, 'User is not found');
    }

    return prismaClient.user.update({
        where: {
            email: email,
        },
        data: {
            token: null,
        },
        select: {
            email: true,
        },
    });
};

export default {
    register,
    sendEmailOtp,
    verifyOtp,
    login,
    get,
    logout,
};
