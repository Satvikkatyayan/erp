export interface PayslipAssemblyContext {
    snapshot: any;
    calculation: any;
    calculationSteps: any[];
    employeeData: any;
    companyData: any;
    salaryStructureVersion: number;
    reviewMetadata?: any;
}
export declare class PayslipAssembler {
    assemble(ctx: PayslipAssemblyContext, previousVersion?: number): any;
    private numberToWords;
}
//# sourceMappingURL=payslip-assembler.service.d.ts.map