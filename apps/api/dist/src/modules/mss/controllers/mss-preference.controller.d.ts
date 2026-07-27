import { ManagerPreferenceService } from '../services/manager-preference.service';
export declare class MssPreferenceController {
    private readonly service;
    constructor(service: ManagerPreferenceService);
    updatePreferences(req: any, payload: any): Promise<{
        language: string;
        id: string;
        timezone: string;
        tenantId: string;
        theme: string;
        managerId: string;
    }>;
}
//# sourceMappingURL=mss-preference.controller.d.ts.map