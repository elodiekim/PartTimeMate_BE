import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employment_types')
export class EmploymentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
