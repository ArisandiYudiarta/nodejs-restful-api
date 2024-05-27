import { prismaClient } from '../application/database.js';
import { SECRET_KEY } from '../application/web.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    let decodedToken;

    if (!token) {
        res.status(401)
            .json({
                errors: 'Unauthorized',
            })
            .end();
    } else {
        try {
            decodedToken = jwt.verify(token, SECRET_KEY);

            const user = await prismaClient.user.findFirst({
                where: {
                    email: decodedToken.email,
                },
            });

            if (!user) {
                res.status(401)
                    .json({
                        errors: 'Unauthorized',
                    })
                    .end();
            } else {
                req.user = user;
                next();
            }
        } catch (e) {
            res.status(400)
                .json({
                    errors: 'The JWT token format is malformed or incorrect, make sure to use the correct format',
                })
                .end();
        }
    }
};
