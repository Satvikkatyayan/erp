import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', default: 20 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number = 20;
}

export class SortDto {
  @ApiPropertyOptional({ description: 'Sort by field' })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({ description: 'Sort order (asc/desc)', enum: ['asc', 'desc'] })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}

export class LeaveFilterDto {
  @ApiPropertyOptional({ description: 'Filter by status' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Filter by leave type' })
  @IsString()
  @IsOptional()
  leaveTypeId?: string;
}

export class SearchLeaveRequestsDto {
  @ApiPropertyOptional({ description: 'JSON stringified filters' })
  @IsString()
  @IsOptional()
  filters?: string;

  @ApiPropertyOptional({ description: 'JSON stringified sort parameters' })
  @IsString()
  @IsOptional()
  sort?: string;
}
