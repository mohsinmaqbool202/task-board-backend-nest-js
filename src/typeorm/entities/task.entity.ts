import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany
} from 'typeorm';
import { Board } from './board.entity';
import { User } from './user.entity';
import { TaskAssignee } from './task-assignee.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 100 })
  status: string; 

  @ManyToOne(() => Board, board => board.tasks)
  board: Board;

  @ManyToOne(() => User)
  createdBy: User;

  @Column({ name: 'due_date', type: 'datetime', nullable: true })
  dueDate: Date;

  @OneToMany(() => TaskAssignee, assignee => assignee.task)
  assignees: TaskAssignee[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
