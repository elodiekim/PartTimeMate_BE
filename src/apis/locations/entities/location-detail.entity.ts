import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LocationSubCategory } from './location-sub-category.entity';

@Entity('location_details')
export class LocationDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => LocationSubCategory, (subCategory) => subCategory.details)
  parent: LocationSubCategory;
}
