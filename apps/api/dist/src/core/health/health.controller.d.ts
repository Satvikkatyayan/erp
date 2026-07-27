import { HealthCheckService, HttpHealthIndicator, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../../common/prisma/prisma.service';
export declare class HealthController {
    private health;
    private http;
    private prisma;
    private prismaService;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, prisma: PrismaHealthIndicator, prismaService: PrismaService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult<"database">, Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult<"database">>, Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & import("@nestjs/terminus").HealthIndicatorResult<"database">>>>;
}
//# sourceMappingURL=health.controller.d.ts.map