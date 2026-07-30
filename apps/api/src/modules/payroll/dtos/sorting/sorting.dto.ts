import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum SortDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SortingDto {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(SortDirectionEnum)
  sortDirection?: SortDirectionEnum = SortDirectionEnum.ASC;
}