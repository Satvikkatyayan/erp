import { HealthContributor, HealthReport, HealthStatus } from './health.contracts';
export declare class HealthAggregator {
    private contributors;
    register(contributor: HealthContributor): void;
    getAggregateHealth(): Promise<{
        status: HealthStatus;
        components: Record<string, HealthReport>;
    }>;
}
//# sourceMappingURL=health.aggregator.d.ts.map