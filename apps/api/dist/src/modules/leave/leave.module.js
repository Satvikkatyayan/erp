"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveModule = void 0;
const leave_query_service_1 = require("./services/leave-query.service");
const common_1 = require("@nestjs/common");
const leave_lifecycle_service_1 = require("./services/leave-lifecycle.service");
const leave_balance_service_1 = require("./services/leave-balance.service");
const leave_policy_service_1 = require("./services/leave-policy.service");
const leave_carry_forward_service_1 = require("./services/leave-carry-forward.service");
let LeaveModule = class LeaveModule {
};
exports.LeaveModule = LeaveModule;
exports.LeaveModule = LeaveModule = __decorate([
    (0, common_1.Module)({
        providers: [
            leave_query_service_1.LeaveQueryService,
            leave_lifecycle_service_1.LeaveLifecycleService,
            leave_balance_service_1.LeaveBalanceService,
            leave_policy_service_1.LeavePolicyService,
            leave_carry_forward_service_1.LeaveCarryForwardService
        ],
        exports: [
            leave_query_service_1.LeaveQueryService,
            leave_lifecycle_service_1.LeaveLifecycleService,
            leave_balance_service_1.LeaveBalanceService,
            leave_policy_service_1.LeavePolicyService,
            leave_carry_forward_service_1.LeaveCarryForwardService
        ]
    })
], LeaveModule);
//# sourceMappingURL=leave.module.js.map