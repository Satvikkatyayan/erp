export declare class LeaveDateRangeDto {
    startDate: string;
    endDate: string;
}
export declare class ApplyLeaveRequestDto {
    employeeId: string;
    leaveTypeId: string;
    dateRange: LeaveDateRangeDto;
    reason?: string;
}
export declare class ApproveLeaveRequestDto {
    comments?: string;
}
export declare class RejectLeaveRequestDto {
    reason: string;
}
export declare class CancelLeaveRequestDto {
    reason?: string;
}
//# sourceMappingURL=requests.dto.d.ts.map