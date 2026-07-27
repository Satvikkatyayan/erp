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
exports.ManagerApprovalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_facade_1 = require("../facades/expense.facade");
const manager_approval_dto_1 = require("../dto/requests/manager-approval.dto");
const standard_response_1 = require("../dto/responses/standard.response");
const roles_decorator_1 = require("../decorators/roles.decorator");
let ManagerApprovalController = class ManagerApprovalController {
    constructor(facade) {
        this.facade = facade;
    }
    async approveExpense(id, dto) {
        await this.facade.executeCommand('APPROVE_EXPENSE', { id, ...dto });
        return { success: true };
    }
    async rejectExpense(id, dto) {
        await this.facade.executeCommand('REJECT_EXPENSE', { id, ...dto });
        return { success: true };
    }
    async returnExpense(id, dto) {
        await this.facade.executeCommand('RETURN_EXPENSE', { id, ...dto });
        return { success: true };
    }
    async approveTravel(id, dto) {
        await this.facade.executeCommand('APPROVE_TRAVEL', { id, ...dto });
        return { success: true };
    }
    async rejectTravel(id, dto) {
        await this.facade.executeCommand('REJECT_TRAVEL', { id, ...dto });
        return { success: true };
    }
};
exports.ManagerApprovalController = ManagerApprovalController;
__decorate([
    (0, common_1.Post)('expense/:id/approve'),
    (0, roles_decorator_1.Roles)('Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve expense claim' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manager_approval_dto_1.ApproveExpenseDto]),
    __metadata("design:returntype", Promise)
], ManagerApprovalController.prototype, "approveExpense", null);
__decorate([
    (0, common_1.Post)('expense/:id/reject'),
    (0, roles_decorator_1.Roles)('Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject expense claim' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manager_approval_dto_1.RejectExpenseDto]),
    __metadata("design:returntype", Promise)
], ManagerApprovalController.prototype, "rejectExpense", null);
__decorate([
    (0, common_1.Post)('expense/:id/return'),
    (0, roles_decorator_1.Roles)('Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Return expense for correction' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ManagerApprovalController.prototype, "returnExpense", null);
__decorate([
    (0, common_1.Post)('travel/:id/approve'),
    (0, roles_decorator_1.Roles)('Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve travel request' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ManagerApprovalController.prototype, "approveTravel", null);
__decorate([
    (0, common_1.Post)('travel/:id/reject'),
    (0, roles_decorator_1.Roles)('Manager'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject travel request' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manager_approval_dto_1.RejectExpenseDto]),
    __metadata("design:returntype", Promise)
], ManagerApprovalController.prototype, "rejectTravel", null);
exports.ManagerApprovalController = ManagerApprovalController = __decorate([
    (0, swagger_1.ApiTags)('Manager Approval'),
    (0, common_1.Controller)('manager/approval'),
    __metadata("design:paramtypes", [expense_facade_1.ExpenseFacade])
], ManagerApprovalController);
//# sourceMappingURL=manager-approval.controller.js.map