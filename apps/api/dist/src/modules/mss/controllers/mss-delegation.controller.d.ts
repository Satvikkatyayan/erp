import { ManagerDelegationService } from '../services/manager-delegation.service';
export declare class MssDelegationController {
    private readonly service;
    constructor(service: ManagerDelegationService);
    createDelegation(req: any, payload: any): Promise<{
        id: string;
        tenantId: string;
        status: string;
        reason: string | null;
        effectiveFrom: Date;
        effectiveTo: Date;
        managerId: string;
        scope: string;
        delegatedToId: string;
    }>;
}
//# sourceMappingURL=mss-delegation.controller.d.ts.map