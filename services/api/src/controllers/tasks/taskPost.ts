import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { TaskService } from '../../services/TaskService';

export default async function taskPost(req: Request, res: Response, next: NextFunction) {
    const taskService = new TaskService();

    const task = req.body;
    if (task.id) {
        delete task.id;
    }

    const { user } = res.locals.session;
    task.user = user;

    try {
        const response = await taskService.insert(task);

        res.status(HttpStatus.OK).json(response);
    } catch (err) {
        console.error(err);
        const error = {
            code: HttpStatus.BAD_REQUEST,
            errorObj: err
        };
        return next(error);
    }
}
