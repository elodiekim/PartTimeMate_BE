import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class WorkPeriod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
