import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  gender: string; // Can be 'male' or 'female'

  @Column({ default: false })
  hasProblems: boolean; // Boolean field to indicate if the user has problems
}
