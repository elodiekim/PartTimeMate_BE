import { Exclude, Expose } from 'class-transformer';

export class ReadAuthDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
