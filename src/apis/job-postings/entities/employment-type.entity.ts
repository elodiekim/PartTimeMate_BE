import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class EmploymentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
