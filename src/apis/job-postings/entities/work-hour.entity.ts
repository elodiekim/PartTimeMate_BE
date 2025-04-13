import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class WorkHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
