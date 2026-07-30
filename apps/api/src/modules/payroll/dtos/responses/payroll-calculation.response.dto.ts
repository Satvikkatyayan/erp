export class PayrollCalculationResponseDto {
  id: string;
  payrollRunId: string;
  employeeId: string;
  grossPay: number;
  netPay: number;
  totalDeductions: number;
  currencyId: string;
}