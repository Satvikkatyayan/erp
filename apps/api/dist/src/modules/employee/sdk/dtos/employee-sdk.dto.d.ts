export declare class EmployeeProfileDto {
    id: string;
    tenantId: string;
    organizationId: string;
    employeeNumber: string;
    status: string;
    personalDetails?: any;
}
export declare class EmployeeSummaryDto {
    id: string;
    employeeNumber: string;
    status: string;
}
export declare class JobAssignmentDto {
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
export declare class TimelineEntryDto {
    id: string;
    eventType: string;
    eventDate: Date;
    metadata?: any;
}
//# sourceMappingURL=employee-sdk.dto.d.ts.map