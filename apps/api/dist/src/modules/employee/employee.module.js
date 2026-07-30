"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const employee_repository_1 = require("./repositories/employee.repository");
const job_assignment_repository_1 = require("./repositories/job-assignment.repository");
const timeline_repository_1 = require("./repositories/timeline.repository");
const snapshot_repository_1 = require("./repositories/snapshot.repository");
const employee_execution_service_1 = require("./services/employee-execution.service");
const employee_lifecycle_controller_1 = require("./controllers/employee-lifecycle.controller");
const employee_query_controller_1 = require("./controllers/employee-query.controller");
const employee_assignment_controller_1 = require("./controllers/employee-assignment.controller");
const employee_organization_controller_1 = require("./controllers/employee-organization.controller");
const employee_mapper_1 = require("./api/mappers/employee.mapper");
const employee_query_service_1 = require("./services/employee-query.service");
const platform_employee_sdk_1 = require("./sdk/platform-employee.sdk");
const onboard_employee_handler_1 = require("./commands/handlers/onboard-employee.handler");
const join_employee_handler_1 = require("./commands/handlers/join-employee.handler");
const begin_probation_handler_1 = require("./commands/handlers/begin-probation.handler");
const confirm_employee_handler_1 = require("./commands/handlers/confirm-employee.handler");
const transfer_employee_handler_1 = require("./commands/handlers/transfer-employee.handler");
const promote_employee_handler_1 = require("./commands/handlers/promote-employee.handler");
const resign_employee_handler_1 = require("./commands/handlers/resign-employee.handler");
const terminate_employee_handler_1 = require("./commands/handlers/terminate-employee.handler");
const exit_employee_handler_1 = require("./commands/handlers/exit-employee.handler");
const rehire_employee_handler_1 = require("./commands/handlers/rehire-employee.handler");
const get_employee_profile_handler_1 = require("./queries/handlers/get-employee-profile.handler");
const get_employee_summary_handler_1 = require("./queries/handlers/get-employee-summary.handler");
const get_current_assignment_handler_1 = require("./queries/handlers/get-current-assignment.handler");
const get_assignment_history_handler_1 = require("./queries/handlers/get-assignment-history.handler");
const get_employee_timeline_handler_1 = require("./queries/handlers/get-employee-timeline.handler");
const search_employees_handler_1 = require("./queries/handlers/search-employees.handler");
const get_employees_by_manager_handler_1 = require("./queries/handlers/get-employees-by-manager.handler");
const get_employees_by_department_handler_1 = require("./queries/handlers/get-employees-by-department.handler");
const get_employees_by_project_handler_1 = require("./queries/handlers/get-employees-by-project.handler");
const get_employees_by_organization_handler_1 = require("./queries/handlers/get-employees-by-organization.handler");
const get_employees_by_branch_handler_1 = require("./queries/handlers/get-employees-by-branch.handler");
const get_employment_status_handler_1 = require("./queries/handlers/get-employment-status.handler");
const get_exit_information_handler_1 = require("./queries/handlers/get-exit-information.handler");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            employee_lifecycle_controller_1.EmployeeLifecycleController,
            employee_query_controller_1.EmployeeQueryController,
            employee_assignment_controller_1.EmployeeAssignmentController,
            employee_organization_controller_1.EmployeeOrganizationController
        ],
        providers: [
            employee_mapper_1.EmployeeMapper,
            employee_repository_1.EmpEmployeeRepository,
            job_assignment_repository_1.EmpJobAssignmentRepository,
            timeline_repository_1.EmpEmployeeTimelineRepository,
            snapshot_repository_1.EmpEmployeeSnapshotRepository,
            employee_execution_service_1.EmployeeExecutionService,
            onboard_employee_handler_1.OnboardEmployeeHandler,
            join_employee_handler_1.JoinEmployeeHandler,
            begin_probation_handler_1.BeginProbationHandler,
            confirm_employee_handler_1.ConfirmEmployeeHandler,
            transfer_employee_handler_1.TransferEmployeeHandler,
            promote_employee_handler_1.PromoteEmployeeHandler,
            resign_employee_handler_1.ResignEmployeeHandler,
            terminate_employee_handler_1.TerminateEmployeeHandler,
            exit_employee_handler_1.ExitEmployeeHandler,
            rehire_employee_handler_1.RehireEmployeeHandler,
            employee_query_service_1.EmployeeQueryService,
            get_employee_profile_handler_1.GetEmployeeProfileHandler,
            get_employee_summary_handler_1.GetEmployeeSummaryHandler,
            get_current_assignment_handler_1.GetCurrentAssignmentHandler,
            get_assignment_history_handler_1.GetAssignmentHistoryHandler,
            get_employee_timeline_handler_1.GetEmployeeTimelineHandler,
            search_employees_handler_1.SearchEmployeesHandler,
            get_employees_by_manager_handler_1.GetEmployeesByManagerHandler,
            get_employees_by_department_handler_1.GetEmployeesByDepartmentHandler,
            get_employees_by_project_handler_1.GetEmployeesByProjectHandler,
            get_employees_by_organization_handler_1.GetEmployeesByOrganizationHandler,
            get_employees_by_branch_handler_1.GetEmployeesByBranchHandler,
            get_employment_status_handler_1.GetEmploymentStatusHandler,
            get_exit_information_handler_1.GetExitInformationHandler,
            platform_employee_sdk_1.PlatformEmployeeSDK,
        ],
        exports: [
            platform_employee_sdk_1.PlatformEmployeeSDK
        ]
    })
], EmployeeModule);
//# sourceMappingURL=employee.module.js.map