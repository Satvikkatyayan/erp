export class LeaveRequestDto {
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

export class LeaveBalanceDto {
  id: string;
  tenantId: string;
  employeeId: string;
  leaveTypeId: string;
  allocated: number;
  used: number;
  available: number;
}

export class LeavePolicyDto {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
}

export class LeaveTimelineEntryDto {
  id: string;
  eventType: string;
  eventDate: Date;
  metadata?: any;
}

export class LeaveSnapshotDto {
  id: string;
  leaveRequestId: string;
  payload: any;
  generatedAt: Date;
}
