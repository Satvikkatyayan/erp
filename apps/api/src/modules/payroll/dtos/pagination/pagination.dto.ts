import { IsInt, IsOptional, Min, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;
}

export class PaginationResponseDto<T> {
  @IsInt()
  page: number;

  @IsInt()
  pageSize: number;

  @IsInt()
  totalRecords: number;

  @IsInt()
  totalPages: number;

  @IsBoolean()
  hasNext: boolean;

  @IsBoolean()
  hasPrevious: boolean;

  @IsArray()
  data: T[];
}