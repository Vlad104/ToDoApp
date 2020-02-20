import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { SessionService } from '../../services/SessionService';
import { UserService } from '../../services/UserService';

export default async function signup(req: Request, res: Response, next: NextFunction) {
    const { body: user } = req;

    const userService = new UserService();

    try {
        await userService.insert(user);
        if (!user) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: `user create error`,
            });

            return;
        }

        const sessionService = new SessionService();
        const session = await sessionService.insert({ user });
        res.cookie('sessionId', session.id, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.sendStatus(HttpStatus.OK);

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
