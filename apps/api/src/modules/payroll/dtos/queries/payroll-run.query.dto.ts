import { PaginationRequestDto } from '../pagination/pagination.dto';
import { SortingDto } from '../sorting/sorting.dto';
import { PayrollFiltersDto } from '../filters/payroll-filters.dto';
import { IntersectionType } from '@nestjs/mapped-types';

export class PayrollRunQueryDto extends IntersectionType(
  IntersectionType(PaginationRequestDto, SortingDto),
  PayrollFiltersDto
) {}