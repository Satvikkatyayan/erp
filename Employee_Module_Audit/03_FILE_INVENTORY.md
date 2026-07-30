# 03_FILE_INVENTORY

## Table of Contents
1. [queries.dto.ts](#queriesdtots)
2. [requests.dto.ts](#requestsdtots)
3. [responses.dto.ts](#responsesdtots)
4. [employee.mapper.ts](#employeemapperts)
5. [begin-probation.command.ts](#begin-probationcommandts)
6. [confirm-employee.command.ts](#confirm-employeecommandts)
7. [exit-employee.command.ts](#exit-employeecommandts)
8. [begin-probation.handler.ts](#begin-probationhandlerts)
9. [confirm-employee.handler.ts](#confirm-employeehandlerts)
10. [exit-employee.handler.ts](#exit-employeehandlerts)
11. [join-employee.handler.ts](#join-employeehandlerts)
12. [onboard-employee.handler.ts](#onboard-employeehandlerts)
13. [promote-employee.handler.ts](#promote-employeehandlerts)
14. [rehire-employee.handler.ts](#rehire-employeehandlerts)
15. [resign-employee.handler.ts](#resign-employeehandlerts)
16. [terminate-employee.handler.ts](#terminate-employeehandlerts)
17. [transfer-employee.handler.ts](#transfer-employeehandlerts)
18. [join-employee.command.ts](#join-employeecommandts)
19. [onboard-employee.command.ts](#onboard-employeecommandts)
20. [promote-employee.command.ts](#promote-employeecommandts)
21. [rehire-employee.command.ts](#rehire-employeecommandts)
22. [resign-employee.command.ts](#resign-employeecommandts)
23. [terminate-employee.command.ts](#terminate-employeecommandts)
24. [transfer-employee.command.ts](#transfer-employeecommandts)
25. [employee-assignment.controller.ts](#employee-assignmentcontrollerts)
26. [employee-lifecycle.controller.ts](#employee-lifecyclecontrollerts)
27. [employee-organization.controller.ts](#employee-organizationcontrollerts)
28. [employee-query.controller.ts](#employee-querycontrollerts)
29. [employee.module.ts](#employeemodulets)
30. [employee.events.ts](#employeeeventsts)
31. [get-assignment-history.query.ts](#get-assignment-historyqueryts)
32. [get-current-assignment.query.ts](#get-current-assignmentqueryts)
33. [get-employee-profile.query.ts](#get-employee-profilequeryts)
34. [get-employee-summary.query.ts](#get-employee-summaryqueryts)
35. [get-employee-timeline.query.ts](#get-employee-timelinequeryts)
36. [get-employees-by-branch.query.ts](#get-employees-by-branchqueryts)
37. [get-employees-by-department.query.ts](#get-employees-by-departmentqueryts)
38. [get-employees-by-manager.query.ts](#get-employees-by-managerqueryts)
39. [get-employees-by-organization.query.ts](#get-employees-by-organizationqueryts)
40. [get-employees-by-project.query.ts](#get-employees-by-projectqueryts)
41. [get-employment-status.query.ts](#get-employment-statusqueryts)
42. [get-exit-information.query.ts](#get-exit-informationqueryts)
43. [get-assignment-history.handler.ts](#get-assignment-historyhandlerts)
44. [get-current-assignment.handler.ts](#get-current-assignmenthandlerts)
45. [get-employee-profile.handler.ts](#get-employee-profilehandlerts)
46. [get-employee-summary.handler.ts](#get-employee-summaryhandlerts)
47. [get-employee-timeline.handler.ts](#get-employee-timelinehandlerts)
48. [get-employees-by-branch.handler.ts](#get-employees-by-branchhandlerts)
49. [get-employees-by-department.handler.ts](#get-employees-by-departmenthandlerts)
50. [get-employees-by-manager.handler.ts](#get-employees-by-managerhandlerts)
51. [get-employees-by-organization.handler.ts](#get-employees-by-organizationhandlerts)
52. [get-employees-by-project.handler.ts](#get-employees-by-projecthandlerts)
53. [get-employment-status.handler.ts](#get-employment-statushandlerts)
54. [get-exit-information.handler.ts](#get-exit-informationhandlerts)
55. [search-employees.handler.ts](#search-employeeshandlerts)
56. [search-employees.query.ts](#search-employeesqueryts)
57. [employee.repository.ts](#employeerepositoryts)
58. [job-assignment.repository.ts](#job-assignmentrepositoryts)
59. [snapshot.repository.ts](#snapshotrepositoryts)
60. [timeline.repository.ts](#timelinerepositoryts)
61. [employee-sdk.dto.ts](#employee-sdkdtots)
62. [platform-employee.sdk.ts](#platform-employeesdkts)
63. [employee-execution.service.ts](#employee-executionservicets)
64. [employee-query.service.ts](#employee-queryservicets)

## File Details
### queries.dto.ts
- **Filename:** queries.dto.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/api/dtos/queries.dto.ts
- **Folder:** api/dtos
- **Purpose:** Defines data transfer objects for API payload typing and validation.
- **Size (LOC):** 52
- **Imports:** class-validator, @nestjs/swagger, class-transformer
- **Dependencies:** 3
- **Exports:** class PaginationDto, class SortDto, class EmployeeFilterDto, class SearchEmployeesDto
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### requests.dto.ts
- **Filename:** requests.dto.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/api/dtos/requests.dto.ts
- **Folder:** api/dtos
- **Purpose:** Defines data transfer objects for API payload typing and validation.
- **Size (LOC):** 105
- **Imports:** class-validator, class-transformer, @nestjs/swagger
- **Dependencies:** 3
- **Exports:** class AssignmentDataDto, class OnboardingDataDto, class OnboardEmployeeRequestDto, class JoinEmployeeRequestDto, class TransferEmployeeRequestDto, class PromoteEmployeeRequestDto, class ResignEmployeeRequestDto, class TerminateEmployeeRequestDto, class ExitEmployeeRequestDto, class RehireEmployeeRequestDto, class ConfirmEmployeeRequestDto
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### responses.dto.ts
- **Filename:** responses.dto.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/api/dtos/responses.dto.ts
- **Folder:** api/dtos
- **Purpose:** Defines data transfer objects for API payload typing and validation.
- **Size (LOC):** 26
- **Imports:** @nestjs/swagger
- **Dependencies:** 1
- **Exports:** class APIResponseDto
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee.mapper.ts
- **Filename:** employee.mapper.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/api/mappers/employee.mapper.ts
- **Folder:** api/mappers
- **Purpose:** Transforms internal objects to standard API responses.
- **Size (LOC):** 32
- **Imports:** @nestjs/common, ../dtos/responses.dto, ../../../../core/context/request-context.service
- **Dependencies:** 3
- **Exports:** class EmployeeMapper
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### begin-probation.command.ts
- **Filename:** begin-probation.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/begin-probation.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class BeginProbationCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### confirm-employee.command.ts
- **Filename:** confirm-employee.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/confirm-employee.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 9
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class ConfirmEmployeeCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### exit-employee.command.ts
- **Filename:** exit-employee.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/exit-employee.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 8
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class ExitEmployeeCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### begin-probation.handler.ts
- **Filename:** begin-probation.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/begin-probation.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../begin-probation.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class BeginProbationHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### confirm-employee.handler.ts
- **Filename:** confirm-employee.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/confirm-employee.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../confirm-employee.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class ConfirmEmployeeHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### exit-employee.handler.ts
- **Filename:** exit-employee.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/exit-employee.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../exit-employee.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class ExitEmployeeHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### join-employee.handler.ts
- **Filename:** join-employee.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/join-employee.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../join-employee.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class JoinEmployeeHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### onboard-employee.handler.ts
- **Filename:** onboard-employee.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/onboard-employee.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../onboard-employee.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class OnboardEmployeeHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### promote-employee.handler.ts
- **Filename:** promote-employee.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/promote-employee.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../promote-employee.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class PromoteEmployeeHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### rehire-employee.handler.ts
- **Filename:** rehire-employee.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/rehire-employee.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../rehire-employee.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class RehireEmployeeHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### resign-employee.handler.ts
- **Filename:** resign-employee.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/resign-employee.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../resign-employee.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class ResignEmployeeHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### terminate-employee.handler.ts
- **Filename:** terminate-employee.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/terminate-employee.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../terminate-employee.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class TerminateEmployeeHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### transfer-employee.handler.ts
- **Filename:** transfer-employee.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/handlers/transfer-employee.handler.ts
- **Folder:** commands/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 21
- **Imports:** @nestjs/common, ../transfer-employee.command, ../../services/employee-execution.service, ../../../../core/events/platform-event-publisher.service
- **Dependencies:** 4
- **Exports:** class TransferEmployeeHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### join-employee.command.ts
- **Filename:** join-employee.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/join-employee.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class JoinEmployeeCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### onboard-employee.command.ts
- **Filename:** onboard-employee.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/onboard-employee.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class OnboardEmployeeCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### promote-employee.command.ts
- **Filename:** promote-employee.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/promote-employee.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 8
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class PromoteEmployeeCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### rehire-employee.command.ts
- **Filename:** rehire-employee.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/rehire-employee.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 8
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class RehireEmployeeCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### resign-employee.command.ts
- **Filename:** resign-employee.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/resign-employee.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 8
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class ResignEmployeeCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### terminate-employee.command.ts
- **Filename:** terminate-employee.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/terminate-employee.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 8
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class TerminateEmployeeCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### transfer-employee.command.ts
- **Filename:** transfer-employee.command.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/commands/transfer-employee.command.ts
- **Folder:** commands
- **Purpose:** Defines a command intent.
- **Size (LOC):** 8
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class TransferEmployeeCommand
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee-assignment.controller.ts
- **Filename:** employee-assignment.controller.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/controllers/employee-assignment.controller.ts
- **Folder:** controllers
- **Purpose:** Handles HTTP requests and translates them into commands/queries.
- **Size (LOC):** 49
- **Imports:** @nestjs/common, @nestjs/swagger, ../../../core/authentication/guards/jwt-auth.guard, ../../../core/authorization/guards/permission.guard, ../../../core/authorization/decorators/require-permissions.decorator, ../api/mappers/employee.mapper, ../queries/get-current-assignment.query, ../queries/get-assignment-history.query, ../queries/handlers/get-current-assignment.handler, ../queries/handlers/get-assignment-history.handler
- **Dependencies:** 10
- **Exports:** class EmployeeAssignmentController
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee-lifecycle.controller.ts
- **Filename:** employee-lifecycle.controller.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/controllers/employee-lifecycle.controller.ts
- **Folder:** controllers
- **Purpose:** Handles HTTP requests and translates them into commands/queries.
- **Size (LOC):** 181
- **Imports:** @nestjs/common, @nestjs/swagger, ../../../core/authentication/guards/jwt-auth.guard, ../../../core/authorization/guards/permission.guard, ../../../core/authorization/decorators/require-permissions.decorator, ../api/mappers/employee.mapper, ../commands/onboard-employee.command, ../commands/join-employee.command, ../commands/begin-probation.command, ../commands/confirm-employee.command, ../commands/transfer-employee.command, ../commands/promote-employee.command, ../commands/resign-employee.command, ../commands/terminate-employee.command, ../commands/exit-employee.command, ../commands/rehire-employee.command, ../commands/handlers/onboard-employee.handler, ../commands/handlers/join-employee.handler, ../commands/handlers/begin-probation.handler, ../commands/handlers/confirm-employee.handler, ../commands/handlers/transfer-employee.handler, ../commands/handlers/promote-employee.handler, ../commands/handlers/resign-employee.handler, ../commands/handlers/terminate-employee.handler, ../commands/handlers/exit-employee.handler, ../commands/handlers/rehire-employee.handler
- **Dependencies:** 26
- **Exports:** class EmployeeLifecycleController
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee-organization.controller.ts
- **Filename:** employee-organization.controller.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/controllers/employee-organization.controller.ts
- **Folder:** controllers
- **Purpose:** Handles HTTP requests and translates them into commands/queries.
- **Size (LOC):** 91
- **Imports:** @nestjs/common, @nestjs/swagger, ../../../core/authentication/guards/jwt-auth.guard, ../../../core/authorization/guards/permission.guard, ../../../core/authorization/decorators/require-permissions.decorator, ../api/mappers/employee.mapper, ../queries/get-employees-by-manager.query, ../queries/get-employees-by-department.query, ../queries/get-employees-by-project.query, ../queries/get-employees-by-organization.query, ../queries/get-employees-by-branch.query, ../queries/handlers/get-employees-by-manager.handler, ../queries/handlers/get-employees-by-department.handler, ../queries/handlers/get-employees-by-project.handler, ../queries/handlers/get-employees-by-organization.handler, ../queries/handlers/get-employees-by-branch.handler
- **Dependencies:** 16
- **Exports:** class EmployeeOrganizationController
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee-query.controller.ts
- **Filename:** employee-query.controller.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/controllers/employee-query.controller.ts
- **Folder:** controllers
- **Purpose:** Handles HTTP requests and translates them into commands/queries.
- **Size (LOC):** 108
- **Imports:** @nestjs/common, @nestjs/swagger, ../../../core/authentication/guards/jwt-auth.guard, ../../../core/authorization/guards/permission.guard, ../../../core/authorization/decorators/require-permissions.decorator, ../api/mappers/employee.mapper, ../api/dtos/queries.dto, ../queries/get-employee-profile.query, ../queries/get-employee-summary.query, ../queries/get-employee-timeline.query, ../queries/search-employees.query, ../queries/get-employment-status.query, ../queries/get-exit-information.query, ../queries/handlers/get-employee-profile.handler, ../queries/handlers/get-employee-summary.handler, ../queries/handlers/get-employee-timeline.handler, ../queries/handlers/search-employees.handler, ../queries/handlers/get-employment-status.handler, ../queries/handlers/get-exit-information.handler
- **Dependencies:** 19
- **Exports:** class EmployeeQueryController
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee.module.ts
- **Filename:** employee.module.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/employee.module.ts
- **Folder:** .
- **Purpose:** Core module registration or configuration.
- **Size (LOC):** 100
- **Imports:** @nestjs/common, ./repositories/employee.repository, ./repositories/job-assignment.repository, ./repositories/timeline.repository, ./repositories/snapshot.repository, ./services/employee-execution.service, ./controllers/employee-lifecycle.controller, ./controllers/employee-query.controller, ./controllers/employee-assignment.controller, ./controllers/employee-organization.controller, ./api/mappers/employee.mapper, ./services/employee-query.service, ./sdk/platform-employee.sdk, ./commands/handlers/onboard-employee.handler, ./commands/handlers/join-employee.handler, ./commands/handlers/begin-probation.handler, ./commands/handlers/confirm-employee.handler, ./commands/handlers/transfer-employee.handler, ./commands/handlers/promote-employee.handler, ./commands/handlers/resign-employee.handler, ./commands/handlers/terminate-employee.handler, ./commands/handlers/exit-employee.handler, ./commands/handlers/rehire-employee.handler, ./queries/handlers/get-employee-profile.handler, ./queries/handlers/get-employee-summary.handler, ./queries/handlers/get-current-assignment.handler, ./queries/handlers/get-assignment-history.handler, ./queries/handlers/get-employee-timeline.handler, ./queries/handlers/search-employees.handler, ./queries/handlers/get-employees-by-manager.handler, ./queries/handlers/get-employees-by-department.handler, ./queries/handlers/get-employees-by-project.handler, ./queries/handlers/get-employees-by-organization.handler, ./queries/handlers/get-employees-by-branch.handler, ./queries/handlers/get-employment-status.handler, ./queries/handlers/get-exit-information.handler
- **Dependencies:** 36
- **Exports:** class EmployeeModule
- **Public/Internal:** Internal
- **Registration Location:** Root
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee.events.ts
- **Filename:** employee.events.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/events/employee.events.ts
- **Folder:** events
- **Purpose:** Defines domain events.
- **Size (LOC):** 159
- **Imports:** ../../../core/events/interfaces/domain-event.interface, uuid
- **Dependencies:** 2
- **Exports:** class EmployeeCreatedEvent, class EmployeeJoinedEvent, class EmployeeConfirmedEvent, class EmployeeTransferredEvent, class EmployeePromotedEvent, class EmployeeExitedEvent, class EmployeeRehiredEvent, class EmployeeTerminatedEvent, class EmployeeResignedEvent, class EmployeeProbationStartedEvent, class EmployeeTimelineCreatedEvent, class EmployeeSnapshotCreatedEvent, class WelcomeMailRequestedEvent
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-assignment-history.query.ts
- **Filename:** get-assignment-history.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-assignment-history.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetAssignmentHistoryQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-current-assignment.query.ts
- **Filename:** get-current-assignment.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-current-assignment.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetCurrentAssignmentQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employee-profile.query.ts
- **Filename:** get-employee-profile.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-employee-profile.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetEmployeeProfileQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employee-summary.query.ts
- **Filename:** get-employee-summary.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-employee-summary.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetEmployeeSummaryQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employee-timeline.query.ts
- **Filename:** get-employee-timeline.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-employee-timeline.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetEmployeeTimelineQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-branch.query.ts
- **Filename:** get-employees-by-branch.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-employees-by-branch.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 9
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetEmployeesByBranchQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-department.query.ts
- **Filename:** get-employees-by-department.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-employees-by-department.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 9
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetEmployeesByDepartmentQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-manager.query.ts
- **Filename:** get-employees-by-manager.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-employees-by-manager.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 9
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetEmployeesByManagerQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-organization.query.ts
- **Filename:** get-employees-by-organization.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-employees-by-organization.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 9
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetEmployeesByOrganizationQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-project.query.ts
- **Filename:** get-employees-by-project.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-employees-by-project.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 9
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetEmployeesByProjectQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employment-status.query.ts
- **Filename:** get-employment-status.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-employment-status.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetEmploymentStatusQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-exit-information.query.ts
- **Filename:** get-exit-information.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/get-exit-information.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 7
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class GetExitInformationQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-assignment-history.handler.ts
- **Filename:** get-assignment-history.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-assignment-history.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-assignment-history.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetAssignmentHistoryHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-current-assignment.handler.ts
- **Filename:** get-current-assignment.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-current-assignment.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-current-assignment.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetCurrentAssignmentHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employee-profile.handler.ts
- **Filename:** get-employee-profile.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-employee-profile.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-employee-profile.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetEmployeeProfileHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employee-summary.handler.ts
- **Filename:** get-employee-summary.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-employee-summary.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-employee-summary.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetEmployeeSummaryHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employee-timeline.handler.ts
- **Filename:** get-employee-timeline.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-employee-timeline.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-employee-timeline.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetEmployeeTimelineHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-branch.handler.ts
- **Filename:** get-employees-by-branch.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-employees-by-branch.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-employees-by-branch.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetEmployeesByBranchHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-department.handler.ts
- **Filename:** get-employees-by-department.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-employees-by-department.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-employees-by-department.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetEmployeesByDepartmentHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-manager.handler.ts
- **Filename:** get-employees-by-manager.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-employees-by-manager.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-employees-by-manager.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetEmployeesByManagerHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-organization.handler.ts
- **Filename:** get-employees-by-organization.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-employees-by-organization.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-employees-by-organization.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetEmployeesByOrganizationHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employees-by-project.handler.ts
- **Filename:** get-employees-by-project.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-employees-by-project.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-employees-by-project.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetEmployeesByProjectHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-employment-status.handler.ts
- **Filename:** get-employment-status.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-employment-status.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-employment-status.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetEmploymentStatusHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### get-exit-information.handler.ts
- **Filename:** get-exit-information.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/get-exit-information.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../get-exit-information.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class GetExitInformationHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### search-employees.handler.ts
- **Filename:** search-employees.handler.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/handlers/search-employees.handler.ts
- **Folder:** queries/handlers
- **Purpose:** Executes a specific command or query.
- **Size (LOC):** 15
- **Imports:** @nestjs/common, ../search-employees.query, ../../services/employee-query.service, ../../../../core/cqrs/query-result
- **Dependencies:** 4
- **Exports:** class SearchEmployeesHandler
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### search-employees.query.ts
- **Filename:** search-employees.query.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/queries/search-employees.query.ts
- **Folder:** queries
- **Purpose:** Defines a query intent.
- **Size (LOC):** 8
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class SearchEmployeesQuery
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee.repository.ts
- **Filename:** employee.repository.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/repositories/employee.repository.ts
- **Folder:** repositories
- **Purpose:** Data access layer; interacts exclusively with Prisma.
- **Size (LOC):** 129
- **Imports:** @nestjs/common, ../../../common/prisma/prisma.service, uuid
- **Dependencies:** 3
- **Exports:** class EmpEmployeeRepository
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### job-assignment.repository.ts
- **Filename:** job-assignment.repository.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/repositories/job-assignment.repository.ts
- **Folder:** repositories
- **Purpose:** Data access layer; interacts exclusively with Prisma.
- **Size (LOC):** 58
- **Imports:** @nestjs/common, ../../../common/prisma/prisma.service, uuid
- **Dependencies:** 3
- **Exports:** class EmpJobAssignmentRepository
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### snapshot.repository.ts
- **Filename:** snapshot.repository.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/repositories/snapshot.repository.ts
- **Folder:** repositories
- **Purpose:** Data access layer; interacts exclusively with Prisma.
- **Size (LOC):** 28
- **Imports:** @nestjs/common, ../../../common/prisma/prisma.service, uuid
- **Dependencies:** 3
- **Exports:** class EmpEmployeeSnapshotRepository
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### timeline.repository.ts
- **Filename:** timeline.repository.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/repositories/timeline.repository.ts
- **Folder:** repositories
- **Purpose:** Data access layer; interacts exclusively with Prisma.
- **Size (LOC):** 30
- **Imports:** @nestjs/common, ../../../common/prisma/prisma.service, uuid
- **Dependencies:** 3
- **Exports:** class EmpEmployeeTimelineRepository
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee-sdk.dto.ts
- **Filename:** employee-sdk.dto.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/sdk/dtos/employee-sdk.dto.ts
- **Folder:** sdk/dtos
- **Purpose:** Defines data transfer objects for API payload typing and validation.
- **Size (LOC):** 34
- **Imports:** None
- **Dependencies:** 0
- **Exports:** class EmployeeProfileDto, class EmployeeSummaryDto, class JobAssignmentDto, class TimelineEntryDto
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### platform-employee.sdk.ts
- **Filename:** platform-employee.sdk.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/sdk/platform-employee.sdk.ts
- **Folder:** sdk
- **Purpose:** Public interface exposed to other modules.
- **Size (LOC):** 206
- **Imports:** @nestjs/common, ../services/employee-query.service, ./dtos/employee-sdk.dto
- **Dependencies:** 3
- **Exports:** class PlatformEmployeeSDK
- **Public/Internal:** Public
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee-execution.service.ts
- **Filename:** employee-execution.service.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/services/employee-execution.service.ts
- **Folder:** services
- **Purpose:** Orchestrates business logic and/or transactions.
- **Size (LOC):** 289
- **Imports:** @nestjs/common, ../../../common/prisma/prisma.service, ../../../core/sdk/platform.sdk, ../repositories/employee.repository, ../repositories/job-assignment.repository, ../repositories/timeline.repository, ../repositories/snapshot.repository, ../../../core/cqrs/execution-result, ../commands/onboard-employee.command, ../commands/confirm-employee.command, ../commands/join-employee.command, ../commands/begin-probation.command, ../commands/transfer-employee.command, ../commands/promote-employee.command, ../commands/resign-employee.command, ../commands/terminate-employee.command, ../commands/exit-employee.command, ../commands/rehire-employee.command
- **Dependencies:** 18
- **Exports:** class EmployeeExecutionService
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

### employee-query.service.ts
- **Filename:** employee-query.service.ts
- **Path:** d:/erpvvinfratech/apps/api/src/modules/employee/services/employee-query.service.ts
- **Folder:** services
- **Purpose:** Orchestrates business logic and/or transactions.
- **Size (LOC):** 136
- **Imports:** @nestjs/common, ../repositories/employee.repository, ../repositories/job-assignment.repository, ../repositories/timeline.repository
- **Dependencies:** 4
- **Exports:** class EmployeeQueryService
- **Public/Internal:** Internal
- **Registration Location:** EmployeeModule
- **Creation Responsibility:** Developer implementing feature.
- **Future Responsibility:** Maintained as per CQRS bounds. Do not add business logic to controllers/repositories.

