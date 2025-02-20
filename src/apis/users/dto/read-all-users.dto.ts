import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { User } from '../entities/user.entity';

export class ReadAllUsersDto {
  message: string;
  statusCode: number;
  data: {
    users: User[];
    totalCount: number;
    totalPage: number;
    page: number;
    // limit: number;
  };
}
export class PageRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  /** To Do */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 2;
}
