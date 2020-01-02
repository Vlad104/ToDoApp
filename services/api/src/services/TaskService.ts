import { getManager, Repository } from 'typeorm';
import { Task } from '../entities/Task';

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

  public async getAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  public async getById(id: string | number): Promise<Task> {
    if (!id) {
        return Promise.reject(false);
    }

    return await this.taskRepository.findOne(id);
  }

  public async getByText(text: string): Promise<Task | undefined> {
    const tasks = await this.taskRepository.find({ where: { text } });
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
}
