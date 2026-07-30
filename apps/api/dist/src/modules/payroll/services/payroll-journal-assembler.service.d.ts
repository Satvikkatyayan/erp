export interface JournalAssemblyContext {
    payrollRunId: string;
    calculations: any[];
    calculationSteps: any[];
    payslips: any[];
    salaryComponents: any[];
}
export declare class PayrollJournalAssembler {
    assembleEntries(ctx: JournalAssemblyContext): any[];
}
//# sourceMappingURL=payroll-journal-assembler.service.d.ts.map