export declare class LeaveRequestDto {
    id: string;
    tenantId: string;
    employeeId?: string;
    leaveNumber?: string;
    status: string;
    startDate?: Date;
    endDate?: Date;
    typeId?: string;
    reason?: string;
}
export declare class LeaveBalanceDto {
    id: string;
    tenantId: string;
    employeeId: string;
    leaveTypeId: string;
    allocated: number;
    used: number;
    available: number;
}
export declare class LeavePolicyDto {
    id: string;
    tenantId: string;
    name: string;
    description?: string;
}
export declare class LeaveTimelineEntryDto {
    id: string;
    eventType: string;
    eventDate: Date;
    metadata?: any;
}
export declare class LeaveSnapshotDto {
    id: string;
    leaveRequestId: string;
    payload: any;
    generatedAt: Date;
}
//# sourceMappingURL=leave-sdk.dto.d.ts.map