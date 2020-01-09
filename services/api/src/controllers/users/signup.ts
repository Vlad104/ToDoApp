import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

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
