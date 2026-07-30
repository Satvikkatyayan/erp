import { IsOptional, IsObject, IsString, IsNumber, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class SortDto {
  @ApiPropertyOptional({ description: 'Sort field' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Sort order (asc/desc)' })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}

export class EmployeeFilterDto {
  @ApiPropertyOptional({ description: 'Status filter' })
  @IsOptional()
  @IsString()
  status?: string;
}

export class SearchEmployeesDto {
  @ApiPropertyOptional({ description: 'JSON stringified filters' })
  @IsOptional()
  @IsString()
  filters?: string;
  
  @ApiPropertyOptional({ description: 'JSON stringified sort' })
  @IsOptional()
  @IsString()
  sort?: string;
}
