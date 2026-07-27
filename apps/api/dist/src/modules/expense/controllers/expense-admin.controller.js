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
exports.ExpenseAdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_facade_1 = require("../facades/expense.facade");
const standard_response_1 = require("../dto/responses/standard.response");
const roles_decorator_1 = require("../decorators/roles.decorator");
let ExpenseAdminController = class ExpenseAdminController {
    constructor(facade) {
        this.facade = facade;
    }
    async overridePolicy(id, dto) {
        await this.facade.executeCommand('OVERRIDE_POLICY', { id, ...dto });
        return { success: true };
    }
    async approveReimbursement(id, dto) {
        await this.facade.executeCommand('APPROVE_REIMBURSEMENT', { id, ...dto });
        return { success: true };
    }
    async approveAdvance(id, dto) {
        await this.facade.executeCommand('APPROVE_ADVANCE', { id, ...dto });
        return { success: true };
    }
    async manageBudgets(id, dto) {
        await this.facade.executeCommand('MANAGE_BUDGET', { id, ...dto });
        return { success: true };
    }
    async triggerReplay(dto) {
        await this.facade.executeCommand('TRIGGER_REPLAY', dto);
        return { success: true };
    }
    async triggerRebuild(dto) {
        await this.facade.executeCommand('TRIGGER_REBUILD', dto);
        return { success: true };
    }
};
exports.ExpenseAdminController = ExpenseAdminController;
__decorate([
    (0, common_1.Post)('policy/override/:id'),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Override expense policy' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExpenseAdminController.prototype, "overridePolicy", null);
__decorate([
    (0, common_1.Post)('reimbursement/approve/:id'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve reimbursement' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExpenseAdminController.prototype, "approveReimbursement", null);
__decorate([
    (0, common_1.Post)('advance/approve/:id'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve advances' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExpenseAdminController.prototype, "approveAdvance", null);
__decorate([
    (0, common_1.Post)('budgets/:id'),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Manage budgets' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExpenseAdminController.prototype, "manageBudgets", null);
__decorate([
    (0, common_1.Post)('replay'),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger event replay' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseAdminController.prototype, "triggerReplay", null);
__decorate([
    (0, common_1.Post)('rebuild'),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger projection rebuild' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseAdminController.prototype, "triggerRebuild", null);
exports.ExpenseAdminController = ExpenseAdminController = __decorate([
    (0, swagger_1.ApiTags)('Expense Admin'),
    (0, common_1.Controller)('admin/expense'),
    __metadata("design:paramtypes", [expense_facade_1.ExpenseFacade])
], ExpenseAdminController);
//# sourceMappingURL=expense-admin.controller.js.map