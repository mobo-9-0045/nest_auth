import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable : false})
  name: string;

  @Column({nullable : false})
  email: string;

  @Column()
  lastname: string;

  @Column({nullable: false})
  username: string;

  @Column({nullable: true})
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({nullable: true})
  otpCode: number;
  
}