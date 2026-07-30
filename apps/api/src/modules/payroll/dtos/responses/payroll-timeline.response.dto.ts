export class PayrollTimelineResponseDto {
  id: string;
  payrollRunId: string;
  actor: string;
  action: string;
  reason?: string;
  previousState?: string;
  currentState?: string;
  version: number;
  createdAt: string;
}