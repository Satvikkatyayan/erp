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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerDashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_read_facade_1 = require("../facades/expense-read.facade");
const standard_response_1 = require("../dto/responses/standard.response");
const roles_decorator_1 = require("../decorators/roles.decorator");
let ManagerDashboardController = class ManagerDashboardController {
    constructor(readFacade) {
        this.readFacade = readFacade;
    }
    async getPendingApprovals() {
        const data = await this.readFacade.expenseQuery.getManagerApprovalQueue('');
        return { data, totalCount: data.length, page: 1, pageSize: 10 };
    }
    async getTeamExpenses(teamId) {
        const data = await this.readFacade.expenseQuery.searchClaims({ teamId });
        return { data, totalCount: data.length, page: 1, pageSize: 10 };
    }
    async getRiskSummaries() {
        const data = await this.readFacade.expenseQuery.searchClaims({ includeRisk: true });
        return { data };
    }
};
exports.ManagerDashboardController = ManagerDashboardController;
__decorate([
    (0, common_1.Get)('pending-approvals'),
    (0, roles_decorator_1.Roles)('Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending approvals' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.PagedResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManagerDashboardController.prototype, "getPendingApprovals", null);
__decorate([
    (0, common_1.Get)('team-expenses/:teamId'),
    (0, roles_decorator_1.Roles)('Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Get team expenses' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.PagedResponse }),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ManagerDashboardController.prototype, "getTeamExpenses", null);
__decorate([
    (0, common_1.Get)('risk-summaries'),
    (0, roles_decorator_1.Roles)('Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Get risk summaries' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.QueryResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ManagerDashboardController.prototype, "getRiskSummaries", null);
exports.ManagerDashboardController = ManagerDashboardController = __decorate([
    (0, swagger_1.ApiTags)('Manager Dashboard'),
    (0, common_1.Controller)('query/manager-dashboard'),
    __metadata("design:paramtypes", [expense_read_facade_1.ExpenseReadFacade])
], ManagerDashboardController);
//# sourceMappingURL=manager-dashboard.controller.js.map