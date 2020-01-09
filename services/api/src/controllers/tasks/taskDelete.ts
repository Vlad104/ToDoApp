import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { TaskService } from '../../services/TaskService';

export default async function taskDelete(req: Request, res: Response, next: NextFunction) {
    const taskId = parseInt(req.params.id, 10);

    const taskService = new TaskService();

    try {
        await taskService.deleteById(taskId);

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
