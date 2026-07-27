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
exports.ExpenseClaimController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_facade_1 = require("../facades/expense.facade");
const expense_command_mapper_1 = require("../mappers/expense-command.mapper");
const expense_claim_dto_1 = require("../dto/requests/expense-claim.dto");
const standard_response_1 = require("../dto/responses/standard.response");
const roles_decorator_1 = require("../decorators/roles.decorator");
let ExpenseClaimController = class ExpenseClaimController {
    constructor(facade, mapper) {
        this.facade = facade;
        this.mapper = mapper;
    }
    async createClaim(dto) {
        const command = this.mapper.toCreateCommand(dto);
        await this.facade.executeCommand('CREATE_CLAIM', command);
        return { success: true };
    }
    async updateClaim(id, dto) {
        const command = this.mapper.toUpdateCommand(id, dto);
        await this.facade.executeCommand('UPDATE_CLAIM', command);
        return { success: true };
    }
    async submitClaim(id, dto) {
        const command = this.mapper.toSubmitCommand({ ...dto, claimId: id });
        await this.facade.executeCommand('SUBMIT_CLAIM', command);
        return { success: true };
    }
    async cancelClaim(id, dto) {
        const command = this.mapper.toCancelCommand({ ...dto, claimId: id });
        await this.facade.executeCommand('CANCEL_CLAIM', command);
        return { success: true };
    }
    async addItem(id, dto) {
        const command = this.mapper.toAddItemCommand(id, dto);
        await this.facade.executeCommand('ADD_ITEM', command);
        return { success: true };
    }
    async removeItem(id, itemId, dto) {
        const command = this.mapper.toRemoveItemCommand(id, { ...dto, itemId });
        await this.facade.executeCommand('REMOVE_ITEM', command);
        return { success: true };
    }
    async uploadReceipt(id, dto) {
        const command = this.mapper.toUploadReceiptCommand(id, dto);
        await this.facade.executeCommand('UPLOAD_RECEIPT', command);
        return { success: true };
    }
};
exports.ExpenseClaimController = ExpenseClaimController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new expense claim' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [expense_claim_dto_1.CreateExpenseClaimDto]),
    __metadata("design:returntype", Promise)
], ExpenseClaimController.prototype, "createClaim", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a draft claim' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, expense_claim_dto_1.UpdateExpenseClaimDto]),
    __metadata("design:returntype", Promise)
], ExpenseClaimController.prototype, "updateClaim", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit claim for approval' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, expense_claim_dto_1.SubmitExpenseDto]),
    __metadata("design:returntype", Promise)
], ExpenseClaimController.prototype, "submitClaim", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel claim' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, expense_claim_dto_1.CancelExpenseDto]),
    __metadata("design:returntype", Promise)
], ExpenseClaimController.prototype, "cancelClaim", null);
__decorate([
    (0, common_1.Post)(':id/items'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Add expense item' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, expense_claim_dto_1.AddExpenseItemDto]),
    __metadata("design:returntype", Promise)
], ExpenseClaimController.prototype, "addItem", null);
__decorate([
    (0, common_1.Delete)(':id/items/:itemId'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove expense item' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('itemId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, expense_claim_dto_1.RemoveExpenseItemDto]),
    __metadata("design:returntype", Promise)
], ExpenseClaimController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Post)(':id/receipts'),
    (0, roles_decorator_1.Roles)('Employee'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload receipt' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, expense_claim_dto_1.UploadReceiptDto]),
    __metadata("design:returntype", Promise)
], ExpenseClaimController.prototype, "uploadReceipt", null);
exports.ExpenseClaimController = ExpenseClaimController = __decorate([
    (0, swagger_1.ApiTags)('Expense Claims'),
    (0, common_1.Controller)('expense-claims'),
    __metadata("design:paramtypes", [expense_facade_1.ExpenseFacade,
        expense_command_mapper_1.ExpenseCommandMapper])
], ExpenseClaimController);
//# sourceMappingURL=expense-claim.controller.js.map