import { PrismaService } from '../../../common/prisma/prisma.service';
import { PayrollStateMachineService } from './payroll-state-machine.service';
import { PayrollSnapshotService } from './payroll-snapshot.service';
import { PayrollCalculationService } from './payroll-calculation.service';
import { PlatformAttendanceSDK } from '../../attendance/sdk/platform-attendance.sdk';
import { EventBusService } from '../../../core/events/event-bus.service';
import { PayrollReviewService } from './payroll-review.service';
export declare class PayrollExecutionService {
    private readonly prisma;
    private readonly stateMachine;
    private readonly snapshotService;
    private readonly calculationService;
    private readonly attendanceSdk;
    private readonly eventBus;
    private readonly reviewService;
    private readonly logger;
    constructor(prisma: PrismaService, stateMachine: PayrollStateMachineService, snapshotService: PayrollSnapshotService, calculationService: PayrollCalculationService, attendanceSdk: PlatformAttendanceSDK, eventBus: EventBusService, reviewService: PayrollReviewService);
    createPayrollRun(ctx: any, periodId: string, runType: string): Promise<string>;
    startPayrollCollection(ctx: any, runId: string): Promise<void>;
    generatePayrollSnapshots(ctx: any, runId: string): Promise<void>;
    executePayrollRun(ctx: any, runId: string, currencyId: string): Promise<void>;
    submitReviewApproval(ctx: any, runId: string, reviewId: string, remarks?: string): Promise<void>;
    submitReviewRejection(ctx: any, runId: string, reviewId: string, remarks: string): Promise<void>;
    approvePayrollRun(ctx: any, runId: string): Promise<void>;
    lockPayroll(ctx: any, runId: string): Promise<void>;
    processPayrollRun(ctx: any, runId: string): Promise<void>;
    cancelPayrollRun(ctx: any, runId: string): Promise<void>;
    reopenPayrollRun(ctx: any, runId: string): Promise<void>;
    regenerateEmployeePayroll(ctx: any, runId: string, employeeId: string, currencyId: string): Promise<void>;
}
//# sourceMappingURL=payroll-execution.service.d.ts.map