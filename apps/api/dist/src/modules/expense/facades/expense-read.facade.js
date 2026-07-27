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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseReadFacade = void 0;
const common_1 = require("@nestjs/common");
const expense_query_service_1 = require("../queries/expense-query.service");
const travel_query_service_1 = require("../queries/travel-query.service");
const budget_query_service_1 = require("../queries/budget-query.service");
const corporate_card_query_service_1 = require("../queries/corporate-card-query.service");
let ExpenseReadFacade = class ExpenseReadFacade {
    constructor(expenseQuery, travelQuery, budgetQuery, corporateCardQuery) {
        this.expenseQuery = expenseQuery;
        this.travelQuery = travelQuery;
        this.budgetQuery = budgetQuery;
        this.corporateCardQuery = corporateCardQuery;
    }
};
exports.ExpenseReadFacade = ExpenseReadFacade;
exports.ExpenseReadFacade = ExpenseReadFacade = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_query_service_1.ExpenseQueryService,
        travel_query_service_1.TravelQueryService,
        budget_query_service_1.BudgetQueryService,
        corporate_card_query_service_1.CorporateCardQueryService])
], ExpenseReadFacade);
//# sourceMappingURL=expense-read.facade.js.map