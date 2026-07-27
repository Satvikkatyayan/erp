import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PayrollFormulaEngine } from './payroll-formula.engine';
import { PayPayrollCalculationRepository } from '../repositories/payroll-calculation.repository';
import { PayCalculationStepRepository } from '../repositories/calculation-step.repository';
import { PayPayrollSnapshotRepository } from '../repositories/payroll-snapshot.repository';
import { PayslipService } from './payslip.service';
import { EventBusService } from '../../../core/events/event-bus.service';
import { PayslipGeneratedEvent } from '../domain/events/payroll.events';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PayrollCalculationService {
  private readonly logger = new Logger(PayrollCalculationService.name);

  constructor(
    private readonly snapshotRepo: PayPayrollSnapshotRepository,
    private readonly calcRepo: PayPayrollCalculationRepository,
    private readonly stepRepo: PayCalculationStepRepository,
    private readonly formulaEngine: PayrollFormulaEngine,
    private readonly payslipService: PayslipService,
    private readonly eventBus: EventBusService
  ) {}

  async calculateEmployeePayroll(ctx: any, runId: string, employeeId: string, currencyId: string, snapshotId: string, tx: any): Promise<string> {
    this.logger.log(`Calculating payroll for employee ${employeeId} via snapshot ${snapshotId}`);

    const snapshot = await this.snapshotRepo.findById(snapshotId, tx);
    if (!snapshot) throw new BadRequestException('Payroll snapshot missing');
    
    const data = snapshot.snapshotData as any;
    
    // Idempotency: Delete previous calculations for this run and employee
    await tx.payCalculationStep.deleteMany({
      where: { calculation: { payrollRunId: runId, employeeId } }
    });
    await tx.payPayrollCalculation.deleteMany({
      where: { payrollRunId: runId, employeeId }
    });

    // Initialize fresh calculation
    const calc = await this.calcRepo.save({
      id: uuidv4(),
      tenantId: ctx.tenantId,
      payrollRunId: runId,
      employeeId,
      grossPay: 0,
      netPay: 0,
      totalDeductions: 0,
      currencyId
    }, tx);

    const ctc = data.salaryAssignment.annualCTC / 12; // Monthly
    
    // Safe extraction of attendance summary (No mocks!)
    const attendanceSummary = data.attendanceSummary || {};
    const lopDays = attendanceSummary.totalLopDays || 0; 
    const perDaySalary = ctc / 30;
    const lopDeduction = perDaySalary * lopDays;

    let grossPay = 0;
    let totalDeductions = 0;
    let sequence = 1;

    // Evaluate BASIC
    const basicResult = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'BASIC', { ctc }, tx);
    await this.stepRepo.save({ id: uuidv4(), tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'BASIC', calculatedValue: basicResult.value, formulaHash: basicResult.hash, executionOrder: sequence++ }, tx);
    grossPay += basicResult.value;

    // Evaluate HRA
    const hraResult = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'HRA', { ctc }, tx);
    await this.stepRepo.save({ id: uuidv4(), tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'HRA', calculatedValue: hraResult.value, formulaHash: hraResult.hash, executionOrder: sequence++ }, tx);
    grossPay += hraResult.value;

    // Evaluate LOP
    await this.stepRepo.save({ id: uuidv4(), tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'LOP', calculatedValue: -lopDeduction, formulaHash: 'LOP_RULE_V1', executionOrder: sequence++ }, tx);
    grossPay -= lopDeduction;

    // Evaluate PF
    const pfResult = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'PF', { ctc }, tx);
    await this.stepRepo.save({ id: uuidv4(), tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'PF', calculatedValue: -pfResult.value, formulaHash: pfResult.hash, executionOrder: sequence++ }, tx);
    totalDeductions += pfResult.value + lopDeduction;

    const netPay = grossPay - pfResult.value;

    // Update calculation totals
    await this.calcRepo.save({
      id: calc.id,
      grossPay,
      netPay,
      totalDeductions
    }, tx);

    // Generate Payslip
    const payslipId = await this.payslipService.generatePayslip(ctx, runId, employeeId, calc.id, snapshotId, tx);
    
    this.eventBus.publish(new PayslipGeneratedEvent(payslipId, runId, employeeId));

    return calc.id;
  }
}
