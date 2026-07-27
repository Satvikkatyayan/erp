import { Module } from '@nestjs/common';
import { EmployeeLifecycleService } from './services/employee-lifecycle.service';
import { EmployeeHierarchyQueryService } from './services/employee-hierarchy-query.service';
import { EmployeeValidationService } from './services/employee-validation.service';
import { EmployeeNumberService } from './services/employee-number.service';
import { EmployeeTimelineService } from './services/employee-timeline.service';
import { EmployeeAssignmentService } from './services/employee-assignment.service';
import { EmployeeDocumentService } from './services/employee-document.service';
import { EmployeeBootstrapService } from './services/employee-bootstrap.service';
import { ComplianceExpirationWorker } from './workers/compliance-expiration.worker';

@Module({
  providers: [
    EmployeeLifecycleService,
    EmployeeHierarchyQueryService,
    EmployeeValidationService,
    EmployeeNumberService,
    EmployeeTimelineService,
    EmployeeAssignmentService,
    EmployeeDocumentService,
    EmployeeBootstrapService,
    ComplianceExpirationWorker
  ],
  exports: [
    EmployeeLifecycleService,
    EmployeeHierarchyQueryService,
    EmployeeValidationService,
    EmployeeNumberService,
    EmployeeTimelineService,
    EmployeeAssignmentService,
    EmployeeDocumentService
  ]
})
export class EmployeeModule {}
