import { ReadModelVersion } from '../../../../core/cqrs/read-model-version.interface';

export interface RiskProjection extends ReadModelVersion {
  highRiskClaimsCount: number;
  flaggedEmployees: string[];
  recentAnomalies: any[];
}
