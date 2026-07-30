"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveModule = void 0;
const common_1 = require("@nestjs/common");
const leave_request_repository_1 = require("./repositories/leave-request.repository");
const leave_balance_repository_1 = require("./repositories/leave-balance.repository");
const leave_policy_repository_1 = require("./repositories/leave-policy.repository");
const timeline_repository_1 = require("./repositories/timeline.repository");
const snapshot_repository_1 = require("./repositories/snapshot.repository");
const leave_execution_service_1 = require("./services/leave-execution.service");
const leave_lifecycle_controller_1 = require("./controllers/leave-lifecycle.controller");
const leave_query_controller_1 = require("./controllers/leave-query.controller");
const leave_query_service_1 = require("./services/leave-query.service");
const platform_leave_sdk_1 = require("./sdk/platform-leave.sdk");
const apply_leave_handler_1 = require("./commands/handlers/apply-leave.handler");
const approve_leave_handler_1 = require("./commands/handlers/approve-leave.handler");
const reject_leave_handler_1 = require("./commands/handlers/reject-leave.handler");
const cancel_leave_handler_1 = require("./commands/handlers/cancel-leave.handler");
const get_leave_request_handler_1 = require("./queries/handlers/get-leave-request.handler");
const search_leave_requests_handler_1 = require("./queries/handlers/search-leave-requests.handler");
const get_leave_balances_handler_1 = require("./queries/handlers/get-leave-balances.handler");
const leave_mapper_1 = require("./api/mappers/leave.mapper");
let LeaveModule = class LeaveModule {
};
exports.LeaveModule = LeaveModule;
exports.LeaveModule = LeaveModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            leave_lifecycle_controller_1.LeaveLifecycleController,
            leave_query_controller_1.LeaveQueryController
        ],
        providers: [
            leave_mapper_1.LeaveMapper,
            leave_request_repository_1.LeaveRequestRepository,
            leave_balance_repository_1.LeaveBalanceRepository,
            leave_policy_repository_1.LeavePolicyRepository,
            timeline_repository_1.LeaveTimelineRepository,
            snapshot_repository_1.LeaveSnapshotRepository,
            leave_execution_service_1.LeaveExecutionService,
            apply_leave_handler_1.ApplyLeaveHandler,
            approve_leave_handler_1.ApproveLeaveHandler,
            reject_leave_handler_1.RejectLeaveHandler,
            cancel_leave_handler_1.CancelLeaveHandler,
            leave_query_service_1.LeaveQueryService,
            get_leave_request_handler_1.GetLeaveRequestHandler,
            search_leave_requests_handler_1.SearchLeaveRequestsHandler,
            get_leave_balances_handler_1.GetLeaveBalancesHandler,
            platform_leave_sdk_1.PlatformLeaveSDK,
        ],
        exports: [
            platform_leave_sdk_1.PlatformLeaveSDK
        ]
    })
], LeaveModule);
//# sourceMappingURL=leave.module.js.map