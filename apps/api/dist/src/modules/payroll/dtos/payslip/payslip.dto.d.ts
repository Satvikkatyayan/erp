export declare class PayslipCompanyDto {
    name: string;
    businessUnit: string;
    branch: string;
    department: string;
    payrollPeriod: string;
    currency: string;
    payDate: string;
    runNumber: string;
    payslipVersion: number;
}
export declare class PayslipEmployeeDto {
    id: string;
    code: string;
    name: string;
    designation: string;
    department: string;
    branch: string;
    employmentType: string;
    joiningDate: string;
    salaryStructureVersion: number;
}
export declare class PayslipAttendanceDto {
    daysPresent: number;
    daysAbsent: number;
    paidLeave: number;
    unpaidLeave: number;
    halfDays: number;
    lateDays: number;
    overtimeHours: number;
    attendancePercentage: number;
}
export declare class PayslipComponentDto {
    component: string;
    formulaVersion: string;
    calculatedValue: number;
    currency?: string;
}
export declare class PayslipTotalsDto {
    grossEarnings: number;
    grossDeductions: number;
    employerContributions: number;
    netPay: number;
    roundedAmount: number;
    amountInWords: string;
}
export declare class PayslipAuditDto {
    calculationVersion: string;
    snapshotVersion: string;
    rulesVersion: string;
    checksum: string;
    formulaHash: string;
    runId: string;
    calculationId: string;
    payslipId: string;
    generatedTimestamp: string;
}
export declare class PayslipReviewDto {
    approvedBy?: string;
    approvalWorkflowVersion?: string;
    finalReviewer?: string;
    approvedTimestamp?: string;
    lockedTimestamp?: string;
    processedTimestamp?: string;
}
export declare class PayslipResponseDto {
    id: string;
    tenantId: string;
    versionNumber: number;
    status: string;
    documentUrl?: string;
    company: PayslipCompanyDto;
    employee: PayslipEmployeeDto;
    attendanceSummary: PayslipAttendanceDto;
    earnings: PayslipComponentDto[];
    deductions: PayslipComponentDto[];
    employerContributions: PayslipComponentDto[];
    totals: PayslipTotalsDto;
    auditMetadata: PayslipAuditDto;
    reviewMetadata: PayslipReviewDto;
}
//# sourceMappingURL=payslip.dto.d.ts.map