"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensePaidHandler = exports.ExpenseRejectedHandler = exports.ExpenseApprovedHandler = exports.ExpenseSubmittedHandler = void 0;
const common_1 = require("@nestjs/common");
let ExpenseSubmittedHandler = class ExpenseSubmittedHandler {
    async handle(event) {
    }
};
exports.ExpenseSubmittedHandler = ExpenseSubmittedHandler;
exports.ExpenseSubmittedHandler = ExpenseSubmittedHandler = __decorate([
    (0, common_1.Injectable)()
], ExpenseSubmittedHandler);
let ExpenseApprovedHandler = class ExpenseApprovedHandler {
    async handle(event) {
    }
};
exports.ExpenseApprovedHandler = ExpenseApprovedHandler;
exports.ExpenseApprovedHandler = ExpenseApprovedHandler = __decorate([
    (0, common_1.Injectable)()
], ExpenseApprovedHandler);
let ExpenseRejectedHandler = class ExpenseRejectedHandler {
    async handle(event) {
    }
};
exports.ExpenseRejectedHandler = ExpenseRejectedHandler;
exports.ExpenseRejectedHandler = ExpenseRejectedHandler = __decorate([
    (0, common_1.Injectable)()
], ExpenseRejectedHandler);
let ExpensePaidHandler = class ExpensePaidHandler {
    async handle(event) {
    }
};
exports.ExpensePaidHandler = ExpensePaidHandler;
exports.ExpensePaidHandler = ExpensePaidHandler = __decorate([
    (0, common_1.Injectable)()
], ExpensePaidHandler);
//# sourceMappingURL=expense.handlers.js.map