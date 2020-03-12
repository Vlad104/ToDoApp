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
    public async insert(userData: Object): Promise<Session> {
        const session = this.sessionRepository.create(userData);
        return await this.sessionRepository.save(session);
    }

    public async get(sessionId: string): Promise<Session> {
        return await this.sessionRepository.findOne(sessionId, { relations: ['user'] });
    }

    public async update(session: Session): Promise<Session | undefined> {
        try {
            return await this.sessionRepository.save(session);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async delete(session: Session): Promise<Session | undefined> {
        try {
            await this.sessionRepository.delete({ id: session.id });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
