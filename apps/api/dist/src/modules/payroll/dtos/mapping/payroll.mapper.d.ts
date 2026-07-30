import { CreatePayrollRunDto } from '../commands/create-payroll-run.dto';
import { StartPayrollCollectionDto } from '../commands/start-payroll-collection.dto';
import { PayrollRunResponseDto } from '../responses/payroll-run.response.dto';
import { EmployeePayrollResponseDto } from '../responses/employee-payroll.response.dto';
import { JournalDto, JournalEntryDto, PaymentBatchDto, PaymentInstructionDto, AdjustmentDto, ArrearDto } from '../financial/financial.dto';
export declare class PayrollMapper {
    toCreatePayrollRunCommand(dto: CreatePayrollRunDto, tenantId: string): {
        periodId: string;
        runType: string;
        tenantId: string;
    };
    toStartPayrollCollectionCommand(dto: StartPayrollCollectionDto, tenantId: string): {
        runId: string;
        tenantId: string;
    };
    toPayrollRunResponseDto(entity: any): PayrollRunResponseDto;
    toEmployeePayrollResponseDto(entity: any): EmployeePayrollResponseDto;
    toPayslipResponseDto(entity: any): any;
    toJournalDto(entity: any): JournalDto | null;
    toJournalEntryDto(entity: any): JournalEntryDto;
    toPaymentBatchDto(entity: any): PaymentBatchDto | null;
    toPaymentInstructionDto(entity: any): PaymentInstructionDto;
    toAdjustmentDto(entity: any): AdjustmentDto | null;
    toArrearDto(entity: any): ArrearDto | null;
}
//# sourceMappingURL=payroll.mapper.d.ts.map