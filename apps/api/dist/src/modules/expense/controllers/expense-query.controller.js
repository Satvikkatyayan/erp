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
exports.ExpenseQueryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_read_facade_1 = require("../facades/expense-read.facade");
const standard_response_1 = require("../dto/responses/standard.response");
const roles_decorator_1 = require("../decorators/roles.decorator");
let ExpenseQueryController = class ExpenseQueryController {
    constructor(readFacade) {
        this.readFacade = readFacade;
    }
    async getMyExpenses(params) {
        const data = await this.readFacade.expenseQuery.getEmployeeClaims(params);
        return { data, totalCount: data.length, page: 1, pageSize: 10 };
    }
    async getExpenseDetail(id) {
        const data = await this.readFacade.expenseQuery.getClaim(id);
        return { data };
    }
    async getPendingReimbursements() {
        const data = await this.readFacade.expenseQuery.getClaimsByStatus('APPROVED_PENDING_REIMBURSEMENT');
        return { data, totalCount: data.length, page: 1, pageSize: 10 };
    }
    async getEmployeeDashboard() {
        const data = await this.readFacade.expenseQuery.searchClaims({});
        return { data };
    }
};
exports.ExpenseQueryController = ExpenseQueryController;
__decorate([
    (0, common_1.Get)('my-expenses'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my expenses' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.PagedResponse }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseQueryController.prototype, "getMyExpenses", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('Employee', 'Manager', 'Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get expense detail' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.QueryResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExpenseQueryController.prototype, "getExpenseDetail", null);
__decorate([
    (0, common_1.Get)('pending-reimbursements'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending reimbursements' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.PagedResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExpenseQueryController.prototype, "getPendingReimbursements", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee dashboard' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.QueryResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExpenseQueryController.prototype, "getEmployeeDashboard", null);
exports.ExpenseQueryController = ExpenseQueryController = __decorate([
    (0, swagger_1.ApiTags)('Expense Queries'),
    (0, common_1.Controller)('query/expense'),
    __metadata("design:paramtypes", [expense_read_facade_1.ExpenseReadFacade])
], ExpenseQueryController);
//# sourceMappingURL=expense-query.controller.js.map