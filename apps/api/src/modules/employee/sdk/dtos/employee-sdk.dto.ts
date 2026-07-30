export class EmployeeProfileDto {
  id: string;
  tenantId: string;
  organizationId: string;
  employeeNumber: string;
  status: string;
  personalDetails?: any;
}

export class EmployeeSummaryDto {
  id: string;
  employeeNumber: string;
  status: string;
}

export class JobAssignmentDto {
  id: string;
  employeeId: string;
  departmentId?: string;
  designationId?: string;
  managerId?: string;
  projectId?: string;
  branchId?: string;
  effectiveFrom: Date;
  effectiveTo?: Date;
}

export class TimelineEntryDto {
  id: string;
  eventType: string;
  eventDate: Date;
  metadata?: any;
}
