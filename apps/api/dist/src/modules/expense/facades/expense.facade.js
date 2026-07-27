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
exports.ExpenseFacade = void 0;
const common_1 = require("@nestjs/common");
const expense_operation_engine_1 = require("../engines/expense-operation.engine");
const expense_event_bus_1 = require("../events/expense-event.bus");
let ExpenseFacade = class ExpenseFacade {
    constructor(operationEngine, eventBus) {
        this.operationEngine = operationEngine;
        this.eventBus = eventBus;
    }
    async executeCommand(commandName, payload) {
        const result = await this.operationEngine.executeOperation(commandName, payload);
        await this.eventBus.publish({
            eventId: `evt-${Date.now()}`,
            eventType: `${commandName}_COMPLETED`,
            aggregateId: payload.id || payload.claimId || 'unknown',
            aggregateType: 'Expense',
            tenantId: payload.tenantId || 'unknown',
            organizationId: payload.orgId || 'unknown',
            correlationId: payload.correlationId || 'unknown',
            occurredAt: new Date(),
            version: 1,
            payload: result,
        });
        return result;
    }
};
exports.ExpenseFacade = ExpenseFacade;
exports.ExpenseFacade = ExpenseFacade = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_operation_engine_1.ExpenseOperationEngine,
        expense_event_bus_1.ExpenseEventBus])
], ExpenseFacade);
//# sourceMappingURL=expense.facade.js.map