"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmployeeDashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDashboardService = void 0;
const common_1 = require("@nestjs/common");
const dashboard_widget_provider_1 = require("../widgets/dashboard-widget.provider");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let EmployeeDashboardService = EmployeeDashboardService_1 = class EmployeeDashboardService {
    constructor(provider, prisma) {
        this.provider = provider;
        this.prisma = prisma;
        this.logger = new common_1.Logger(EmployeeDashboardService_1.name);
    }
    async getDashboard(ctx) {
        const prefs = await this.prisma.essDashboardWidget.findMany({
            where: { employeeId: ctx.employeeId, isVisible: true },
            orderBy: { order: 'asc' }
        });
        let widgetKeys = prefs.map(p => p.widgetKey);
        if (widgetKeys.length === 0) {
            widgetKeys = this.provider.getAvailableWidgets();
        }
        const widgets = [];
        for (const key of widgetKeys) {
            try {
                const data = await this.provider.getWidgetData(ctx, key);
                if (data) {
                    widgets.push({
                        key,
                        ...data
                    });
                }
            }
            catch (err) {
                this.logger.error(`Failed to fetch widget ${key}: ${err instanceof Error ? err.message : String(err)}`);
            }
        }
        const shortcuts = await this.prisma.essEmployeeShortcut.findMany({
            where: { employeeId: ctx.employeeId },
            orderBy: { order: 'asc' }
        });
        return {
            widgets,
            shortcuts
        };
    }
};
exports.EmployeeDashboardService = EmployeeDashboardService;
exports.EmployeeDashboardService = EmployeeDashboardService = EmployeeDashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dashboard_widget_provider_1.DashboardWidgetProvider,
        prisma_service_1.PrismaService])
], EmployeeDashboardService);
//# sourceMappingURL=employee-dashboard.service.js.map