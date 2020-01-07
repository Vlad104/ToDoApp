import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { UserService } from '../../services/UserService';

export default async function signin(req: Request, res: Response, next: NextFunction) {
    const { body: { login, password } } = req;

    const userService = new UserService();

    try {
        const user = await userService.getByLogin(login);
        if (!user) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: `user not found`,
            });

            return;
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            const err = {
                code: HttpStatus.UNAUTHORIZED,
                errorObj: {
                    message: 'incorrect password',
                },
            };

            next(err);
        }

        res.sendStatus(HttpStatus.OK);

    } catch (err) {
        console.error(err);
        const error = {
            code: HttpStatus.BAD_REQUEST,
            errorObj: err
        };
        next(error);
    }
}
