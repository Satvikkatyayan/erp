"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssModule = void 0;
const common_1 = require("@nestjs/common");
const core_module_1 = require("../../core/core.module");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const integration_module_1 = require("../../core/integration/integration.module");
const attendance_module_1 = require("../attendance/attendance.module");
const leave_module_1 = require("../leave/leave.module");
const payroll_module_1 = require("../payroll/payroll.module");
const performance_module_1 = require("../performance/performance.module");
const assets_module_1 = require("../assets/assets.module");
const employee_facade_1 = require("./facades/employee.facade");
const employee_dashboard_service_1 = require("./services/employee-dashboard.service");
const employee_profile_service_1 = require("./services/employee-profile.service");
const employee_document_service_1 = require("./services/employee-document.service");
const employee_request_service_1 = require("./services/employee-request.service");
const employee_preference_service_1 = require("./services/employee-preference.service");
const employee_notification_service_1 = require("./services/employee-notification.service");
const employee_session_service_1 = require("./services/employee-session.service");
const ess_event_publisher_1 = require("./events/ess-event.publisher");
const dashboard_widget_provider_1 = require("./widgets/dashboard-widget.provider");
const attendance_widget_1 = require("./widgets/attendance.widget");
const leave_widget_1 = require("./widgets/leave.widget");
const payroll_widget_1 = require("./widgets/payroll.widget");
const asset_widget_1 = require("./widgets/asset.widget");
const ess_dashboard_controller_1 = require("./controllers/ess-dashboard.controller");
const ess_profile_controller_1 = require("./controllers/ess-profile.controller");
const ess_request_controller_1 = require("./controllers/ess-request.controller");
const ess_document_controller_1 = require("./controllers/ess-document.controller");
const ess_session_controller_1 = require("./controllers/ess-session.controller");
let EssModule = class EssModule {
};
exports.EssModule = EssModule;
exports.EssModule = EssModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_module_1.CoreModule,
            prisma_module_1.PrismaModule,
            integration_module_1.IntegrationModule,
            attendance_module_1.AttendanceModule,
            leave_module_1.LeaveModule,
            payroll_module_1.PayrollModule,
            performance_module_1.PerformanceModule,
            assets_module_1.AssetsModule
        ],
        controllers: [
            ess_dashboard_controller_1.EssDashboardController,
            ess_profile_controller_1.EssProfileController,
            ess_request_controller_1.EssRequestController,
            ess_document_controller_1.EssDocumentController,
            ess_session_controller_1.EssSessionController
        ],
        providers: [
            employee_facade_1.EmployeeFacade,
            employee_dashboard_service_1.EmployeeDashboardService,
            employee_profile_service_1.EmployeeProfileService,
            employee_document_service_1.EmployeeDocumentService,
            employee_request_service_1.EmployeeRequestService,
            employee_preference_service_1.EmployeePreferenceService,
            employee_notification_service_1.EmployeeNotificationService,
            employee_session_service_1.EmployeeSessionService,
            ess_event_publisher_1.EssEventPublisher,
            dashboard_widget_provider_1.DashboardWidgetProvider,
            attendance_widget_1.AttendanceWidget,
            leave_widget_1.LeaveWidget,
            payroll_widget_1.PayrollWidget,
            asset_widget_1.AssetWidget
        ],
        exports: [
            employee_facade_1.EmployeeFacade
        ]
    })
], EssModule);
//# sourceMappingURL=ess.module.js.map