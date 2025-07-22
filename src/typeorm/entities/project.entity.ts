import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany
} from 'typeorm';
import { User } from './user.entity';
import { Organization } from './organization.entity';
import { Board } from './board.entity';
import { ProjectAssignee } from './project-assignee.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Organization) 
  organization: Organization;

  @ManyToOne(() => User)
  createdBy: User;

  @OneToMany(() => Board, board => board.project)
  boards: Board[];

  @OneToMany(() => ProjectAssignee, member => member.project)
  members: ProjectAssignee[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
