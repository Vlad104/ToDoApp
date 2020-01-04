import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { TaskService } from '../../services/TaskService';

export default async function(req: Request, res: Response, next: NextFunction) {
    const taskService = new TaskService();

    try {
      const response = await taskService.getAll();

      res.status(HttpStatus.OK).json(response);
    } catch (err) {
        const error = {
        code: HttpStatus.BAD_REQUEST,
        errorObj: err
      };
        next(error);
    }
}
