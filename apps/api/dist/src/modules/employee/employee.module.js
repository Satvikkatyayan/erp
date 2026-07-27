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
const employee_lifecycle_service_1 = require("./services/employee-lifecycle.service");
const employee_hierarchy_query_service_1 = require("./services/employee-hierarchy-query.service");
const employee_validation_service_1 = require("./services/employee-validation.service");
const employee_number_service_1 = require("./services/employee-number.service");
const employee_timeline_service_1 = require("./services/employee-timeline.service");
const employee_assignment_service_1 = require("./services/employee-assignment.service");
const employee_document_service_1 = require("./services/employee-document.service");
const employee_bootstrap_service_1 = require("./services/employee-bootstrap.service");
const compliance_expiration_worker_1 = require("./workers/compliance-expiration.worker");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        providers: [
            employee_lifecycle_service_1.EmployeeLifecycleService,
            employee_hierarchy_query_service_1.EmployeeHierarchyQueryService,
            employee_validation_service_1.EmployeeValidationService,
            employee_number_service_1.EmployeeNumberService,
            employee_timeline_service_1.EmployeeTimelineService,
            employee_assignment_service_1.EmployeeAssignmentService,
            employee_document_service_1.EmployeeDocumentService,
            employee_bootstrap_service_1.EmployeeBootstrapService,
            compliance_expiration_worker_1.ComplianceExpirationWorker
        ],
        exports: [
            employee_lifecycle_service_1.EmployeeLifecycleService,
            employee_hierarchy_query_service_1.EmployeeHierarchyQueryService,
            employee_validation_service_1.EmployeeValidationService,
            employee_number_service_1.EmployeeNumberService,
            employee_timeline_service_1.EmployeeTimelineService,
            employee_assignment_service_1.EmployeeAssignmentService,
            employee_document_service_1.EmployeeDocumentService
        ]
    })
], EmployeeModule);
//# sourceMappingURL=employee.module.js.map