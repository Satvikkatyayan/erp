"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetQueryService = void 0;
const common_1 = require("@nestjs/common");
let BudgetQueryService = class BudgetQueryService {
    async getBudget(budgetId) { }
    async getDepartmentBudget(departmentId) { }
    async getReservations(budgetId) { return []; }
    async getBudgetConsumption(budgetId) { }
    async getBudgetUtilization(departmentId) { }
};
exports.BudgetQueryService = BudgetQueryService;
exports.BudgetQueryService = BudgetQueryService = __decorate([
    (0, common_1.Injectable)()
], BudgetQueryService);
//# sourceMappingURL=budget-query.service.js.map