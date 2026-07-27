"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorporateCardQueryService = void 0;
const common_1 = require("@nestjs/common");
let CorporateCardQueryService = class CorporateCardQueryService {
    async getAssignedCards(employeeId) { return []; }
    async getStatements(cardId) { return []; }
    async getTransactions(statementId) { return []; }
    async getReconciliation(cardId) { }
    async getOutstandingTransactions(employeeId) { return []; }
};
exports.CorporateCardQueryService = CorporateCardQueryService;
exports.CorporateCardQueryService = CorporateCardQueryService = __decorate([
    (0, common_1.Injectable)()
], CorporateCardQueryService);
//# sourceMappingURL=corporate-card-query.service.js.map