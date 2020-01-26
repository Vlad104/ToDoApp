import { getManager, Repository } from 'typeorm';
import { Session } from '../entities/Session';
import { User } from '../entities/User';

export class SessionService {
    private sessionRepository = getManager().getRepository(Session);

    // tslint:disable-next-line: ban-types
    public instantiate(data: Object): Session | undefined {
        return this.sessionRepository.create(data);
    }

    // tslint:disable-next-line: ban-types
    public async insert(data: Object): Promise<Session> {
        const newUser = this.sessionRepository.create(data);
        return await this.sessionRepository.save(newUser);
    }

    public async get(sessionId: string): Promise<Session> {
        return await this.sessionRepository.findOne(sessionId);
    }

    public async update(user: Session): Promise<Session | undefined> {
        try {
            return await this.sessionRepository.save(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
