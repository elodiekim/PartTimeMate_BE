import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { WorkPeriod } from './work-period.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

@Entity('work_days')
export class WorkDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @ManyToMany(() => WorkPeriod)
  // @JoinTable()
  // workPeriods: WorkPeriod[];

  // @IsArray()
  // @IsOptional()
  // @ApiProperty({
  //   example: [1, 2],
  //   description: 'work period ids',
  //   required: false,
  // })
  // workPeriodIds?: number[];
}
