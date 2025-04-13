import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class WorkDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
