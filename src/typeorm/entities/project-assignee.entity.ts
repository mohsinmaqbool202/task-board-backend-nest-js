import {
  Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity('project_members')
export class ProjectAssignee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, project => project.members)
  project: Project;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
