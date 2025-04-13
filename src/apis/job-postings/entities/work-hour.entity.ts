import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('work_hours')
export class WorkHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
