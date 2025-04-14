import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LocationCategory } from './location-category.entity';
import { LocationDetail } from './location-detail.entity';

@Entity('location_sub_categories')
export class LocationSubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => LocationCategory, (category) => category.subCategories)
  parent: LocationCategory;

  @OneToMany(() => LocationDetail, (detail) => detail.parent)
  details: LocationDetail[];
}
