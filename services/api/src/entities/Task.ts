import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public text: string;

  @CreateDateColumn()
  public created: Date;
}
