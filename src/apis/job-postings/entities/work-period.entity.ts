import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('work_periods')
export class WorkPeriod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
