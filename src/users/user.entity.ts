import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({nullable: false})
  username: string;

  @Column({nullable: false})
  password: string;

  @Column({ default: false })
  isActive: boolean;
  
}