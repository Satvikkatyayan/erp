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
exports.CorporateCardQueryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_read_facade_1 = require("../facades/expense-read.facade");
const standard_response_1 = require("../dto/responses/standard.response");
const roles_decorator_1 = require("../decorators/roles.decorator");
let CorporateCardQueryController = class CorporateCardQueryController {
    constructor(readFacade) {
        this.readFacade = readFacade;
    }
    async getAssignedCards() {
        const data = await this.readFacade.corporateCardQuery.getAssignedCards('');
        return { data, totalCount: data.length, page: 1, pageSize: 10 };
    }
    async getTransactions(cardId) {
        const data = await this.readFacade.corporateCardQuery.getTransactions(cardId);
        return { data, totalCount: data.length, page: 1, pageSize: 10 };
    }
    async getOutstandingReconciliation(cardId) {
        const data = await this.readFacade.corporateCardQuery.getOutstandingTransactions(cardId);
        return { data, totalCount: data.length, page: 1, pageSize: 10 };
    }
};
exports.CorporateCardQueryController = CorporateCardQueryController;
__decorate([
    (0, common_1.Get)('assigned'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get assigned cards' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.PagedResponse }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CorporateCardQueryController.prototype, "getAssignedCards", null);
__decorate([
    (0, common_1.Get)('transactions/:cardId'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get card transactions' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.PagedResponse }),
    __param(0, (0, common_1.Param)('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CorporateCardQueryController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)('outstanding/:cardId'),
    (0, roles_decorator_1.Roles)('Finance'),
    (0, swagger_1.ApiOperation)({ summary: 'Get outstanding reconciliation' }),
    (0, swagger_1.ApiResponse)({ type: standard_response_1.PagedResponse }),
    __param(0, (0, common_1.Param)('cardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CorporateCardQueryController.prototype, "getOutstandingReconciliation", null);
exports.CorporateCardQueryController = CorporateCardQueryController = __decorate([
    (0, swagger_1.ApiTags)('Corporate Card Queries'),
    (0, common_1.Controller)('query/corporate-cards'),
    __metadata("design:paramtypes", [expense_read_facade_1.ExpenseReadFacade])
], CorporateCardQueryController);
//# sourceMappingURL=corporate-card-query.controller.js.map