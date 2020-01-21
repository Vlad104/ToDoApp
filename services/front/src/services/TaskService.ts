import request from '../modules/request';

import { ITask } from '../store/List/types';

class TaskService {
    private readonly URL = 'http://localhost:8080/tasks';

    public async fetch() {
        return await request(this.URL) as ITask[];
    }

    public async create(task: ITask) {
        return await request(this.URL, 'POST', task);
    }

    public async delete(task: ITask) {
        return await request(`${this.URL}/${task.id}`, 'DELETE');
    }

    public async deleteAll() {
        return await request(this.URL, 'DELETE');
    }
}

const taskService = new TaskService();

export default taskService;
