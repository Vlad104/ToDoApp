import { Column, CreateDateColumn, Entity,  JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public text: string;

  @CreateDateColumn({ type: 'timestamp' })
  public created: string;

  // tslint:disable-next-line: arrow-parens
  @OneToOne(type => User)
  @JoinColumn({ name: 'user' })
  public user: User;
}
