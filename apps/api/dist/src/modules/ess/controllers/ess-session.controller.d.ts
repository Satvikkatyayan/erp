import { EmployeeSessionService } from '../services/employee-session.service';
export declare class EssSessionController {
    private readonly sessionService;
    constructor(sessionService: EmployeeSessionService);
    getActiveSessions(req: any): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        ipAddress: string | null;
        userAgent: string | null;
        deviceId: string | null;
        tokenJti: string;
        expiresAt: Date;
    }[]>;
    registerDevice(req: any, body: {
        deviceId: string;
        deviceName: string;
    }): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deviceId: string;
        deviceName: string | null;
        isTrusted: boolean;
        lastUsedAt: Date;
    }>;
}
//# sourceMappingURL=ess-session.controller.d.ts.map