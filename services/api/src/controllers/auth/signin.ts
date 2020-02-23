import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { SessionService } from '../../services/SessionService';
import { UserService } from '../../services/UserService';

export default async function signin(req: Request, res: Response, next: NextFunction) {
    const { body: { login, password } } = req;

    const userService = new UserService();

    try {
        const user = await userService.get(login);
        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            const err = {
                code: HttpStatus.UNAUTHORIZED,
                errorObj: {
                    message: 'incorrect password',
                },
            };

            return next(err);
        }

        const sessionService = new SessionService();
        const session = await sessionService.insert({ user });
        res.cookie('sessionId', session.id, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.sendStatus(HttpStatus.OK);

    } catch (err) {
        console.error(err);
        const error = {
            code: HttpStatus.BAD_REQUEST,
            errorObj: err
        };
        return next(error);
    }
}
