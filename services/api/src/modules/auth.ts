import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { SessionService } from '../services/SessionService';

export default async function auth(req: Request, res: Response, next: NextFunction) {
    const { cookies } = req;

    if (!cookies || !cookies.sessionId) {
        return next(new Error('No session id'));
    }

    const sessionId: string = cookies.sessionId;
    const sessionService = new SessionService();

    try {
        const session = await sessionService.get(sessionId);
        await sessionService.update(session);
        res.locals.session = session;
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
