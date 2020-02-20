import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { SessionService } from '../../services/SessionService';

export default async function session(req: Request, res: Response, next: NextFunction) {
    const { cookies: sessionId } = req;

    if (!sessionId) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);

        return;
    }

    const sessionService = new SessionService();

    try {
        await sessionService.get(sessionId);
        res.sendStatus(HttpStatus.OK);
    } catch (err) {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
}
