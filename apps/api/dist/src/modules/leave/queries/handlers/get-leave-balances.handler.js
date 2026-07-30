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
exports.GetLeaveBalancesHandler = void 0;
const common_1 = require("@nestjs/common");
const query_result_1 = require("../../../../core/cqrs/query-result");
const leave_query_service_1 = require("../../services/leave-query.service");
let GetLeaveBalancesHandler = class GetLeaveBalancesHandler {
    constructor(queryService) {
        this.queryService = queryService;
    }
    async execute(query) {
        const data = await this.queryService.getLeaveBalances(query.tenantId, query.employeeId);
        return query_result_1.QueryResult.success(data);
    }
};
exports.GetLeaveBalancesHandler = GetLeaveBalancesHandler;
exports.GetLeaveBalancesHandler = GetLeaveBalancesHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leave_query_service_1.LeaveQueryService])
], GetLeaveBalancesHandler);
//# sourceMappingURL=get-leave-balances.handler.js.map