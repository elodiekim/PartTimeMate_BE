import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LocationSubCategory } from './location-sub-category.entity';

@Entity('location_categories')
export class LocationCategory {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => LocationSubCategory, (subCategory) => subCategory.parent)
  subCategories: LocationSubCategory[];
}
