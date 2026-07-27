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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollWidget = void 0;
const common_1 = require("@nestjs/common");
const dashboard_widget_provider_1 = require("./dashboard-widget.provider");
const payroll_query_service_1 = require("../../payroll/services/payroll-query.service");
let PayrollWidget = class PayrollWidget {
    constructor(provider, queryService) {
        this.provider = provider;
        this.queryService = queryService;
        this.widgetKey = 'Payroll';
    }
    onModuleInit() {
        this.provider.registerWidget(this);
    }
    async getData(ctx) {
        const latest = await this.queryService.getLatestPayslip(ctx);
        return {
            type: 'Payroll',
            title: 'Latest Payslip',
            data: latest ? {
                period: latest.payrollCycle.name,
                netPay: latest.netPay,
                currency: 'USD',
                status: latest.status
            } : null
        };
    }
};
exports.PayrollWidget = PayrollWidget;
exports.PayrollWidget = PayrollWidget = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dashboard_widget_provider_1.DashboardWidgetProvider,
        payroll_query_service_1.PayrollQueryService])
], PayrollWidget);
//# sourceMappingURL=payroll.widget.js.map