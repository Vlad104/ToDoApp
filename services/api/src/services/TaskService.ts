import { getManager, Repository } from 'typeorm';
import { Task } from '../entities/Task';
import { User } from '../entities/User';

export class TaskService {

  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = getManager().getRepository(Task);
  }

  // tslint:disable-next-line: ban-types
  public instantiate(data: Object): Task | undefined {
    return this.taskRepository.create(data);
  }

  public async insert(data: Task): Promise<Task> {
    const newTask = this.taskRepository.create(data);
    return await this.taskRepository.save(newTask);
  }

  public async getAll(user: User): Promise<Task[]> {
    return await this.taskRepository.find({ where: { user } } );
  }

  public async get(user: User, id: string | number): Promise<Task> {
    return await this.taskRepository.findOne(id, { where: { user } });
  }

  public async getByText(user: User, text: string): Promise<Task | undefined> {
    const tasks = await this.taskRepository.find({ where: { user, text } });
    if (tasks && tasks.length > 0) {
        return tasks[0];
    } else {
        return undefined;
    }
  }

  public async update(task: Task): Promise<Task | undefined> {
    try {
        return await this.taskRepository.save(task);
    } catch (error) {
        return Promise.reject(error);
    }
  }

  public async delete(user: User, taskId: number): Promise<void> {
    try {
        await this.taskRepository.delete({ id: taskId, user });
    } catch (error) {
        return Promise.reject(error);
    }
  }

  public async deleteAll(user: User): Promise<void> {
    try {
        await this.taskRepository.delete({ user });
    } catch (error) {
        return Promise.reject(error);
    }
  }
}
