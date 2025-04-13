import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('preferred_languages')
export class PreferredLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
