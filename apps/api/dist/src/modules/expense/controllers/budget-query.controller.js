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
exports.BudgetQueryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_read_facade_1 = require("../facades/expense-read.facade");
const standard_response_1 = require("../dto/responses/standard.response");
const roles_decorator_1 = require("../decorators/roles.decorator");
let BudgetQueryController = class BudgetQueryController {
    constructor(readFacade) {
        this.readFacade = readFacade;
    }
    async getDepartmentBudget(id) {
        const data = await this.readFacade.budgetQuery.getDepartmentBudget(id);
        return { data };
    }
    async getBudgetUtilization(id) {
        const data = await this.readFacade.budgetQuery.getBudgetUtilization(id);
        return { data };
    }
    async getRemainingAllocations(id) {
        const data = await this.readFacade.budgetQuery.getBudgetConsumption(id);
        return { data };
    }
};
exports.BudgetQueryController = BudgetQueryController;
__decorate([
    (0, common_1.Get)('department/:id'),
    (0, roles_decorator_1.Roles)('Manager', 'Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get department budgets' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.QueryResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetQueryController.prototype, "getDepartmentBudget", null);
__decorate([
    (0, common_1.Get)('utilization/:id'),
    (0, roles_decorator_1.Roles)('Manager', 'Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get budget utilization' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.QueryResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetQueryController.prototype, "getBudgetUtilization", null);
__decorate([
    (0, common_1.Get)('remaining/:id'),
    (0, roles_decorator_1.Roles)('Manager', 'Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get remaining allocations' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.QueryResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BudgetQueryController.prototype, "getRemainingAllocations", null);
exports.BudgetQueryController = BudgetQueryController = __decorate([
    (0, swagger_1.ApiTags)('Budget Queries'),
    (0, common_1.Controller)('query/budget'),
    __metadata("design:paramtypes", [expense_read_facade_1.ExpenseReadFacade])
], BudgetQueryController);
//# sourceMappingURL=budget-query.controller.js.map