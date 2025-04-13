import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class AdditionalOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
