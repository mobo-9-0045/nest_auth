
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  projectName: string;

  @Column({ nullable: false })
  projectDescription: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
