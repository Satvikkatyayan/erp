import { PayrollCalculationResponseDto } from './payroll-calculation.response.dto';

export class EmployeePayrollResponseDto {
  employeeId: string;
  employeeName: string;
  calculation: PayrollCalculationResponseDto;
}