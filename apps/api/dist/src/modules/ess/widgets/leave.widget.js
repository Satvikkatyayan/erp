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
exports.LeaveWidget = void 0;
const common_1 = require("@nestjs/common");
const dashboard_widget_provider_1 = require("./dashboard-widget.provider");
const leave_query_service_1 = require("../../leave/services/leave-query.service");
let LeaveWidget = class LeaveWidget {
    constructor(provider, queryService) {
        this.provider = provider;
        this.queryService = queryService;
        this.widgetKey = 'Leave';
    }
    onModuleInit() {
        this.provider.registerWidget(this);
    }
    async getData(ctx) {
        const balances = await this.queryService.getLeaveBalances(ctx);
        return {
            type: 'Leave',
            title: 'Leave Balances',
            data: balances
        };
    }
};
exports.LeaveWidget = LeaveWidget;
exports.LeaveWidget = LeaveWidget = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dashboard_widget_provider_1.DashboardWidgetProvider,
        leave_query_service_1.LeaveQueryService])
], LeaveWidget);
//# sourceMappingURL=leave.widget.js.map