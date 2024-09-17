
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  skillName: string;

  @Column({ nullable: false })
  skillDescription: string;

  @ManyToOne(() => User, (user) => user.skills)
  user: User;
}
