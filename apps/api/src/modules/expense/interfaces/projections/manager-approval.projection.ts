import { ReadModelVersion } from '../../../../core/cqrs/read-model-version.interface';

export interface ManagerApprovalProjection extends ReadModelVersion {
  managerId: string;
  pendingCount: number;
  urgentApprovals: any[];
}
