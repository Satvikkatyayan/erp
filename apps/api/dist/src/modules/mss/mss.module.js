"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MssModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const employee_module_1 = require("../employee/employee.module");
const attendance_module_1 = require("../attendance/attendance.module");
const leave_module_1 = require("../leave/leave.module");
const assets_module_1 = require("../assets/assets.module");
const performance_module_1 = require("../performance/performance.module");
const core_module_1 = require("../../core/core.module");
const manager_facade_1 = require("./facades/manager.facade");
const approval_facade_1 = require("./facades/approval.facade");
const team_scope_resolver_1 = require("./resolvers/team-scope.resolver");
const dashboard_widget_registry_1 = require("./widgets/dashboard-widget.registry");
const manager_dashboard_service_1 = require("./services/manager-dashboard.service");
const manager_team_service_1 = require("./services/manager-team.service");
const manager_approval_service_1 = require("./services/manager-approval.service");
const manager_delegation_service_1 = require("./services/manager-delegation.service");
const manager_preference_service_1 = require("./services/manager-preference.service");
const mss_dashboard_controller_1 = require("./controllers/mss-dashboard.controller");
const mss_team_controller_1 = require("./controllers/mss-team.controller");
const mss_approval_controller_1 = require("./controllers/mss-approval.controller");
const mss_delegation_controller_1 = require("./controllers/mss-delegation.controller");
const mss_preference_controller_1 = require("./controllers/mss-preference.controller");
const team_summary_widget_1 = require("./widgets/team-summary.widget");
const manager_approval_widget_1 = require("./widgets/manager-approval.widget");
const mss_event_listener_1 = require("./events/mss-event.listener");
const mss_event_publisher_1 = require("./events/mss-event.publisher");
let MssModule = class MssModule {
};
exports.MssModule = MssModule;
exports.MssModule = MssModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            employee_module_1.EmployeeModule,
            attendance_module_1.AttendanceModule,
            leave_module_1.LeaveModule,
            assets_module_1.AssetsModule,
            performance_module_1.PerformanceModule,
            core_module_1.CoreModule,
        ],
        controllers: [
            mss_dashboard_controller_1.MssDashboardController,
            mss_team_controller_1.MssTeamController,
            mss_approval_controller_1.MssApprovalController,
            mss_delegation_controller_1.MssDelegationController,
            mss_preference_controller_1.MssPreferenceController,
        ],
        providers: [
            manager_facade_1.ManagerFacade,
            approval_facade_1.ApprovalFacade,
            team_scope_resolver_1.TeamScopeResolver,
            dashboard_widget_registry_1.DashboardWidgetRegistry,
            manager_dashboard_service_1.ManagerDashboardService,
            manager_team_service_1.ManagerTeamService,
            manager_approval_service_1.ManagerApprovalService,
            manager_delegation_service_1.ManagerDelegationService,
            manager_preference_service_1.ManagerPreferenceService,
            team_summary_widget_1.TeamSummaryWidget,
            manager_approval_widget_1.ManagerApprovalWidget,
            mss_event_listener_1.MssEventListener,
            mss_event_publisher_1.MssEventPublisher,
        ],
        exports: [
            manager_facade_1.ManagerFacade
        ]
    })
], MssModule);
//# sourceMappingURL=mss.module.js.map