import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { User } from './User';

@Entity('user_sessions')
export class Session {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    // tslint:disable-next-line: arrow-parens
    @OneToOne(type => User)
    @JoinColumn({ name: 'user' })
    public user: User;

    @UpdateDateColumn({ type: 'timestamp' })
    public expired: string;
}
