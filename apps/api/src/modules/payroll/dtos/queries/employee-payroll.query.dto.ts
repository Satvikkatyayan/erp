import { IsNotEmpty, IsUUID } from 'class-validator';
import { PaginationRequestDto } from '../pagination/pagination.dto';
import { IntersectionType } from '@nestjs/mapped-types';

export class EmployeePayrollQueryDto extends PaginationRequestDto {
  @IsNotEmpty()
  @IsUUID()
  employeeId: string;
}