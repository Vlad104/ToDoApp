import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { SessionService } from '../../services/SessionService';

export default async function sessionDelete(req: Request, res: Response, next: NextFunction) {
    const { cookies } = req;

    if (!cookies || !cookies.sessionId) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);

        return;
    }

    const sessionService = new SessionService();

    try {
        await sessionService.delete(cookies.sessionId);
        res.clearCookie('sessionId');
        res.sendStatus(HttpStatus.OK);
    } catch (err) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
}
