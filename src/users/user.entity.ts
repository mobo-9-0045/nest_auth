import { Project } from 'src/project/project.entity';
import { Skill } from 'src/skills/skill.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  lastname: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  otpCode: number;

  @OneToMany(() => Project, (project) => project.user, {nullable: true})
  projects: Project[];

  @OneToMany(() => Skill, (skill) => skill.user, {nullable: true})
  skills: Skill[];
}
