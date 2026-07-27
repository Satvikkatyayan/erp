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
exports.AttendanceWidget = void 0;
const common_1 = require("@nestjs/common");
const dashboard_widget_provider_1 = require("./dashboard-widget.provider");
const attendance_query_service_1 = require("../../attendance/services/attendance-query.service");
let AttendanceWidget = class AttendanceWidget {
    constructor(provider, queryService) {
        this.provider = provider;
        this.queryService = queryService;
        this.widgetKey = 'Attendance';
    }
    onModuleInit() {
        this.provider.registerWidget(this);
    }
    async getData(ctx) {
        const today = await this.queryService.getTodaySummary(ctx);
        return {
            type: 'Attendance',
            title: 'Today\'s Attendance',
            data: today || { status: 'Not Punched In' }
        };
    }
};
exports.AttendanceWidget = AttendanceWidget;
exports.AttendanceWidget = AttendanceWidget = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dashboard_widget_provider_1.DashboardWidgetProvider,
        attendance_query_service_1.AttendanceQueryService])
], AttendanceWidget);
//# sourceMappingURL=attendance.widget.js.map