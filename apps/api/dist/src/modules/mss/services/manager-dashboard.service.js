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
var ManagerDashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerDashboardService = void 0;
const common_1 = require("@nestjs/common");
const dashboard_widget_registry_1 = require("../widgets/dashboard-widget.registry");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let ManagerDashboardService = ManagerDashboardService_1 = class ManagerDashboardService {
    constructor(widgetRegistry, prisma) {
        this.widgetRegistry = widgetRegistry;
        this.prisma = prisma;
        this.logger = new common_1.Logger(ManagerDashboardService_1.name);
    }
    async getDashboard(ctx) {
        const widgets = await this.prisma.mssDashboardWidget.findMany({
            where: { managerId: ctx.employeeId },
            orderBy: { order: 'asc' }
        });
        const defaultWidgets = ['TeamSummary', 'ManagerApproval'];
        const activeWidgets = widgets.length > 0 ? widgets.map(w => w.widgetKey) : defaultWidgets;
        const payload = {};
        for (const key of activeWidgets) {
            const widget = this.widgetRegistry.get(key);
            if (widget) {
                try {
                    payload[key] = await widget.render(ctx);
                }
                catch (e) {
                    this.logger.error(`Failed to render widget ${key}: ${e.message}`);
                }
            }
        }
        return { widgets: payload };
    }
};
exports.ManagerDashboardService = ManagerDashboardService;
exports.ManagerDashboardService = ManagerDashboardService = ManagerDashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dashboard_widget_registry_1.DashboardWidgetRegistry,
        prisma_service_1.PrismaService])
], ManagerDashboardService);
//# sourceMappingURL=manager-dashboard.service.js.map