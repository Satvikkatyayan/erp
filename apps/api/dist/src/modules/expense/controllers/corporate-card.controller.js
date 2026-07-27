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
exports.CorporateCardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_facade_1 = require("../facades/expense.facade");
const corporate_card_mapper_1 = require("../mappers/corporate-card.mapper");
const corporate_card_dto_1 = require("../dto/requests/corporate-card.dto");
const standard_response_1 = require("../dto/responses/standard.response");
const roles_decorator_1 = require("../decorators/roles.decorator");
let CorporateCardController = class CorporateCardController {
    constructor(facade, mapper) {
        this.facade = facade;
        this.mapper = mapper;
    }
    async assignCard(dto) {
        const command = this.mapper.toAssignCommand(dto);
        await this.facade.executeCommand('ASSIGN_CARD', command);
        return { success: true };
    }
    async importStatement(dto) {
        const command = this.mapper.toImportCommand(dto);
        await this.facade.executeCommand('IMPORT_STATEMENT', command);
        return { success: true };
    }
    async reconcileCard(id, dto) {
        await this.facade.executeCommand('RECONCILE_CARD', { id, ...dto });
        return { success: true };
    }
    async closeReconciliation(id) {
        await this.facade.executeCommand('CLOSE_RECONCILIATION', { id });
        return { success: true };
    }
};
exports.CorporateCardController = CorporateCardController;
__decorate([
    (0, common_1.Post)('assign'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign corporate card' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [corporate_card_dto_1.AssignCorporateCardDto]),
    __metadata("design:returntype", Promise)
], CorporateCardController.prototype, "assignCard", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Import statement' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [corporate_card_dto_1.ImportStatementDto]),
    __metadata("design:returntype", Promise)
], CorporateCardController.prototype, "importStatement", null);
__decorate([
    (0, common_1.Post)('reconcile/:id'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Reconcile card' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CorporateCardController.prototype, "reconcileCard", null);
__decorate([
    (0, common_1.Post)('close/:id'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Close reconciliation' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.CommandResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CorporateCardController.prototype, "closeReconciliation", null);
exports.CorporateCardController = CorporateCardController = __decorate([
    (0, swagger_1.ApiTags)('Corporate Cards'),
    (0, common_1.Controller)('corporate-cards'),
    __metadata("design:paramtypes", [expense_facade_1.ExpenseFacade,
        corporate_card_mapper_1.CorporateCardMapper])
], CorporateCardController);
//# sourceMappingURL=corporate-card.controller.js.map