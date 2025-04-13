import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('additional_options')
export class AdditionalOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
