import { ManagerFacade } from '../facades/manager.facade';
export declare class MssDashboardController {
    private readonly facade;
    constructor(facade: ManagerFacade);
    getDashboard(req: any): Promise<{
        widgets: {};
    }>;
}
//# sourceMappingURL=mss-dashboard.controller.d.ts.map