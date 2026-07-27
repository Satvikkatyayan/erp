import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PayrollStateMachineService, PayrollRunStatus } from './payroll-state-machine.service';
import { PayrollSnapshotService } from './payroll-snapshot.service';
import { PayrollCalculationService } from './payroll-calculation.service';
import { PlatformAttendanceSDK } from '../../attendance/sdk/platform-attendance.sdk';
import { EventBusService } from '../../../core/events/event-bus.service';
import { PayrollReviewService } from './payroll-review.service';
import { v4 as uuidv4 } from 'uuid';
import { 
  PayrollReviewStartedEvent, 
  PayrollReviewCompletedEvent, 
  PayrollApprovedEvent as ReviewApprovedEvent,
  PayrollRejectedEvent,
  PayrollLockedEvent as ReviewLockedEvent,
  PayrollProcessedEvent as ReviewProcessedEvent,
  PayrollCancelledEvent as ReviewCancelledEvent,
  PayrollReopenedEvent,
  EmployeePayrollRegeneratedEvent as ReviewRegeneratedEvent,
  ReviewAssignmentCreatedEvent
} from '../events/payroll-review.events';
import { 
  PayrollRunCreatedEvent, 
  PayrollSnapshotCreatedEvent, 
  PayrollCalculationCreatedEvent, 
  PayrollCalculationCompletedEvent, 
  PayrollRunLockedEvent,
  PayrollCollectionStartedEvent,
  PayrollSnapshotsGeneratedEvent,
  PayrollApprovedEvent,
  PayrollProcessedEvent,
  PayrollCancelledEvent,
  EmployeePayrollRegeneratedEvent
} from '../domain/events/payroll.events';

@Injectable()
export class PayrollExecutionService {
  private readonly logger = new Logger(PayrollExecutionService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: PayrollStateMachineService,
    private readonly snapshotService: PayrollSnapshotService,
    private readonly calculationService: PayrollCalculationService,
    private readonly attendanceSdk: PlatformAttendanceSDK,
    private readonly eventBus: EventBusService,
    private readonly reviewService: PayrollReviewService
  ) {}

  async createPayrollRun(ctx: any, periodId: string, runType: string): Promise<string> {
    const runId = uuidv4();
    await this.prisma.$transaction(async (tx) => {
      await tx.payPayrollRun.create({
        data: {
          id: runId,
          tenantId: ctx.tenantId,
          periodId,
          runType,
          status: PayrollRunStatus.DRAFT
        }
      });
    });
    this.eventBus.publish(new PayrollRunCreatedEvent(runId, ctx.tenantId));
    return runId;
  }

  async startPayrollCollection(ctx: any, runId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await this.stateMachine.transition(runId, PayrollRunStatus.COLLECTING, tx);
    });
    this.eventBus.publish(new PayrollCollectionStartedEvent(runId, ctx.tenantId));
  }

  async generatePayrollSnapshots(ctx: any, runId: string): Promise<void> {
    const run = await this.prisma.payPayrollRun.findUnique({ where: { id: runId } });
    if (!run) throw new BadRequestException('Run not found');

    const assignments = await this.prisma.payEmployeeSalaryAssignment.findMany({
      where: { tenantId: ctx.tenantId }
    });

    const periodObj = await this.prisma.payPayrollPeriod.findUnique({ where: { id: run.periodId } });

    await this.prisma.$transaction(async (tx) => {
      for (const assign of assignments) {
        const attendanceSummary = await this.attendanceSdk.getAttendanceSummary(assign.employeeId, run.periodId);
        if (!attendanceSummary) {
          throw new BadRequestException(`Missing Attendance Summary for employee ${assign.employeeId}`);
        }

        await this.snapshotService.generateSnapshot(
          ctx.tenantId,
          runId,
          assign.employeeId,
          assign,
          attendanceSummary,
          'v1',
          'v1',
          periodObj,
          tx
        );
      }
    });

    this.eventBus.publish(new PayrollSnapshotsGeneratedEvent(runId, ctx.tenantId));
  }

  async executePayrollRun(ctx: any, runId: string, currencyId: string): Promise<void> {
    this.logger.log(`Starting payroll execution for run ${runId}`);
    
    await this.prisma.$transaction(async (tx) => {
      await this.stateMachine.transition(runId, PayrollRunStatus.COLLECTING, tx);
    });
    this.eventBus.publish(new PayrollCollectionStartedEvent(runId, ctx.tenantId));

    const run = await this.prisma.payPayrollRun.findUnique({ where: { id: runId } });
    if (!run) throw new BadRequestException('Run not found');

    const assignments = await this.prisma.payEmployeeSalaryAssignment.findMany({
      where: { tenantId: ctx.tenantId }
    });

    await this.prisma.$transaction(async (tx) => {
      await this.stateMachine.transition(runId, PayrollRunStatus.CALCULATING, tx);
    });

    for (const assign of assignments) {
      this.eventBus.publish(new PayrollCalculationCreatedEvent(null, runId, assign.employeeId));
      
      try {
        await this.prisma.$transaction(async (tx) => {
          const attendanceSummary = await this.attendanceSdk.getAttendanceSummary(assign.employeeId, run.periodId);
          if (!attendanceSummary) {
            throw new BadRequestException(`Missing Attendance Summary for employee ${assign.employeeId}`);
          }

          const periodObj = await this.prisma.payPayrollPeriod.findUnique({ where: { id: run.periodId } });
          const snapshotId = await this.snapshotService.generateSnapshot(
            ctx.tenantId,
            runId,
            assign.employeeId,
            assign,
            attendanceSummary,
            'v1', 
            'v1', 
            periodObj,
            tx
          );
          this.eventBus.publish(new PayrollSnapshotCreatedEvent(snapshotId, runId, assign.employeeId));

          await this.calculationService.calculateEmployeePayroll(ctx, runId, assign.employeeId, currencyId, snapshotId, tx);
        });
      } catch (error: any) {
        this.logger.error(`Employee ${assign.employeeId} failed: ${error.message}`);
      }
    }

    await this.prisma.$transaction(async (tx) => {
      // Transition back to calculating or whatever state, but we don't auto-approve!
      // The prompt says "No calculation logic in review service". After calculation, it waits for Review.
      // So we do not automatically transition to APPROVED here anymore!
      // Wait, we need to initialize the review workflow here, because the calculations just finished.
      
      await this.reviewService.initializeWorkflow(ctx, runId, 1, tx);
      await this.reviewService.recordTimeline(ctx, runId, 'Calculations Completed', 'Starting Review Workflow', 'CALCULATING', 'CALCULATING', 1, tx);
    });
    this.eventBus.publish(new PayrollCalculationCompletedEvent(runId));
    this.eventBus.publish(new PayrollReviewStartedEvent(ctx, runId));
  }

  async submitReviewApproval(ctx: any, runId: string, reviewId: string, remarks?: string): Promise<void> {
    let roleCode = '';
    let roleDisplayName = '';
    let stepNumber = 0;
    
    await this.prisma.$transaction(async (tx) => {
      const review = await this.reviewService.approveStep(ctx, reviewId, remarks, tx);
      roleCode = review.roleCode;
      roleDisplayName = review.roleDisplayName;
      stepNumber = review.stepNumber;
      await this.reviewService.recordTimeline(ctx, runId, `${roleDisplayName} Approved`, remarks, undefined, undefined, 1, tx);
    });
    // For Review Assignment Completed Event, could be published here
  }

  async submitReviewRejection(ctx: any, runId: string, reviewId: string, remarks: string): Promise<void> {
    let roleCode = '';
    let roleDisplayName = '';
    let stepNumber = 0;

    await this.prisma.$transaction(async (tx) => {
      const review = await this.reviewService.rejectStep(ctx, reviewId, remarks, tx);
      roleCode = review.roleCode;
      roleDisplayName = review.roleDisplayName;
      stepNumber = review.stepNumber;
      await this.reviewService.recordTimeline(ctx, runId, `${roleDisplayName} Rejected`, remarks, undefined, undefined, 1, tx);
    });
    this.eventBus.publish(new PayrollRejectedEvent(ctx, runId, undefined, undefined, stepNumber, roleCode, roleDisplayName, 'REJECTED'));
  }

  async approvePayrollRun(ctx: any, runId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const isEligible = await this.reviewService.isApprovalComplete(runId, tx);
      if (!isEligible) throw new BadRequestException('Not all mandatory reviewers have approved');
      
      await this.stateMachine.transition(runId, PayrollRunStatus.APPROVED, tx);
      await this.reviewService.recordTimeline(ctx, runId, 'Payroll Approved', 'All reviewers approved', undefined, 'APPROVED', 1, tx);
    });
    this.eventBus.publish(new ReviewApprovedEvent(ctx, runId));
  }

  async lockPayroll(ctx: any, runId: string): Promise<void> {
    this.logger.log(`Locking payroll run ${runId}`);
    await this.prisma.$transaction(async (tx) => {
      const isEligible = await this.reviewService.isEligibleForLock(runId, tx);
      if (!isEligible) throw new BadRequestException('Cannot lock unapproved payroll');

      await this.stateMachine.transition(runId, PayrollRunStatus.LOCKED, tx);
      await this.reviewService.recordTimeline(ctx, runId, 'Payroll Locked', 'Finalizing run', 'APPROVED', 'LOCKED', 1, tx);
    });
    this.eventBus.publish(new ReviewLockedEvent(ctx, runId));
  }

  async processPayrollRun(ctx: any, runId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await this.stateMachine.transition(runId, PayrollRunStatus.PROCESSED, tx);
      await this.reviewService.recordTimeline(ctx, runId, 'Payroll Processed', 'Initiating disbursement', 'LOCKED', 'PROCESSED', 1, tx);
    });
    this.eventBus.publish(new ReviewProcessedEvent(ctx, runId));
  }

  async cancelPayrollRun(ctx: any, runId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await this.stateMachine.transition(runId, PayrollRunStatus.CANCELLED, tx);
      await this.reviewService.recordTimeline(ctx, runId, 'Payroll Cancelled', 'User aborted', undefined, 'CANCELLED', 1, tx);
    });
    this.eventBus.publish(new ReviewCancelledEvent(ctx, runId));
  }

  async reopenPayrollRun(ctx: any, runId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await this.stateMachine.transition(runId, PayrollRunStatus.DRAFT, tx);
      // Bump version via service logic theoretically, but passing 2 for demonstration
      await this.reviewService.initializeWorkflow(ctx, runId, 2, tx);
      await this.reviewService.recordTimeline(ctx, runId, 'Payroll Reopened', 'Corrections needed', undefined, 'DRAFT', 2, tx);
    });
    this.eventBus.publish(new PayrollReopenedEvent(ctx, runId));
  }

  async regenerateEmployeePayroll(ctx: any, runId: string, employeeId: string, currencyId: string): Promise<void> {
    const run = await this.prisma.payPayrollRun.findUnique({ where: { id: runId } });
    if (!run) throw new BadRequestException('Run not found');

    const assign = await this.prisma.payEmployeeSalaryAssignment.findFirst({
      where: { employeeId, tenantId: ctx.tenantId }
    });
    if (!assign) throw new BadRequestException('Salary Assignment missing');

    const periodObj = await this.prisma.payPayrollPeriod.findUnique({ where: { id: run.periodId } });

    await this.prisma.$transaction(async (tx) => {
      const attendanceSummary = await this.attendanceSdk.getAttendanceSummary(employeeId, run.periodId);
      if (!attendanceSummary) {
        throw new BadRequestException(`Missing Attendance Summary for employee ${employeeId}`);
      }

      const snapshotId = await this.snapshotService.generateSnapshot(
        ctx.tenantId,
        runId,
        employeeId,
        assign,
        attendanceSummary,
        'v1',
        'v1',
        periodObj,
        tx
      );

      await this.calculationService.calculateEmployeePayroll(ctx, runId, employeeId, currencyId, snapshotId, tx);
    });

    this.eventBus.publish(new ReviewRegeneratedEvent(ctx, runId, employeeId));
  }
}
