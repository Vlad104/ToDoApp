import { getManager, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserService {
    private userRepository = getManager().getRepository(User);

    // tslint:disable-next-line: ban-types
    public instantiate(data: Object): User | undefined {
        return this.userRepository.create(data);
    }

    public async insert(data: User): Promise<User> {
        const newUser = this.userRepository.create(data);
        return await this.userRepository.save(newUser);
    }

    public async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async getByLogin(login: string): Promise<User> {
        if (login) {
            return await this.userRepository.findOne(login);
        }
        return Promise.reject(false);
    }

    public async update(user: User): Promise<User | undefined> {
        try {
            const updatedUser = await this.userRepository.save(user);
            return updatedUser;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
