import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { SessionService } from '../services/SessionService';

export default async function auth(req: Request, res: Response, next: NextFunction) {
    const { cookies } = req;

    if (!cookies) {
        return next(new Error('No session id'));
    }

    const sessionId: string = cookies.sessionId;

    const userService = new SessionService();

    try {
        const user = await userService.get(sessionId);
        await userService.update(user);
        res.locals.user = user;
        next();
    } catch (err) {
        console.error(err);
        const error = {
            code: HttpStatus.UNAUTHORIZED,
            errorObj: err
        };
        return next(error);
    }
}
