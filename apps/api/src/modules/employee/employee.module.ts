import { Module } from '@nestjs/common';
import { EmpEmployeeRepository } from './repositories/employee.repository';
import { EmpJobAssignmentRepository } from './repositories/job-assignment.repository';
import { EmpEmployeeTimelineRepository } from './repositories/timeline.repository';
import { EmpEmployeeSnapshotRepository } from './repositories/snapshot.repository';
import { EmployeeExecutionService } from './services/employee-execution.service';

import { EmployeeLifecycleController } from './controllers/employee-lifecycle.controller';
import { EmployeeQueryController } from './controllers/employee-query.controller';
import { EmployeeAssignmentController } from './controllers/employee-assignment.controller';
import { EmployeeOrganizationController } from './controllers/employee-organization.controller';

import { EmployeeMapper } from './api/mappers/employee.mapper';
import { EmployeeQueryService } from './services/employee-query.service';
import { PlatformEmployeeSDK } from './sdk/platform-employee.sdk';

// Command Handlers
import { OnboardEmployeeHandler } from './commands/handlers/onboard-employee.handler';
import { JoinEmployeeHandler } from './commands/handlers/join-employee.handler';
import { BeginProbationHandler } from './commands/handlers/begin-probation.handler';
import { ConfirmEmployeeHandler } from './commands/handlers/confirm-employee.handler';
import { TransferEmployeeHandler } from './commands/handlers/transfer-employee.handler';
import { PromoteEmployeeHandler } from './commands/handlers/promote-employee.handler';
import { ResignEmployeeHandler } from './commands/handlers/resign-employee.handler';
import { TerminateEmployeeHandler } from './commands/handlers/terminate-employee.handler';
import { ExitEmployeeHandler } from './commands/handlers/exit-employee.handler';
import { RehireEmployeeHandler } from './commands/handlers/rehire-employee.handler';

// Query Handlers
import { GetEmployeeProfileHandler } from './queries/handlers/get-employee-profile.handler';
import { GetEmployeeSummaryHandler } from './queries/handlers/get-employee-summary.handler';
import { GetCurrentAssignmentHandler } from './queries/handlers/get-current-assignment.handler';
import { GetAssignmentHistoryHandler } from './queries/handlers/get-assignment-history.handler';
import { GetEmployeeTimelineHandler } from './queries/handlers/get-employee-timeline.handler';
import { SearchEmployeesHandler } from './queries/handlers/search-employees.handler';
import { GetEmployeesByManagerHandler } from './queries/handlers/get-employees-by-manager.handler';
import { GetEmployeesByDepartmentHandler } from './queries/handlers/get-employees-by-department.handler';
import { GetEmployeesByProjectHandler } from './queries/handlers/get-employees-by-project.handler';
import { GetEmployeesByOrganizationHandler } from './queries/handlers/get-employees-by-organization.handler';
import { GetEmployeesByBranchHandler } from './queries/handlers/get-employees-by-branch.handler';
import { GetEmploymentStatusHandler } from './queries/handlers/get-employment-status.handler';
import { GetExitInformationHandler } from './queries/handlers/get-exit-information.handler';

@Module({
  imports: [],
  controllers: [
    EmployeeLifecycleController,
    EmployeeQueryController,
    EmployeeAssignmentController,
    EmployeeOrganizationController
  ],
  providers: [
    EmployeeMapper,
    // Repositories
    EmpEmployeeRepository,
    EmpJobAssignmentRepository,
    EmpEmployeeTimelineRepository,
    EmpEmployeeSnapshotRepository,
    
    // Execution
    EmployeeExecutionService,
    
    // Commands Handlers
    OnboardEmployeeHandler,
    JoinEmployeeHandler,
    BeginProbationHandler,
    ConfirmEmployeeHandler,
    TransferEmployeeHandler,
    PromoteEmployeeHandler,
    ResignEmployeeHandler,
    TerminateEmployeeHandler,
    ExitEmployeeHandler,
    RehireEmployeeHandler,
    
    // Queries
    EmployeeQueryService,
    GetEmployeeProfileHandler,
    GetEmployeeSummaryHandler,
    GetCurrentAssignmentHandler,
    GetAssignmentHistoryHandler,
    GetEmployeeTimelineHandler,
    SearchEmployeesHandler,
    GetEmployeesByManagerHandler,
    GetEmployeesByDepartmentHandler,
    GetEmployeesByProjectHandler,
    GetEmployeesByOrganizationHandler,
    GetEmployeesByBranchHandler,
    GetEmploymentStatusHandler,
    GetExitInformationHandler,
    
    // SDK
    PlatformEmployeeSDK,
  ],
  exports: [
    PlatformEmployeeSDK
  ]
})
export class EmployeeModule {}

