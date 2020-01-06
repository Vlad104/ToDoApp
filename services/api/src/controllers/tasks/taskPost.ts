import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { TaskService } from '../../services/TaskService';

export default async function taskPost(req: Request, res: Response, next: NextFunction) {
    const taskService = new TaskService();

    const task = req.body;

    try {
        const response = await taskService.insert(task);

        res.status(HttpStatus.OK).json(response);
    } catch (err) {
        console.error(err);
        const error = {
            code: HttpStatus.BAD_REQUEST,
            errorObj: err
        };
        next(error);
    }
}
