import { EmployeeDashboardService } from '../services/employee-dashboard.service';
export declare class EssDashboardController {
    private readonly dashboardService;
    constructor(dashboardService: EmployeeDashboardService);
    getDashboard(req: any): Promise<{
        widgets: any[];
        shortcuts: {
            id: string;
            employeeId: string;
            tenantId: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            label: string;
            url: string;
            icon: string | null;
        }[];
    }>;
}
//# sourceMappingURL=ess-dashboard.controller.d.ts.map