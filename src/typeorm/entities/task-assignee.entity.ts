import {
  Entity, PrimaryGeneratedColumn, ManyToOne, Column
} from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('task_assignees')
export class TaskAssignee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Task, task => task.assignees)
  task: Task;

  @ManyToOne(() => User)
  user: User;

  @Column({ name: 'assigned_at', type: 'datetime' })
  assignedAt: Date;
}
