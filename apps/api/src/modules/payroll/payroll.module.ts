import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';

import { PayrollQueryService } from './services/payroll-query.service';
import { PayrollFormulaEngine } from './services/payroll-formula.engine';
import { PayrollCalculationService } from './services/payroll-calculation.service';

import { PayslipService } from './services/payslip.service';
import { JournalService } from './services/journal.service';
import { PayrollStateMachineService } from './services/payroll-state-machine.service';
import { PayrollSnapshotService } from './services/payroll-snapshot.service';
import { PayrollExecutionService } from './services/payroll-execution.service';
import { PayrollReviewService } from './services/payroll-review.service';
import { PayslipAssembler } from './services/payslip-assembler.service';
import { PlatformPayrollSDK } from './sdk/platform-payroll.sdk';

import { PayPayrollPolicyRepository } from './repositories/payroll-policy.repository';
import { PayPayrollPeriodRepository } from './repositories/payroll-period.repository';
import { PaySalaryComponentRepository } from './repositories/salary-component.repository';
import { PaySalaryStructureRepository } from './repositories/salary-structure.repository';
import { PaySalaryAssignmentRepository } from './repositories/salary-assignment.repository';
import { PayPayrollRunRepository } from './repositories/payroll-run.repository';
import { PayPayrollSnapshotRepository } from './repositories/payroll-snapshot.repository';
import { PayPayrollCalculationRepository } from './repositories/payroll-calculation.repository';
import { PayCalculationStepRepository } from './repositories/calculation-step.repository';
import { PayPayslipRepository } from './repositories/payslip.repository';
import { PayPayrollReviewRepository } from './repositories/payroll-review.repository';
import { PayPayrollTimelineRepository } from './repositories/payroll-timeline.repository';
import { PayPayrollWorkflowRepository } from './repositories/payroll-workflow.repository';
import { PayPayrollRunWorkflowSnapshotRepository } from './repositories/payroll-run-workflow-snapshot.repository';

import { AttendanceModule } from '../attendance/attendance.module';
import { EventsModule } from '../../core/events/events.module';

import { PayJournalRepository } from './repositories/journal.repository';
import { PayPaymentBatchRepository } from './repositories/payment-batch.repository';
import { PayArrearRepository } from './repositories/arrear.repository';
import { PayPayrollAdjustmentRepository } from './repositories/payroll-adjustment.repository';

import { PayrollJournalAssembler } from './services/payroll-journal-assembler.service';
import { PaymentBatchService } from './services/payment-batch.service';

const repositories = [
  PayPayrollPolicyRepository,
  PayPayrollPeriodRepository,
  PaySalaryComponentRepository,
  PaySalaryStructureRepository,
  PaySalaryAssignmentRepository,
  PayPayrollRunRepository,
  PayPayrollSnapshotRepository,
  PayPayrollCalculationRepository,
  PayCalculationStepRepository,
  PayPayslipRepository,
  PayPayrollReviewRepository,
  PayPayrollTimelineRepository,
  PayPayrollWorkflowRepository,
  PayPayrollRunWorkflowSnapshotRepository,
  PayJournalRepository,
  PayPaymentBatchRepository,
  PayArrearRepository,
  PayPayrollAdjustmentRepository
];

const services = [
  PayrollQueryService,
  PayrollFormulaEngine,
  PayrollCalculationService,
  PayslipService,
  JournalService,
  PayrollStateMachineService,
  PayrollSnapshotService,
  PayrollExecutionService,
  PayrollReviewService,
  PayslipAssembler,
  PlatformPayrollSDK,
  PayrollJournalAssembler,
  PaymentBatchService
];


import { CreatePayrollRunHandler } from './commands/handlers/create-payroll-run.handler';
import { StartPayrollCollectionHandler } from './commands/handlers/start-payroll-collection.handler';
import { GeneratePayrollSnapshotsHandler } from './commands/handlers/generate-payroll-snapshots.handler';
import { CalculatePayrollHandler } from './commands/handlers/calculate-payroll.handler';
import { ApprovePayrollHandler } from './commands/handlers/approve-payroll.handler';
import { LockPayrollHandler } from './commands/handlers/lock-payroll.handler';
import { ProcessPayrollHandler } from './commands/handlers/process-payroll.handler';
import { CancelPayrollHandler } from './commands/handlers/cancel-payroll.handler';
import { ReopenPayrollHandler } from './commands/handlers/reopen-payroll.handler';
import { RegenerateEmployeePayrollHandler } from './commands/handlers/regenerate-employee-payroll.handler';
import { SubmitPayrollReviewApprovalHandler } from './commands/handlers/submit-payroll-review-approval.handler';
import { SubmitPayrollReviewRejectionHandler } from './commands/handlers/submit-payroll-review-rejection.handler';

const handlers = [
  CreatePayrollRunHandler,
  StartPayrollCollectionHandler,
  GeneratePayrollSnapshotsHandler,
  CalculatePayrollHandler,
  ApprovePayrollHandler,
  LockPayrollHandler,
  ProcessPayrollHandler,
  CancelPayrollHandler,
  ReopenPayrollHandler,
  RegenerateEmployeePayrollHandler,
  SubmitPayrollReviewApprovalHandler,
  SubmitPayrollReviewRejectionHandler
];

import { PayrollRunController } from './controllers/payroll-run.controller';
import { PayrollReviewController } from './controllers/payroll-review.controller';
import { PayrollQueryController } from './controllers/payroll-query.controller';
import { PayrollMapper } from './dtos/mapping/payroll.mapper';

const controllers = [
  PayrollRunController,
  PayrollReviewController,
  PayrollQueryController
];

@Module({
    imports: [
      PrismaModule,
      AttendanceModule,
      EventsModule
    ],
    controllers: [
        ...controllers
    ],
    providers: [
        PayrollMapper,
        ...repositories,
        ...services,
        ...handlers
    ],
    exports: [
        PayrollMapper,
        ...repositories,
        ...services
    ]
})
export class PayrollModule {}
