import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('work_days')
export class WorkDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
