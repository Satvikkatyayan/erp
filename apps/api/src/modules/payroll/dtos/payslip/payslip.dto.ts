import { ApiProperty } from '@nestjs/swagger';

export class PayslipCompanyDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  businessUnit: string;
  @ApiProperty()
  branch: string;
  @ApiProperty()
  department: string;
  @ApiProperty()
  payrollPeriod: string;
  @ApiProperty()
  currency: string;
  @ApiProperty()
  payDate: string;
  @ApiProperty()
  runNumber: string;
  @ApiProperty()
  payslipVersion: number;
}

export class PayslipEmployeeDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  designation: string;
  @ApiProperty()
  department: string;
  @ApiProperty()
  branch: string;
  @ApiProperty()
  employmentType: string;
  @ApiProperty()
  joiningDate: string;
  @ApiProperty()
  salaryStructureVersion: number;
}

export class PayslipAttendanceDto {
  @ApiProperty()
  daysPresent: number;
  @ApiProperty()
  daysAbsent: number;
  @ApiProperty()
  paidLeave: number;
  @ApiProperty()
  unpaidLeave: number;
  @ApiProperty()
  halfDays: number;
  @ApiProperty()
  lateDays: number;
  @ApiProperty()
  overtimeHours: number;
  @ApiProperty()
  attendancePercentage: number;
}

export class PayslipComponentDto {
  @ApiProperty()
  component: string;
  @ApiProperty()
  formulaVersion: string;
  @ApiProperty()
  calculatedValue: number;
  @ApiProperty({ required: false })
  currency?: string;
}

export class PayslipTotalsDto {
  @ApiProperty()
  grossEarnings: number;
  @ApiProperty()
  grossDeductions: number;
  @ApiProperty()
  employerContributions: number;
  @ApiProperty()
  netPay: number;
  @ApiProperty()
  roundedAmount: number;
  @ApiProperty()
  amountInWords: string;
}

export class PayslipAuditDto {
  @ApiProperty()
  calculationVersion: string;
  @ApiProperty()
  snapshotVersion: string;
  @ApiProperty()
  rulesVersion: string;
  @ApiProperty()
  checksum: string;
  @ApiProperty()
  formulaHash: string;
  @ApiProperty()
  runId: string;
  @ApiProperty()
  calculationId: string;
  @ApiProperty()
  payslipId: string;
  @ApiProperty()
  generatedTimestamp: string;
}

export class PayslipReviewDto {
  @ApiProperty({ required: false })
  approvedBy?: string;
  @ApiProperty({ required: false })
  approvalWorkflowVersion?: string;
  @ApiProperty({ required: false })
  finalReviewer?: string;
  @ApiProperty({ required: false })
  approvedTimestamp?: string;
  @ApiProperty({ required: false })
  lockedTimestamp?: string;
  @ApiProperty({ required: false })
  processedTimestamp?: string;
}

export class PayslipResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  tenantId: string;
  @ApiProperty()
  versionNumber: number;
  @ApiProperty()
  status: string;
  @ApiProperty({ required: false })
  documentUrl?: string;

  @ApiProperty({ type: () => PayslipCompanyDto })
  company: PayslipCompanyDto;
  
  @ApiProperty({ type: () => PayslipEmployeeDto })
  employee: PayslipEmployeeDto;
  
  @ApiProperty({ type: () => PayslipAttendanceDto })
  attendanceSummary: PayslipAttendanceDto;
  
  @ApiProperty({ type: () => [PayslipComponentDto] })
  earnings: PayslipComponentDto[];
  
  @ApiProperty({ type: () => [PayslipComponentDto] })
  deductions: PayslipComponentDto[];
  
  @ApiProperty({ type: () => [PayslipComponentDto] })
  employerContributions: PayslipComponentDto[];
  
  @ApiProperty({ type: () => PayslipTotalsDto })
  totals: PayslipTotalsDto;
  
  @ApiProperty({ type: () => PayslipAuditDto })
  auditMetadata: PayslipAuditDto;
  
  @ApiProperty({ type: () => PayslipReviewDto })
  reviewMetadata: PayslipReviewDto;
}
