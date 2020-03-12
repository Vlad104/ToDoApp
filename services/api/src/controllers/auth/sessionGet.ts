import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { SessionService } from '../../services/SessionService';

export default async function sessionGet(req: Request, res: Response, next: NextFunction) {
    const { cookies } = req;

    if (!cookies || !cookies.sessionId) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);

        return;
    }

    const sessionService = new SessionService();

    try {
        const currentSession = await sessionService.get(cookies.sessionId);
        res.status(HttpStatus.OK).json(currentSession.user);
    } catch (err) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
}
