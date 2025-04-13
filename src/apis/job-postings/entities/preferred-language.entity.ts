import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class PreferredLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
