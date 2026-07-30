import { Injectable } from '@nestjs/common';
import { CreatePayrollRunDto } from '../commands/create-payroll-run.dto';
import { StartPayrollCollectionDto } from '../commands/start-payroll-collection.dto';
import { PayrollRunResponseDto } from '../responses/payroll-run.response.dto';
import { EmployeePayrollResponseDto } from '../responses/employee-payroll.response.dto';
import { 
  JournalDto, 
  JournalEntryDto, 
  PaymentBatchDto, 
  PaymentInstructionDto, 
  AdjustmentDto, 
  ArrearDto 
} from '../financial/financial.dto';
@Injectable()
export class PayrollMapper {
  
  toCreatePayrollRunCommand(dto: CreatePayrollRunDto, tenantId: string) {
    return {
      periodId: dto.periodId,
      runType: dto.runType,
      tenantId
    };
  }

  toStartPayrollCollectionCommand(dto: StartPayrollCollectionDto, tenantId: string) {
    return {
      runId: dto.runId,
      tenantId
    };
  }

  toPayrollRunResponseDto(entity: any): PayrollRunResponseDto {
    const dto = new PayrollRunResponseDto();
    dto.id = entity.id;
    dto.tenantId = entity.tenantId;
    dto.periodId = entity.periodId;
    dto.runType = entity.runType;
    dto.status = entity.status;
    dto.lockedScopes = entity.lockedScopes;
    dto.createdAt = entity.createdAt?.toISOString();
    dto.updatedAt = entity.updatedAt?.toISOString();
    return dto;
  }

  toEmployeePayrollResponseDto(entity: any): EmployeePayrollResponseDto {
    const dto = new EmployeePayrollResponseDto();
    dto.employeeId = entity.employeeId;
    dto.employeeName = entity.employeeName;
    dto.calculation = entity.calculation;
    return dto;
  }

  toPayslipResponseDto(entity: any): any {
    // If the entity is standard Prisma model with payslipData
    if (!entity) return null;
    
    return {
      id: entity.id,
      tenantId: entity.tenantId,
      versionNumber: entity.versionNumber,
      status: entity.status,
      documentUrl: entity.documentUrl,
      
      // Expand the JSON payload directly into the DTO
      company: entity.payslipData?.company,
      employee: entity.payslipData?.employee,
      attendanceSummary: entity.payslipData?.attendanceSummary,
      earnings: entity.payslipData?.earnings || [],
      deductions: entity.payslipData?.deductions || [],
      employerContributions: entity.payslipData?.employerContributions || [],
      totals: entity.payslipData?.totals,
      auditMetadata: entity.payslipData?.auditMetadata,
      reviewMetadata: entity.payslipData?.reviewMetadata
    };
  }

  // Financial Integration Mappers
  toJournalDto(entity: any): JournalDto | null {
    if (!entity) return null;
    const dto = new JournalDto();
    dto.id = entity.id;
    dto.tenantId = entity.tenantId;
    dto.payrollRunId = entity.payrollRunId;
    dto.versionNumber = entity.versionNumber;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt?.toISOString();
    
    if (entity.entries) {
      dto.entries = entity.entries.map((e: any) => this.toJournalEntryDto(e));
    }
    return dto;
  }

  toJournalEntryDto(entity: any): JournalEntryDto {
    const dto = new JournalEntryDto();
    dto.id = entity.id;
    dto.employeeId = entity.employeeId;
    dto.accountCode = entity.accountCode;
    dto.accountName = entity.accountName;
    dto.debit = entity.debit;
    dto.credit = entity.credit;
    dto.currency = entity.currency;
    dto.description = entity.description;
    dto.entryType = entity.entryType;
    dto.checksum = entity.checksum;
    return dto;
  }

  toPaymentBatchDto(entity: any): PaymentBatchDto | null {
    if (!entity) return null;
    const dto = new PaymentBatchDto();
    dto.id = entity.id;
    dto.tenantId = entity.tenantId;
    dto.payrollRunId = entity.payrollRunId;
    dto.versionNumber = entity.versionNumber;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt?.toISOString();

    if (entity.instructions) {
      dto.instructions = entity.instructions.map((i: any) => this.toPaymentInstructionDto(i));
    }
    return dto;
  }

  toPaymentInstructionDto(entity: any): PaymentInstructionDto {
    const dto = new PaymentInstructionDto();
    dto.id = entity.id;
    dto.employeeId = entity.employeeId;
    dto.netPay = entity.netPay;
    dto.currency = entity.currency;
    dto.bankAccountReference = entity.bankAccountReference;
    dto.paymentMethod = entity.paymentMethod;
    dto.paymentStatus = entity.paymentStatus;
    dto.referenceNumber = entity.referenceNumber;
    return dto;
  }

  toAdjustmentDto(entity: any): AdjustmentDto | null {
    if (!entity) return null;
    const dto = new AdjustmentDto();
    dto.id = entity.id;
    dto.employeeId = entity.employeeId;
    dto.runId = entity.runId;
    dto.type = entity.type;
    dto.amount = entity.amount;
    dto.reason = entity.reason;
    dto.versionNumber = entity.versionNumber;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt?.toISOString();
    return dto;
  }

  toArrearDto(entity: any): ArrearDto | null {
    if (!entity) return null;
    const dto = new ArrearDto();
    dto.id = entity.id;
    dto.employeeId = entity.employeeId;
    dto.previousRunId = entity.previousRunId;
    dto.currentRunId = entity.currentRunId;
    dto.reason = entity.reason;
    dto.amount = entity.amount;
    dto.versionNumber = entity.versionNumber;
    dto.status = entity.status;
    dto.createdAt = entity.createdAt?.toISOString();
    return dto;
  }
}
