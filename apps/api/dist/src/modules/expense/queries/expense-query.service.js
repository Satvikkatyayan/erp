"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseQueryService = void 0;
const common_1 = require("@nestjs/common");
let ExpenseQueryService = class ExpenseQueryService {
    async getClaim(claimId) { }
    async getEmployeeClaims(employeeId) { return []; }
    async getManagerApprovalQueue(managerId) { return []; }
    async getFinanceApprovalQueue() { return []; }
    async getClaimsByStatus(status) { return []; }
    async searchClaims(criteria) { return []; }
};
exports.ExpenseQueryService = ExpenseQueryService;
exports.ExpenseQueryService = ExpenseQueryService = __decorate([
    (0, common_1.Injectable)()
], ExpenseQueryService);
//# sourceMappingURL=expense-query.service.js.map