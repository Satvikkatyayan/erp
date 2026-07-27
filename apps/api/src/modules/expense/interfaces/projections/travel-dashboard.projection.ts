import { ReadModelVersion } from '../../../../core/cqrs/read-model-version.interface';

export interface TravelDashboardProjection extends ReadModelVersion {
  upcomingTrips: number;
  pendingSettlements: number;
  activeTravels: any[];
}
