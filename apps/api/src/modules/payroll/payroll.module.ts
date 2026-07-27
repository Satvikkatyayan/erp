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
  PayPayrollRunWorkflowSnapshotRepository
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
  PlatformPayrollSDK
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

@Module({
    imports: [
      PrismaModule,
      AttendanceModule,
      EventsModule
    ],
    providers: [
        ...repositories,
        ...services,
        ...handlers
    ],
    exports: [
        ...repositories,
        ...services
    ]
})
export class PayrollModule {}
